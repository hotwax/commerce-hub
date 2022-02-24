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
          <ion-button fill="clear" class="mobile-only">
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
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header>{{ $t("Type") }}</ion-list-header>
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
            <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
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
        </aside>

        <main>
          <section class="sort"></section>

          <!-- Order Item Section -->
          <hr />

          <div v-for="(order, index) in orders" :key="index" :order="order" @click="() => router.push(`/order/${order.doclist.docs[0].orderId}`)">
            <section class="section-header">
              <div class="primary-info">
                <ion-item lines="none">
                  <ion-label>
                    {{ order.doclist.docs[0].orderId }}
                    <p> {{ order.doclist.docs[0].customerPartyName }} </p>
                  </ion-label>
                </ion-item>
              </div>

              <div class="tags">
                <ion-chip @click="copyToClipboard($filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId'))"  outline v-if="$filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId')">
                  <ion-icon :icon="pricetag" />
                  <ion-label> {{ $filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId') }} </ion-label>
                </ion-chip>
                <ion-chip outline v-if="$filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, 'cusotmerLoyaltyOptions')">
                  <ion-icon :icon="ribbon" />
                  <ion-label> {{ $filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, 'cusotmerLoyaltyOptions') }} </ion-label>
                </ion-chip>
              </div>

              <div class="metadata">
                <ion-note> {{ $t("Ordered on") }} {{ $filters.formatUtcDate(order.doclist.docs[0].orderDate, 'YYYY-MM-DDTHH:mm:ssZ') }} </ion-note>
                <ion-badge :color="orderStatus[order.doclist.docs[0].orderStatusId].color">{{ orderStatus[order.doclist.docs[0].orderStatusId].label }}</ion-badge>
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
                    <ion-badge :color="itemStatus[item.orderItemStatusId].color" slot="end"> {{ itemStatus[item.orderItemStatusId].label }} </ion-badge>
                  </ion-item>
                  <!-- TODO: Need to handle this property -->
                  <div v-if="item.preOrderStatus || item.backOrderStatus || item.unFillable">
                    <ion-item>
                      <ion-label> {{ $t("Promise date") }} </ion-label>
                      <p slot="end"> {{ item.promisedDatetime ? $filters.formatUtcDate(item.promisedDatetime, 'YYYY-MM-DDTHH:mm:ssZ') : '-'  }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("PO arrival date") }} </ion-label>
                      <!-- TODO: Need to handle this property -->
                      <p slot="end"> {{ item.promiseOrderArrivalDate ? item.promiseOrderArrivalDate : '-' }} </p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Last brokered") }} </ion-label>
                      <!-- TODO: Need to handle this property -->
                      <p slot="end"> {{ item.lastBrokered ? item.lastBrokered : '-' }} </p>
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
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonSelectOption
} from '@ionic/vue';
import {
  downloadOutline,
  filterOutline,
  pricetag,
  ribbon,
  syncOutline,
} from 'ionicons/icons';
import { defineComponent, reactive, ref } from "vue";
import { mapGetters } from "vuex";
import { showToast } from '@/utils'
import { Plugins } from '@capacitor/core';
import Image from '@/components/Image.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const { Clipboard } = Plugins;

export default defineComponent ({
  name: 'Order',
  components: {
    Image,
    IonSelectOption,
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
    IonThumbnail,
    IonTitle,
    IonToolbar,
  },
  computed: {
    ...mapGetters({
      orders: 'order/getList',
      getProduct: 'product/getProduct',
      currentFacilityId: 'user/getCurrentFacility',
      getProductStock: 'stock/getProductStock',
      isScrollable: 'order/isScrollable'
    })
  },
  methods: {
    async getOrders(vSize?: any, vIndex?: any){
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;
      const payload = {
        "json": {
          "params": {
            "rows": viewSize,
            "start": viewSize * viewIndex,
            "group": true,
            "group.field": "orderId",
            "group.limit": 10000,
            "group.ngroups": true
          } as any,
          "query": "*:*",
          "filter": "docType: ORDER AND orderTypeId: SALES_ORDER"
        }
      }
      if (this.queryString) {
        payload.json.params.defType = 'edismax'
        payload.json.params.qf = 'orderId customerPartyName customerPartyId productId internalName'
        payload.json.params['q.op'] = 'AND'
        payload.json.query = `*${this.queryString}*`
      }
      await this.store.dispatch("order/findOrders", payload);
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
    }
  },
  mounted() {
    this.getOrders();
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const queryString = ref();
    const orderStatus = reactive(JSON.parse(process.env.VUE_APP_ORDER_STATUS))
    const itemStatus = reactive(JSON.parse(process.env.VUE_APP_ITEM_STATUS))

    return {
      downloadOutline,
      filterOutline,
      itemStatus,
      pricetag,
      orderStatus,
      ribbon,
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

@media (min-width: 991px) {
  .main {
    margin-left: var(--spacer-xl);
  }
}
</style>
