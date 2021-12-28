<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Order detail") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="syncOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="order-detail">
        <div class="order-ID">
          <ion-item lines="none">
            <ion-icon slot="start" :icon="ticketOutline" />
            <ion-label>{{ order.id }}</ion-label>
            <ion-badge slot="end">{{ order.statusDescription }}</ion-badge>
            <ion-icon slot="end" :icon="caretDown" />
          </ion-item>
        </div>
        <div class="order-timeline">
          <div class="timeline-header">
            <ion-item>
              <ion-label>{{ $t("Timeline") }}</ion-label>
              <!-- TODO: Add timeline -->
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>
          </div>
          <div class="desktop-only">
            <ion-list>
              <ion-item v-for="item in 7" :key="item">
                <ion-icon :icon="ticketOutline" slot="start" />
                <ion-label>
                  <p>+10 minutes</p>
                  Imported from Shopify
                </ion-label>
                <ion-icon slot="end" :icon="informationCircleOutline" />
              </ion-item>
            </ion-list>
          </div>
        </div>
        <div class="order-card">
          <ion-card>
            <ion-list>
              <ion-item lines="none">
                <ion-label>{{ order.customerName }}</ion-label>
                <ion-chip slot="end" v-if="order.cusotmerLoyaltyOptions">
                  <ion-icon :icon="ribbon" />
                  <!-- TODO: handle this property -->
                  <ion-label>{{ order.cusotmerLoyaltyOptions }}</ion-label>
                </ion-chip>
              </ion-item>
              <ion-item lines="full" v-if="order.billTo?.email?.email">
                <ion-icon :icon="mailOutline" slot="start" />
                <ion-label>{{ order.billTo?.email?.email }}</ion-label>
              </ion-item>
              <ion-item v-if="order.billTo?.phoneNumber?.contactNumber">
                <ion-icon :icon="callOutline" slot="start" />
                <ion-label>{{ order.billTo?.phoneNumber?.contactNumber }}</ion-label>
              </ion-item>
              <ion-item lines="none" v-if="order.billTo?.postalAddress?.toName || order.billTo?.postalAddress?.address1 || order.billTo?.postalAddress?.address2 || order.billTo?.postalAddress?.city || order.billTo?.postalAddress?.country">
                <ion-icon :icon="cashOutline" slot="start" />
                <ion-label>
                  <ion-label>{{ order.billTo?.postalAddress?.toName }}</ion-label>
                  <p>{{ order.billTo?.postalAddress?.address1 }}</p>
                  <p>{{ order.billTo?.postalAddress?.address2 }}</p>
                  <p>{{ order.billTo?.postalAddress?.city }}</p>
                  <p>{{ order.billTo?.postalAddress?.country }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
          <ion-card>
            <ion-list>
              <ion-list-header>Shopify IDs</ion-list-header>
              <ion-item>
                <ion-label> {{ $t("Order Number") }} </ion-label>
                <p slot="end">{{ order.orderNumber ? order.orderNumber : "-" }}</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Order ID") }} </ion-label>
                <p slot="end">{{ order.orderId ? order.orderId : "-" }}</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Order Name") }} </ion-label>
                <p slot="end">{{ order.orderName ? order.orderName : "-" }}</p>
              </ion-item>
            </ion-list>
          </ion-card>
        </div>
      </div>
      <div class="products">
        <ion-item lines="none">
          <ion-icon slot="start" :icon="shirtOutline" />
          <ion-label>{{ $t("Products") }}</ion-label>
        </ion-item>
        <div class="product" v-for="(shipGroup, index) of order.shipGroup" :key="index">
          <div class="desktop-only" v-for="(item, index) of shipGroup.items" :key="index">
            <Image :src="getProduct(item.productId).mainImageUrl" />
            <!-- TODO: work on this functionality -->
            <ion-button color="secondary" fill="outline">
              product inventory
              <ion-icon :icon="openOutline" />
            </ion-button>
          </div>
          <div class="mobileonly" v-for="(item, index) of shipGroup.items" :key="index">
            <div class="product-detail">
              <div class="product-virtual">
                <ion-item lines="none">
                  <ion-thumbnail slot="start" class="mobile-only">
                    <Image :src="getProduct(item.productId).mainImageUrl" />
                  </ion-thumbnail>
                  <ion-label>
                    <p>{{ item.brandName }}</p>
                    {{item.name}}
                    <p> {{ $t("Color") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }} </p>
                    <p> {{ $t("Size") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }} </p>
                  </ion-label>
                </ion-item>
              </div>
              <div class="product-tags">
                <ion-chip v-if="getProduct(item.itemId).goodIdentifications" >
                  <ion-icon />
                  <ion-label>{{ $filters.getIdentificationId(getProduct(item.itemId).goodIdentifications, goodIdentificationTypeId) }}</ion-label>
                </ion-chip>
              </div>
              <div class="product-metadata">
                <ion-item lines="none" detail>
                  <ion-badge slot="end" color="success"> {{ item.status }} </ion-badge>
                </ion-item>
              </div>
            </div>
            <div class="desktop-only">
              <div class="order-card">
                <ion-card>
                  <ion-list>
                    <ion-item lines="none">
                      <ion-label>Destination</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-label>
                        <ion-label>{{ shipGroup.shipTo.postalAddress.toName }}</ion-label>
                        <p>{{ shipGroup.shipTo.postalAddress.address1 }}</p>
                        <p>{{ shipGroup.shipTo.postalAddress.address2 }}</p>
                        <p>{{ shipGroup.shipTo.postalAddress.city }}</p>
                        <p>{{ shipGroup.shipTo.postalAddress.country }}</p>
                        <p>{{ shipGroup.shipTo.postalAddress.postalCode }}</p>
                      </ion-label>
                    </ion-item>
                    <ion-buttons>
                      <!-- TODO: work on this functionality -->
                      <ion-button color="primary" fill="clear">edit address</ion-button>
                    </ion-buttons>
                  </ion-list>
                </ion-card>
                <ion-card>
                  <ion-list>
                    <ion-list-header>{{ $t("Pre-order") }}</ion-list-header>
                    <ion-item>
                      <ion-label> {{ $t("Purchase Order") }} </ion-label>
                      <!-- TODO: work on this property -->
                      <ion-chip slot="end">PO#</ion-chip>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Estimated arrival") }} </ion-label>
                      <!-- TODO: handle it property again -->
                      <p slot="end">{{ item.arrivalDate ? item.arrivalDate : "-" }}</p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Promise date") }} </ion-label>
                      <p slot="end">{{ item.promisedDatetime ? item.promisedDatetime : "-" }}</p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Auto cancel") }} </ion-label>
                      <p slot="end">{{ item.autoCancelDate ? item.autoCancelDate : "-" }}</p>
                    </ion-item>
                     <ion-buttons>
                      <!-- TODO: work on this functionality -->
                      <ion-button color="primary" fill="clear">Edit dates</ion-button>
                    </ion-buttons>
                    
                  </ion-list>
                </ion-card>
                <ion-card>
                  <ion-list>
                    <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
                    <ion-item>
                      <ion-label> {{ $t("Shipping method") }} </ion-label>
                      <p>{{ shipGroup.shipmentMethodTypeId ? shipGroup.shipmentMethodTypeId : "-"}}</p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("Tracking number") }} </ion-label>
                      <p>{{ shipGroup.trackingNumber ? shipGroup.trackingNumber : "-"}}</p>
                    </ion-item>
                    <ion-item>
                     <ion-label> {{ $t("Location inventory") }} </ion-label>
                      <!-- TODO: handle this property -->
                      <p>{{ item.quantity ? item.quantity : "-" }}</p>
                    </ion-item>
                     <ion-buttons>
                      <!-- TODO: work on this functionality -->
                      <ion-button color="primary" fill="clear">Change fulfillment location</ion-button>
                    </ion-buttons>
                    
                  </ion-list>
                </ion-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import Image from "@/components/Image.vue";
