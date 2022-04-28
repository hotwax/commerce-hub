<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-buttons slot="end">
          <!-- TODO: make download csv and sync button functional -->
          <ion-button fill="clear" @click="runJob('JOB_IMP_ORD')">
            <ion-icon slot="icon-only" :icon="syncOutline" />
          </ion-button>
          <!-- <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="downloadOutline" />
          </ion-button> -->
          <ion-button fill="clear" @click="openOrderFilter()" v-show="showFilterButton">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-menu content-id="content" type="overlay" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ $t("Filters")}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <OrderFilters :poIds="poIds" :shippingMethodOptions="shippingMethodOptions" :orderStatusOptions="orderStatusOptions"/>
      </ion-content>
    </ion-menu>

    <ion-content id="content">
      <div class="find">
        <section class="search">
          <ion-searchbar v-model="queryString" @keyup.enter="queryString = $event.target.value; updateQueryString()"/>
        </section>

        <aside class="filters desktop-only">
          <div class="order-filters">
            <OrderFilters :poIds="poIds" :shippingMethodOptions="shippingMethodOptions" :orderStatusOptions="orderStatusOptions"/>
          </div>
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none">
              <h2>{{ $t("Results") }}:</h2> 
            </ion-item>

            <div>
              <ion-item lines="none">
                <ion-icon slot="start" :icon="documentTextOutline" />
                <ion-label class="ion-text-wrap">{{ $t("Show order items") }}</ion-label>
                <ion-toggle color="secondary" :checked="showOrderItems" @ionChange="() => showOrderItems = !showOrderItems"/>
              </ion-item>

              <ion-item lines="none">
                <ion-icon slot="start" :icon="swapVerticalOutline" />
                <ion-label class="ion-text-wrap">{{ $t("Sort") }}</ion-label>
                <ion-select :value="sort" @ionChange="sortOrders($event.detail.value)" interface="popover">
                  <ion-select-option value="orderDate desc">{{ $t('Order date') }}</ion-select-option>
                  <ion-select-option value="promisedDatetime asc">{{ $t('Promised date') }}</ion-select-option>
                  <ion-select-option value="autoCancelDate asc">{{ $t('Auto cancel date') }}</ion-select-option>
                </ion-select>
              </ion-item>
            </div>
          </section>

          <!-- Order Item Section -->
          <hr />

          <div v-for="(order, index) in orders" :key="index" :order="order" @click="() => router.push(`/order/${order.orderId}`)">
            <section class="section-header">
              <div class="primary-info">
                <ion-item lines="none">
                  <ion-label>
                    {{ order.orderId }}
                    <p> {{ order.customer.name }} </p>
                  </ion-label>
                </ion-item>
              </div>

              <div class="tags">
                <ion-chip @click.stop="copyToClipboard(order.orderName)" outline v-if="order.orderName">
                  <ion-icon :icon="pricetag" />
                  <ion-label> {{ order.orderName }} </ion-label>
                </ion-chip>
                <ion-chip outline v-if="$filters.getCustomerLoyalty(order.notes, cusotmerLoyaltyOptions)">
                  <ion-icon :icon="ribbon" />
                  <ion-label>{{ $filters.getCustomerLoyalty(order.notes, cusotmerLoyaltyOptions) }}</ion-label>
                </ion-chip>
              </div>

              <div class="metadata">
                <ion-note> {{ $t("Ordered on") }} {{ $filters.formatUtcDate(order.orderDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') }} </ion-note>
                <StatusBadge :statusDesc="order.orderStatusDesc || ''" :key="order.orderStatusDesc"/>
              </div>
            </section>

            <section class="section-grid" v-if="showOrderItems">
              <OrderItemCard v-for="(item, index) in order.doclist.docs" :key="index" :item="item" />
            </section>
            <hr />
          </div>
          <ion-infinite-scroll @ionInfinite="loadMoreOrders($event)" threshold="100px" :disabled="!isScrollable">
            <ion-infinite-scroll-content loading-spinner="crescent" :loading-text="$t('Loading')"/>
          </ion-infinite-scroll>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonMenu,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  menuController
} from '@ionic/vue';
import {
  documentTextOutline,
  downloadOutline,
  filterOutline,
  pricetag,
  ribbon,
  swapVerticalOutline,
  syncOutline,
  close,
} from 'ionicons/icons';
import { defineComponent, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { hasError, showToast } from '@/utils'
import { Plugins } from '@capacitor/core';
import { useRouter } from 'vue-router';
import OrderFilters from '@/components/OrderFilters.vue'
import { OrderService } from '@/services/OrderService';
import StatusBadge from '@/components/StatusBadge.vue'
import OrderItemCard from '@/components/OrderItemCard.vue'
import emitter from '@/event-bus';
import { JobService } from '@/services/JobService';

const { Clipboard } = Plugins;

export default defineComponent ({
  name: 'Order',
  components: {
    IonBackButton,
    IonButtons,
    IonButton,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonMenu,
    IonNote,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonTitle,
    IonToggle,
    IonToolbar,
    OrderFilters,
    OrderItemCard,
    StatusBadge
  },
  computed: {
    ...mapGetters({
      orders: 'order/getOrders',
      getProduct: 'product/getProduct',
      currentFacilityId: 'user/getCurrentFacility',
      getProductStock: 'stock/getProductStock',
      isScrollable: 'order/isScrollable',
      query: 'order/getOrderQuery',
      getShipmentMethodDesc: 'util/getShipmentMethod'
    })
  },
  data() {
    return {
      shippingMethodOptions: [''],
      orderStatusOptions: [''],
      sort: 'orderDate desc',
      showOrderItems: true,
      poIds: {} as any,
      showFilterButton: false,
    }
  },
  methods: {
    showFilters(){
      const el = document.querySelector('.order-filters') as Element;
      const observer = new window.IntersectionObserver(([entry]) => {
        this.showFilterButton = !entry.isIntersecting;
      }, {
        root: null
      })
      observer.observe(el);
    },

    async sortOrders(value: string) {
      this.sort = value
      await this.store.dispatch('order/updateSort', this.sort)
    },
    async getOrders() {
      const resp = await this.store.dispatch('order/findOrders')

      if (resp.status == 200 && resp.data.facets) {
        this.orderStatusOptions = this.orderStatusOptions.length > 1 || resp.data.facets?.orderStatusIdFacet?.buckets.length < this.orderStatusOptions.length ? this.orderStatusOptions : this.orderStatusOptions.concat(resp.data.facets?.orderStatusIdFacet?.buckets.map((status: any) => status.val))
        this.shippingMethodOptions = this.shippingMethodOptions.length > 1 || resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.length < this.shippingMethodOptions.length ? this.shippingMethodOptions : this.shippingMethodOptions.concat(resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.map((shippingMethod: any) => shippingMethod.val))
      }
    },
    async updateQueryString() {
      await this.store.dispatch('order/updateAppliedFilters', { value: this.queryString, filterName: 'queryString' })
    },
    async copyToClipboard(text: any) {
      await Clipboard.write({
        string: text
      }).then(() => {
        showToast(this.$t('Copied', { text }));
      })
    },
    async loadMoreOrders(event: any) {
      await this.store.dispatch('order/findOrders', {
        viewSize: undefined,
        viewIndex: Math.ceil(this.orders.length / process.env.VUE_APP_VIEW_SIZE).toString()
      }).then((resp) => {
        if (resp.status == 200 && resp.data.facets) {
          this.orderStatusOptions = this.orderStatusOptions.length > 1 || resp.data.facets?.orderStatusIdFacet?.buckets.length < this.orderStatusOptions.length ? this.orderStatusOptions : this.orderStatusOptions.concat(resp.data.facets?.orderStatusIdFacet?.buckets.map((status: any) => status.val))
          this.shippingMethodOptions = this.shippingMethodOptions.length > 1 || resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.length < this.shippingMethodOptions.length ? this.shippingMethodOptions : this.shippingMethodOptions.concat(resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.map((shippingMethod: any) => shippingMethod.val))
        }
        event.target.complete();
      })
    },
    async openOrderFilter() {
      await menuController.open();
    },
    async runJob(enumId: string) {
      const job = await this.store.dispatch('job/fetchJobInformation', enumId)
      if (!job) {
        console.error('Job information not found')
        return;
      }
      const resp = await JobService.runServiceNow(job);
      // added logic to fetch the order after 4s once the service is scheduled successfully
      if (resp === 'success') {
        emitter.emit('presentLoader')
        setTimeout(function (this: any) {
          emitter.emit('dismissLoader')
          this.store.dispatch('order/findOrders')
        }.bind(this), 4000)
      }
    }
  },
  async mounted() {
    this.showFilters();
     
    this.store.dispatch('util/fetchShipmentMethods')
    await this.getOrders();

    try {
      // fetching those sales order having a corresponding PO ids associated with them
      const response = await OrderService.getPOIdsForSo({
        "json": {
          "params": {
            "rows": 1000,
            "group": true,
            "group.field": "correspondingPoId",
            "group.limit": 100,
            "group.ngroups": true
          },
          "query": "docType:ORDER",
          "filter": "orderTypeId: SALES_ORDER AND correspondingPoId: *",
          "fields": "correspondingPoId"
        }
      });

      if (response.status == 200 && !hasError(response) && response.data?.grouped?.correspondingPoId?.ngroups) {
        const correspondingPoId = response.data?.grouped?.correspondingPoId?.groups.map((group: any) => group.groupValue)

        // fetching po's information for specific order ids only
        const payload = {
          "json": {
            "params": {
              "rows": 1000,
              "group": true,
              "group.field": "externalOrderId"
            },
            "filter": `docType: ORDER AND orderTypeId: PURCHASE_ORDER AND orderId: (${correspondingPoId.join(' OR ')})`,
            "fields": "externalOrderId orderId",
            "query": "*:* AND externalOrderId: *"
          }
        }
        const resp = await OrderService.getPOIds(payload);
        if (resp.status == 200 && !hasError(resp)) {
          resp.data?.grouped?.externalOrderId?.groups.map((group: any) => {
            this.poIds[group.groupValue] = group.doclist.docs.map((order: any) => order.orderId)
          })
          this.store.dispatch('order/updatePoIds', this.poIds)
        } else {
          console.error('Something went wrong while fetching externalOrderId for po')
        }
      } else {
        console.error('Something went wrong while fetching po ids for sales order')
      }
    } catch(err) {
      console.error(err)
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const queryString = ref();
    const orderStatus = JSON.parse(process.env.VUE_APP_ORDER_STATUS)
    const itemStatus = JSON.parse(process.env.VUE_APP_ITEM_STATUS)
    const cusotmerLoyaltyOptions = process.env.VUE_APP_CUST_LOYALTY_OPTIONS

    return {
      close,
      cusotmerLoyaltyOptions,
      documentTextOutline,
      downloadOutline,
      filterOutline,
      itemStatus,
      pricetag,
      orderStatus,
      ribbon,
      swapVerticalOutline,
      syncOutline,
      router,
      store,
      queryString
    };
  },
});
</script>

<style scoped>
.section-header{
  margin: 0 var(--spacer-xs);
}

.metadata {
  text-align: end;
}

.metadata > ion-note {
  display: block;
}

ion-modal {
  --width: 290px;
  --height: 382px;
  --border-radius: 8px;
}

@media (min-width: 991px) {
  .main {
    margin-left: var(--spacer-xl);
  }
}
</style>
