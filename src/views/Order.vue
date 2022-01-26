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
      <main class="main-content">
        <section class="header">
          <div class="id">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="ticketOutline" />
              <ion-label> {{ order.id }} </ion-label>
              <ion-badge slot="end"> {{ order.statusDescription }} </ion-badge>
              <ion-icon slot="end" :icon="caretDown" />
            </ion-item>
          </div>

          <div class="timeline">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="timeOutline" class="mobile-only" />
              <ion-label>{{ $t("Timeline") }}</ion-label>
              <!-- TODO: Add timeline -->
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>

            <!-- TODO: Implement this functionality -->
            <div class="desktop-only">
              <ion-item v-for="item in 7" :key="item">
                <ion-icon :icon="ticketOutline" slot="start" />
                <ion-label>
                  <p>+10 minutes</p>
                  Imported from Shopify
                </ion-label>
                <ion-icon slot="end" :icon="informationCircleOutline" />
              </ion-item>
            </div>
          </div>

          <div class="info">
            <ion-card>
              <ion-list>
                <ion-item lines="none">
                  <ion-label> {{ order.customerName }} </ion-label>
                  <ion-chip slot="end" v-if="order.cusotmerLoyaltyOptions">
                    <ion-icon :icon="ribbon" />
                    <!-- TODO: handle this property when comes with response -->
                    <ion-label> {{ order.cusotmerLoyaltyOptions }} </ion-label>
                  </ion-chip>
                </ion-item>
                <ion-item v-if="order.billTo?.email?.email">
                  <ion-icon :icon="mailOutline" slot="start" />
                  <ion-label> {{ order.billTo?.email?.email }} </ion-label>
                </ion-item>
                <ion-item v-if="order.billTo?.phoneNumber?.contactNumber">
                  <ion-icon :icon="callOutline" slot="start" />
                  <ion-label> {{ order.billTo?.phoneNumber?.contactNumber }} </ion-label>
                </ion-item>
                <ion-item lines="none" v-if="order.billTo?.postalAddress?.toName || order.billTo?.postalAddress?.address1 || order.billTo?.postalAddress?.address2 || order.billTo?.postalAddress?.city || order.billTo?.postalAddress?.country">
                  <ion-icon :icon="cashOutline" slot="start" />
                  <ion-label>
                    {{ order.billTo?.postalAddress?.toName }}
                    <p> {{ order.billTo?.postalAddress?.address1 }} </p>
                    <p> {{ order.billTo?.postalAddress?.address2 }} </p>
                    <p> {{ order.billTo?.postalAddress?.city }} </p>
                    <p> {{ order.billTo?.postalAddress?.country }} </p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>
            <ion-card>
              <ion-list>
                <ion-list-header>{{ $t("Shopify IDs") }}</ion-list-header>
                <ion-item>
                  <ion-label> {{ $t("Order Number") }} </ion-label>
                  <p slot="end"> {{ order.orderNumber ? order.orderNumber : "-" }} </p>
                </ion-item>
                <ion-item>
                  <ion-label> {{ $t("Order ID") }} </ion-label>
                  <p slot="end"> {{ order.orderId ? order.orderId : "-" }} </p>
                </ion-item>
                <ion-item lines="none">
                  <ion-label> {{ $t("Order Name") }} </ion-label>
                  <p slot="end"> {{ order.orderName ? order.orderName : "-" }} </p>
                </ion-item>
              </ion-list>
            </ion-card>
          </div>
        </section>

        <!-- Product section -->
        <section>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="shirtOutline" />
            <ion-label>{{ $t("Products") }}</ion-label>
          </ion-item>

          <div class="product-detail" v-for="(shipGroup, index) of order.shipGroup" :key="index">
            <div class="product-image desktop-only" v-for="(item, index) of shipGroup.items" :key="index">
              <Image :src="getProduct(item.productId).mainImageUrl" />
              <!-- TODO: work on this functionality -->
              <ion-button color="secondary" fill="outline">
                {{ $t("Product inventory") }}
                <ion-icon :icon="openOutline" slot="end" />
              </ion-button>
            </div>

            <div class="product-info" v-for="(item, index) of shipGroup.items" :key="index">
              <hr />

              <div class="product-header">
                <div>
                  <ion-item lines="none">
                    <ion-thumbnail slot="start" class="mobile-only">
                      <Image :src="getProduct(item.productId).mainImageUrl" />
                    </ion-thumbnail>
                    <ion-label>
                      <p> {{ item.brandName }} </p>
                      {{item.name}}
                      <p> {{ $t("Color") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }} </p>
                      <p> {{ $t("Size") }} : {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }} </p>
                    </ion-label>
                  </ion-item>
                </div>

                <div class="product-tags desktop-only">
                  <ion-chip v-if="getProduct(item.itemId).goodIdentifications">
                    <!-- TODO update shopify icon later -->
                    <ion-icon :icon="pricetag" />
                    <ion-label> {{ $filters.getIdentificationId(getProduct(item.itemId).goodIdentifications, goodIdentificationTypeId) }} </ion-label>
                  </ion-chip>
                </div>

                <div>
                  <ion-item lines="none" detail>
                    <ion-badge slot="end" color="success"> {{ item.status }} </ion-badge>
                  </ion-item>
                </div>
              </div>

              <hr />

              <div class="desktop-only">
                <div class="product-card">
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Destination") }}</ion-list-header>
                      <ion-item>
                        <ion-label>
                          {{ shipGroup.shipTo.postalAddress.toName }}
                          <p>{{ shipGroup.shipTo.postalAddress.address1 }}</p>
                          <p>{{ shipGroup.shipTo.postalAddress.address2 }}</p>
                          <p>{{ shipGroup.shipTo.postalAddress.city }}</p>
                          <p>{{ shipGroup.shipTo.postalAddress.country }}</p>
                          <p>{{ shipGroup.shipTo.postalAddress.postalCode }}</p>
                        </ion-label>
                      </ion-item>
                      <ion-buttons>
                        <ion-button color="primary" fill="clear">{{ $t("Edit address") }}</ion-button>
                      </ion-buttons>
                    </ion-list>
                  </ion-card>
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Pre-order") }}</ion-list-header>
                      <ion-item>
                        <ion-label> {{ $t("Purchase order") }} </ion-label>
                        <ion-chip slot="end">
                          <!-- TODO: work on this property -->
                          <ion-label>PO#</ion-label>
                        </ion-chip>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Estimated arrival") }} </ion-label>
                        <!-- TODO: handle it property again -->
                        <p slot="end"> {{ item.arrivalDate ? item.arrivalDate : "-" }} </p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Promise date") }} </ion-label>
                        <p slot="end"> {{ item.promisedDatetime ? item.promisedDatetime : "-" }} </p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Auto cancel") }} </ion-label>
                        <p slot="end"> {{ item.autoCancelDate ? item.autoCancelDate : "-" }} </p>
                      </ion-item>
                      <ion-buttons>
                        <!-- TODO: work on this functionality -->
                        <ion-button color="primary" fill="clear">{{ $t("Edit dates") }}</ion-button>
                      </ion-buttons>
                    </ion-list>
                  </ion-card>
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
                      <ion-item>
                        <ion-label> {{ $t("Shipping method") }} </ion-label>
                        <p> {{ shipGroup.shipmentMethodTypeId ? shipGroup.shipmentMethodTypeId : "-"}} </p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Tracking number") }} </ion-label>
                        <p> {{ shipGroup.trackingNumber ? shipGroup.trackingNumber : "-"}} </p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Location Inventory") }} </ion-label>
                        <!-- TODO: handle this property -->
                        <p> {{ item.quantity ? item.quantity : "-" }} </p>
                      </ion-item>
                      <ion-buttons>
                        <!-- TODO: work on this functionality -->
                        <ion-button color="primary" fill="clear">{{ $t("Change fulfillment location") }}</ion-button>
                      </ion-buttons>
                    </ion-list>
                  </ion-card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import Image from '@/components/Image.vue';
