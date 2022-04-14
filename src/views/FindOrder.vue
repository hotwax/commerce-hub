<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-buttons slot="end">
          <!-- TODO: make download csv and sync button functional -->
          <!-- <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="syncOutline" />
          </ion-button>
          <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="downloadOutline" />
          </ion-button> -->
          <ion-button fill="clear" class="mobile-only" @click="openOrderFilterMenu()">
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
          <ion-searchbar v-model="queryString" @keyup.enter="getOrders()"/>
        </section>

        <aside class="filters desktop-only">
<<<<<<< HEAD
          <OrderFilters :poIds="poIds" :shippingMethodOptions="shippingMethodOptions" :orderStatusOptions="orderStatusOptions"/>
=======
          <ion-list>
            <ion-list-header><h3>{{ $t("Date") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header><h3>{{ $t("Type") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox />
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox />
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox />
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header><h3>{{ $t("Fulfillment") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>

          <ion-card>
            <ion-toolbar>
              <ion-title>{{ $t("Purchase orders") }}</ion-title>
            </ion-toolbar>
            <ion-card-content>
              <ion-chip>
                <ion-label>PO #</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-label>PO #</ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>
>>>>>>> c10acbe1d29f58c4114c2155024cf5e709e2b0b1
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="documentTextOutline" />
              <ion-label>{{ "Show order items" }}</ion-label>
              <ion-toggle color="secondary" />
            </ion-item>

            <ion-item lines="none">
              <ion-icon slot="start" :icon="swapVerticalOutline" />
              <ion-label>{{ $t("Sort") }}</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">Arrival date</ion-select-option>
              </ion-select>
            </ion-item>
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
                <ion-chip @click="copyToClipboard(order.orderName)" outline v-if="order.orderName">
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
                <ion-badge :color="orderStatus[order.orderStatusId]?.color ? orderStatus[order.orderStatusId]?.color : 'primary'">{{ orderStatus[order.orderStatusId]?.label ? orderStatus[order.orderStatusId]?.label : order.orderStatusId }}</ion-badge>
              </div>
            </section>

            <section class="section-grid">
              <ion-card v-for="(item, index) in order.doclist.docs" :key="index" :item="item">
                <ion-item>
                  <ion-thumbnail slot="start">
                    <Image :src="getProduct(item.productId).mainImageUrl" />
                  </ion-thumbnail>
                  <ion-label>
                    <p> {{ getProduct(item.productId).brandName ? getProduct(item.productId).brandName : '-' }} </p>
                    {{ item.parentProductName }}
                    <!-- TODO: make the attribute displaying logic dynamic -->
                    <p> {{ $t("Color") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }} </p>
                    <p> {{ $t("Size") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }} </p>
                  </ion-label>
                  <ion-badge :color="itemStatus[item.orderItemStatusId].color ? itemStatus[item.orderItemStatusId].color : 'primary'" slot="end"> {{ itemStatus[item.orderItemStatusId].label ? itemStatus[item.orderItemStatusId].label : item.orderItemStatusId }} </ion-badge>
                </ion-item>
                <!-- TODO: Need to handle this property -->
                <div v-if="item.facilityId === orderPreOrderId || item.facilityId === orderBackOrderId">
                  <ion-item>
                    <ion-label>{{ $t("Promise date") }}</ion-label>
                    <p slot="end"> {{ item.promisedDatetime ? $filters.formatUtcDate(item.promisedDatetime, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-'  }} </p>
                  </ion-item>
                  <ion-item>
                    <ion-label>{{ $t("PO arrival date") }}</ion-label>
                    <!-- TODO: Need to handle this property -->
                    <p slot="end"> {{ item.promiseOrderArrivalDate ? $filters.formatUtcDate(item.promiseOrderArrivalDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-' }} </p>
                  </ion-item>
                  <ion-item>
                    <ion-label>{{ $t("Location") }}</ion-label>
                    <!-- TODO: Need to handle this property -->
                    <p slot="end"> {{ item.facilityName ? item.facilityName : '-' }} </p>
                  </ion-item>
                </div>
                <div v-else>
                  <ion-item>
                    <ion-label>{{ $t("Shipping method") }}</ion-label>
                    <p slot="end"> {{ item.shipmentMethodTypeId }} </p>
                  </ion-item>
                  <ion-item>
<<<<<<< HEAD
                    <ion-thumbnail slot="start">
                      <Image :src="getProduct(item.productId).mainImageUrl" />
                    </ion-thumbnail>
                    <ion-label>
                      <p>{{ getProduct(item.productId).brandName }}</p>
                      {{ item.parentProductName ? item.parentProductName : item.productName }}
                      <!-- TODO: make the attribute displaying logic dynamic -->
                      <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/')">{{ $t("Color") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }}</p>
                      <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/')">{{ $t("Size") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }}</p>
                    </ion-label>
                    <ion-badge :color="itemStatus[item.orderItemStatusId]?.color ? itemStatus[item.orderItemStatusId]?.color : 'primary'" slot="end"> {{ itemStatus[item.orderItemStatusId]?.label ? itemStatus[item.orderItemStatusId]?.label : item.orderItemStatusId }} </ion-badge>
=======
                    <ion-label>{{ $t("Shipping from") }}</ion-label>
                    <p slot="end"> {{ item.facilityName ? item.facilityName : "-" }} </p>
                  </ion-item>
                  <ion-item lines="none">
                    <ion-label>{{ $t("Location inventory") }}</ion-label>
                    <p slot="end">{{ getProductStock(item.productId) }}</p>
>>>>>>> c10acbe1d29f58c4114c2155024cf5e709e2b0b1
                  </ion-item>
                </div>
              </ion-card>
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
  IonBadge,
  IonButtons,
  IonButton,
  IonCard,
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
  IonThumbnail,
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
  close
} from 'ionicons/icons';
import { defineComponent, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { hasError, showToast } from '@/utils'
import { Plugins } from '@capacitor/core';
import Image from '@/components/Image.vue';
import { useRouter } from 'vue-router';
import OrderFilters from '@/components/OrderFilters.vue'
import emitter from '@/event-bus';
import { OrderService } from '@/services/OrderService';

const { Clipboard } = Plugins;

export default defineComponent ({
  name: 'Order',
  components: {
    Image,
    IonBackButton,
    IonBadge,
    IonButtons,
    IonButton,
    IonCard,
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
    IonThumbnail,
    IonTitle,
    IonToggle,
    IonToolbar,
    OrderFilters
  },
  computed: {
    ...mapGetters({
      orders: 'order/getOrders',
      getProduct: 'product/getProduct',
      currentFacilityId: 'user/getCurrentFacility',
      getProductStock: 'stock/getProductStock',
      isScrollable: 'order/isScrollable',
      currentOrderFiltersSelected: 'order/getCurrentOrderFiltersSelected'
    })
  },
  created() {
    emitter.on('filterUpdated', this.getOrders)
  },
  data() {
    return {
      shippingMethodOptions: ['any'],
      orderStatusOptions: ['any'],
      poIds: []
    }
  },
  methods: {
    async getOrders(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;

      const payload = await this.store.dispatch('order/updateQuery', { viewSize, viewIndex, queryString: this.queryString })

      await this.store.dispatch("order/findOrders", payload).then(resp => {
        if (resp.status == 200 && resp.data.facets) {
          this.orderStatusOptions = this.orderStatusOptions.length > 1 || resp.data.facets?.orderStatusIdFacet?.buckets.length < this.orderStatusOptions.length ? this.orderStatusOptions : this.orderStatusOptions.concat(resp.data.facets?.orderStatusIdFacet?.buckets.map((status: any) => status.val))
          this.shippingMethodOptions = this.shippingMethodOptions.length > 1 || resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.length < this.shippingMethodOptions.length ? this.shippingMethodOptions : this.shippingMethodOptions.concat(resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.map((shippingMethod: any) => shippingMethod.val))
        }
      })
    },
    async copyToClipboard(text: any) {
      await Clipboard.write({
        string: text
      }).then(() => {
        showToast(this.$t('Copied', { text }));
      })
    },
    async loadMoreOrders(event: any) {
      this.getOrders(
        undefined,
        Math.ceil(this.orders.length / process.env.VUE_APP_VIEW_SIZE).toString()
      ).then(() => {
        event.target.complete();
      })
    },
    async openOrderFilterMenu() {
      await menuController.open();
    }
  },
  async mounted() {
    await this.getOrders();
    await this.store.dispatch('order/getPurchaseOrderIds').then(ids => {
      if(ids.length > 0) {
        this.poIds = ids
      }
    })
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const queryString = ref();
    const orderStatus = JSON.parse(process.env.VUE_APP_ORDER_STATUS)
    const itemStatus = JSON.parse(process.env.VUE_APP_ITEM_STATUS)
    const orderPreOrderId = process.env.VUE_APP_PRE_ORDER_IDNT_ID
    const orderBackOrderId = process.env.VUE_APP_BACKORDER_IDNT_ID

    return {
<<<<<<< HEAD
      close,
=======
      cusotmerLoyaltyOptions,
      documentTextOutline,
>>>>>>> c10acbe1d29f58c4114c2155024cf5e709e2b0b1
      downloadOutline,
      filterOutline,
      itemStatus,
      pricetag,
      orderStatus,
      orderBackOrderId,
      orderPreOrderId,
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