import {
  callOutline,
  caretDown,
  cashOutline,
  informationCircleOutline,
  mailOutline,
  openOutline,
  ribbon,
  shirtOutline,
  syncOutline,
  ticketOutline,
} from "ionicons/icons";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { useStore } from "@/store";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Image,
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
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
    IonThumbnail,
    IonTitle,
    IonToolbar,
  },
  data(){
    return {
      goodIdentificationTypeId: process.env.VUE_APP_PRDT_IDENT_TYPE_ID
    }
  },
  // props:['orderId'],
  name: "OrderDetail",
  computed: {
    ...mapGetters({
      order: 'order/getOrderDetails',
      getProduct: 'product/getProduct',
    })
  },
  methods:{
    orderDetails(orderId?: any){
      // const order = this.store.state.orders
      this.store.dispatch("order/getOrderDetails", orderId);
    }
  },
  mounted(){
    this.orderDetails(this.$route.params.slug);
  },
  setup() {
    const store = useStore();
    return {
      callOutline,
      caretDown,
      cashOutline,
      informationCircleOutline,
      mailOutline,
      openOutline,
      ribbon,
      shirtOutline,
      store,
      syncOutline,
      ticketOutline,
    };
  },
});
</script>
<style scoped>
.order-ID {
  grid-area: ID;
}
.order-timeline {
  grid-area: timeline;
  border-left: 0.5px solid #92949c;
}
.timeline-header {
  grid-area: header;
}
.order-card {
  grid-area: card;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
  gap: 10px;
  align-content: start;
}
.product-detail {
  display: grid;
  grid: "virtual tags metadata" / max-content 1fr max-content;
  grid-area: detail;
  border-bottom: 1px solid #92949c;
  border-top: 1px solid #92949c;
  
}
.product-tags {
  display: none;
}
.product-metadata{
  align-self: center;
}
.product {
  grid-area: product;
}
.desktop-only {
  display: none;
}

@media (min-width: 900px) {
  .order-detail {
    display: grid;
    grid-template-areas:
      "ID timeline"
      "card timeline";
  }
  .desktop-only {
    display: unset;
    grid-area: image;
    height: 362px;
  }
  .product-tags {
    display: unset;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .product {
    display: grid;
    grid: "image mobileonly"/240px auto;
  }
}
</style>