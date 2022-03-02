<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="syncOutline" />
          </ion-button>
          <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="downloadOutline" />
          </ion-button>
          <ion-button fill="clear" class="mobile-only" @click="openOrderFilterModal()">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="find">
        <section class="search">
          <ion-searchbar v-model="queryString" @keyup.enter="getOrders()"/>
        </section>

        <aside class="filters desktop-only">
          <ion-list>
            <ion-list-header>{{ $t("Date") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Order created") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Promise date") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Auto cancel date") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list @click="getOrders()">
            <ion-list-header>{{ $t("Type") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Store pickup") }}</ion-label>
              <ion-checkbox v-model="appliedFilters.type.storePickup" />
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Ship from store") }}</ion-label>
              <ion-checkbox v-model="appliedFilters.type.shipFromStore"/>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Pre-order") }}</ion-label>
              <ion-checkbox v-model="appliedFilters.type.preOrder"/>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Back order") }}</ion-label>
              <ion-checkbox v-model="appliedFilters.type.backOrder"/>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Unfillable") }}</ion-label>
              <ion-checkbox v-model="appliedFilters.type.unfillable"/>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Status") }}</ion-label>
              <ion-select :value="appliedFilters.fulfillment.status" @ionChange.prevent="($event) => {appliedFilters.fulfillment.status = $event['detail'].value; getOrders()}" interface="popover">
                <ion-select-option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Shipping method") }}</ion-label>
              <ion-select :value="appliedFilters.fulfillment.shippingMethod" @ionChange.prevent="($event) => {appliedFilters.fulfillment.shippingMethod = $event['detail'].value; getOrders()}" interface="popover">
                <ion-select-option v-for="method in shippingMethodOptions" :key="method" :value="method">{{ method }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Ship from location") }}</ion-label>
              <ion-select :value="appliedFilters.fulfillment.shipFromLocation" @ionChange="($event) => {appliedFilters.fulfillment.shipFromLocation = $event['detail'].value; getOrders()}" interface="popover">
                <ion-select-option value="any" >{{ $t('Any') }}</ion-select-option>
                <ion-select-option value="store" >{{ $t('Store') }}</ion-select-option>
                <ion-select-option value="warehouse" >{{ $t('Warehouse') }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>

          <ion-card>
            <ion-toolbar>
              <ion-title>{{ $t("Purchase orders") }}</ion-title>
            </ion-toolbar>
            <ion-card-content>
              <ion-chip v-for="(id, index) in poIds" :key="index">
                <ion-label>{{ id }}</ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>
        </aside>

        <main>
          <section class="sort"></section>

          <!-- Order Item Section -->
          <hr />

          <div v-for="(order, index) in orders" :key="index" :order="order" @click="() => router.push(`/order/${order.orderId}`)">
            <section class="section-header">
              <div class="primary-info">
                <ion-item lines="none">
                  <ion-label>
                    {{ order.orderId }}
                    <p> {{ order.customerPartyName }} </p>
                  </ion-label>
                </ion-item>
              </div>

              <div class="tags">
                <ion-chip @click="copyToClipboard(order.orderName)" outline v-if="order.orderName">
                  <ion-icon :icon="pricetag" />
                  <ion-label> {{ order.orderName }} </ion-label>
                </ion-chip>
                <ion-chip outline v-if="$filters.getCustomerLoyalty(order.orderNotes, 'cusotmerLoyaltyOptions')">
                  <ion-icon :icon="ribbon" />
                  <ion-label> {{ $filters.getCustomerLoyalty(order.orderNotes, 'cusotmerLoyaltyOptions') }} </ion-label>
                </ion-chip>
              </div>

              <div class="metadata">
                <ion-note> {{ $t("Ordered on") }} {{ $filters.formatUtcDate(order.orderDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') }} </ion-note>
                <ion-badge :color="orderStatus[order.orderStatusId].color ? orderStatus[order.orderStatusId].color : 'primary'">{{ orderStatus[order.orderStatusId].label ? orderStatus[order.orderStatusId].label : order.orderStatusId }}</ion-badge>
              </div>
            </section>

            <section class="section-grid">
                <ion-card v-for="(item, index) in order.doclist.docs" :key="index" :item="item">
                  <ion-item>
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
                    <ion-badge :color="itemStatus[item.orderItemStatusId].color ? itemStatus[item.orderItemStatusId].color : 'primary'" slot="end"> {{ itemStatus[item.orderItemStatusId].label ? itemStatus[item.orderItemStatusId].label : item.orderItemStatusId }} </ion-badge>
                  </ion-item>
                  <!-- TODO: Need to handle this property -->
                  <div v-if="item.facilityId === orderPreOrderId || item.facilityId === orderBackOrderId">
                    <ion-item>
                      <ion-label> {{ $t("Promise date") }} </ion-label>
                      <p slot="end"> {{ item.promisedDatetime ? $filters.formatUtcDate(item.promisedDatetime, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-'  }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("PO arrival date") }} </ion-label>
                      <!-- TODO: Need to handle this property -->
                      <p slot="end"> {{ item.promiseOrderArrivalDate ? $filters.formatUtcDate(item.promiseOrderArrivalDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-' }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Location") }} </ion-label>
                      <!-- TODO: Need to handle this property -->
                      <p slot="end"> {{ item.facilityName ? item.facilityName : '-' }} </p>
                    </ion-item>
                  </div>
                  <div v-else>
                    <ion-item>
                      <ion-label> {{ $t("Shipping method") }} </ion-label>
                      <p slot="end"> {{ item.shipmentMethodTypeId }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Shipping from") }} </ion-label>
                      <p slot="end"> {{ item.facilityName ? item.facilityName : "-" }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Location inventory") }} </ion-label>
                      <p slot="end">{{ getProductStock(item.productId) }}</p>
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
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  modalController
} from '@ionic/vue';
import {
  downloadOutline,
  filterOutline,
  pricetag,
  ribbon,
  syncOutline,
} from 'ionicons/icons';
import { defineComponent, reactive, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { showToast } from '@/utils'
import { Plugins } from '@capacitor/core';
import Image from '@/components/Image.vue';
import OrderFilterModal from '@/components/OrderFilterModal.vue';
import { useRouter } from 'vue-router';

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
    IonCardContent,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonPage,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonTitle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
      orders: 'order/getOrders',
      getProduct: 'product/getProduct',
      currentFacilityId: 'user/getCurrentFacility',
      getProductStock: 'stock/getProductStock',
      isScrollable: 'order/isScrollable'
    })
  },
  data() {
    return {
      shippingMethodOptions: [],
      orderStatusOptions: [],
      poIds: []
    }
  },
  methods: {
    async getOrders(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;
      let typeFilterSelected = [];

      const payload = {
        "json": {
          "params": {
            "sort": "orderDate desc",
            "rows": viewSize,
            "start": viewSize * viewIndex,
            "group": true,
            "group.field": "orderId",
            "group.limit": 10000,
            "group.ngroups": true
          } as any,
          "query": "*:*",
          "filter": "docType: ORDER AND orderTypeId: SALES_ORDER",
          "facet": {
            "orderStatusIdFacet": {
                "field": "orderStatusId",
                "mincount": 0,
                "limit": -1,
                "sort": "index",
                "type": "terms"
            },
            "shipmentMethodTypeIdFacet": {
              "excludeTags": "shipmentMethodTypeIdFilter",
              "field": "shipmentMethodTypeId",
              "mincount": 0,
              "limit": -1,
              "sort": "index",
              "type": "terms"
            }
          }
        }
      }
      if (this.queryString) {
        payload.json.params.defType = 'edismax'
        payload.json.params.qf = 'orderId customerPartyName customerPartyId productId internalName'
        payload.json.params['q.op'] = 'AND'
        payload.json.query = `*${this.queryString}*`
      }

      if (this.appliedFilters.type.storePickup) {
        payload.json.filter = payload.json.filter.concat(' AND shipmentMethodTypeId: STOREPICKUP')
      }

      if (this.appliedFilters.type.preOrder) {
        typeFilterSelected.push('PRE_ORDER_PARKING')
      }

      if (this.appliedFilters.type.backOrder) {
        typeFilterSelected.push('BACKORDER_PARKING')
      }

      if (this.appliedFilters.type.unfillable) {
        typeFilterSelected.push('_NA_')
      }

      const typeFilterSelectedValues = typeFilterSelected.toString().replaceAll(",", " OR ")

      payload.json.filter = payload.json.filter.concat(` AND facilityId: (${typeFilterSelectedValues ? typeFilterSelectedValues : '*'})`)

      if (this.appliedFilters.fulfillment.shipFromLocation === 'store') {
        payload.json.filter = payload.json.filter.concat(' AND facilityTypeId: RETAIL_STORE')
      } else if (this.appliedFilters.fulfillment.shipFromLocation === 'warehouse') {
        payload.json.filter = payload.json.filter.concat(' AND facilityTypeId: WAREHOUSE')
      }

      if (this.appliedFilters.fulfillment.status) {
        payload.json.filter = payload.json.filter.concat(` AND orderStatusId: ${this.appliedFilters.fulfillment.status}`)
      }

      if (this.appliedFilters.fulfillment.shippingMethod) {
        payload.json.filter = payload.json.filter.concat(` AND shipmentMethodTypeId: ${this.appliedFilters.fulfillment.shippingMethod}`)
      }

      await this.store.dispatch("order/findOrders", payload).then(resp => {
        if (resp.status == 200 && resp.data.facets) {
          this.orderStatusOptions = resp.data.facets?.orderStatusIdFacet?.buckets.map((status: any) => status.val)
          this.shippingMethodOptions = resp.data.facets?.shipmentMethodTypeIdFacet?.buckets.map((shippingMethod: any) => shippingMethod.val)
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
    async openOrderFilterModal() {
      const orderFilterModal = await modalController.create({
        component: OrderFilterModal
      });
      return orderFilterModal.present();
    }
  },
  async mounted() {
    this.getOrders();
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
    const appliedFilters = reactive({
      'date': {
        'orderCreated': '',
        'promiseDate': '',
        'autoCancelDate': ''
      },
      'type': {
        'storePickup': false,
        'shipFromStore': false,
        'preOrder': false,
        'backOrder': false,
        'unfillable': false
      },
      'fulfillment': {
        'status': '',
        'shippingMethod': '',
        'shipFromLocation': 'any'
      }
    })

    return {
      downloadOutline,
      filterOutline,
      itemStatus,
      pricetag,
      orderStatus,
      orderBackOrderId,
      orderPreOrderId,
      ribbon,
      syncOutline,
      router,
      appliedFilters,
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

@media (min-width: 991px) {
  .main {
    margin-left: var(--spacer-xl);
  }
}
</style>
