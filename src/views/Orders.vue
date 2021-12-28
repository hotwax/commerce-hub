<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-label color="secondary" slot="end">
          <ion-button fill="clear">{{ $t("Download orders") }}</ion-button>
        </ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="order">
        <div class="search">
          <ion-searchbar />
        </div>
        <div class="order-filter">
          <ion-list>
            <ion-list-header>Date</ion-list-header>
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
            <ion-list-header>Type</ion-list-header>
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
            <ion-list-header>Date</ion-list-header>
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
              <ion-title>Purchase date</ion-title>
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
        </div>
        <div class="order-detail" @click="openDetailsPage(order.doclist.docs[0].orderId)" v-for="(order, index) in orders" :key="index" :order="order">
          <div class="order-header">
            <div class="order-id">
              <ion-item lines="none">
                <ion-label>
                  {{ order.doclist.docs[0].orderId }}
                  <p> {{ order.doclist.docs[0].customerName }} </p>
                </ion-label>
              </ion-item>
            </div>
            <div class="order-tags">
              <ion-chip @click="copyToClipboard($filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId'))"  outline v-if="$filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId')">
                <ion-icon :icon="pricetag" />
                <ion-label>{{ $filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, 'orderIdentificationTypeId') }}</ion-label>
              </ion-chip>
              <ion-chip outline v-if="$filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, 'cusotmerLoyaltyOptions')">
                <ion-icon :icon="ribbon" />
                <ion-label>{{ $filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, 'cusotmerLoyaltyOptions') }}</ion-label>
              </ion-chip>
            </div>
            <div class="order-metatags">
              <ion-note>{{ $t("Ordered on") }} {{ $filters.formatUtcDate(order.doclist.docs[0].orderDate, 'YYYY-MM-DDTHH:mm:ssZ') }}</ion-note>
              <div class="tags">
                <ion-badge color="primary" slot="end"> {{ order.doclist.docs[0].orderStatusId }} </ion-badge>
              </div>
            </div>
          </div>
          <div class="order-items">
            <ion-card v-for="(item, index) in order.doclist.docs" :key="index" :item="item">
              <ion-item>
                <ion-thumbnail slot="start">
                  <Image :src="getProduct(item.productId).mainImageUrl" />
                </ion-thumbnail>
                <ion-label>
                  <p>{{ getProduct(item.productId).brandName ? getProduct(item.productId).brandName : '-' }}</p>
                  {{ item.virtualProductName }}
                  <p> {{ $t("Color") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }} </p>
                  <p> {{ $t("Size") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }} </p>
                </ion-label>
                <ion-badge color="success" slot="end"> {{ item.orderItemStatusId }} </ion-badge>
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
                  <p slot="end">
                    {{ $filters.getShippingFrom(item.orderRoles, '1/Ship-From Vendor/') ? $filters.getShippingFrom(item.orderRoles, '1/Ship-From Vendor/') : "-" }}
                  </p>
                </ion-item>
                <ion-item>
                  <ion-label> {{ $t("Location inventory") }} </ion-label>
                  <p slot="end"> {{item.uniqueOrderItemsCount}} </p>
                </ion-item>
              </div>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
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
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { pricetag, ribbon } from "ionicons/icons";
import { useStore } from "@/store";
import { mapGetters } from "vuex";
import { showToast } from '@/utils'
import { Plugins } from '@capacitor/core';
import Image from '@/components/Image.vue';
import router from "../router"

const { Clipboard } = Plugins;

export default defineComponent({
  name: "Order",
  components: {
    Image,
    IonBackButton,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
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
  },
  computed: {
    ...mapGetters({
      orders: 'order/getList',
      getProduct: 'product/getProduct',
      currentFacilityId: 'user/getCurrentFacility'
    })
  },
  methods: {
    async getOrders(vSize?: any){
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const payload = {
        "json": {
        "params": {
          "rows": viewSize,
          "group": true,
          "group.field": "orderId",
          "group.limit": 10000
        },
        "query": "docType:OISGIR",
        "fields": ""
      }
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
    openDetailsPage(orderId: any){
      router.push({
        path:`/orderdetail/${orderId}`,
      })
    }
  },
  mounted() {
    this.getOrders();
  },
  setup() {
    const store = useStore();
    return {
      pricetag,
      ribbon,
      store
    };
  }
})
</script>
<style scoped>
.order-header {
  display: grid;
  grid-template-areas:
    "id metadata"
    "tags tags";
}
.order-id {
  grid-area: id;
}
.order-tags {
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
}
.text {
  margin-right: 40px;
}
.order-metatags {
  grid-area: metadata;
  justify-self: end;
  margin-right: 10px;
  align-self: center;
}
.metatags {
  display: block;
}
.tags {
  display: flex;
  justify-content: flex-end;
}
.order-filter {
  display: none;
}
@media (min-width: 900px) {
  .order-header {
    grid: "id tags metadata" / max-content 1fr max-content;
  }
  .order-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
    gap: 10px;
  }
  .order-tags {
    justify-content: center;
  }
  .order {
    display: grid;
    grid-template-areas:
      "search details"
      "filter details";
  }
  .order-filter {
    grid-area: filter;
    display: unset;
  }
  .order-detail {
    grid-area: details;
  }
  .search {
    grid-area: search;
  }
}
</style>