import {
  callOutline,
  caretDown,
  cashOutline,
  informationCircleOutline,
  mailOutline,
  openOutline,
  pricetag,
  ribbon,
  shirtOutline,
  syncOutline,
  ticketOutline,
  timeOutline
} from 'ionicons/icons';
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
  IonToolbar
} from '@ionic/vue';
import { useStore } from "@/store";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Order',
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
    IonToolbar
  },
  data(){
    return {
      goodIdentificationTypeId: process.env.VUE_APP_PRDT_IDENT_TYPE_ID
    }
  },
  computed: {
    ...mapGetters({
      order: 'order/getOrderDetails',
      getProduct: 'product/getProduct',
    })
  },
  methods:{
    orderDetails(orderId?: any){
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
      pricetag,
      ribbon,
      shirtOutline,
      store,
      syncOutline,
      ticketOutline,
      timeOutline
    };
  },
});
</script>

<style scoped>

.product-header {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
}

.product-tags {
  justify-self: center;
}

.product-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
  align-items: start;
}

@media (min-width: 991px) {

  .product-detail {
    display: grid;
    grid: "image product"
          / 240px 1fr;
  }

  .product-image {
    grid-area: image;
    height: 362px;
    border: 1px solid var(--ion-color-medium);
    border-radius: 10px;
    margin-top: var(--spacer-xs);
  }

  .product-info {
    grid-area: product;
    margin-left: var(--spacer-lg);
  }
}
</style>
