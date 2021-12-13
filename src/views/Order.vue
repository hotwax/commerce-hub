<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"></ion-back-button>
        <ion-title>Orders</ion-title>
        <ion-label color="secondary" slot="end">
          <ion-button fill="clear">Download orders</ion-button>
        </ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar />
      <hr />
      <div class="order">
        <div class="order-header">
          <div class="order-id">
            <ion-item lines="none">
              <ion-label>
                <h1>Order ID</h1>
                <p>Customer Name</p>
              </ion-label>
            </ion-item>
          </div>
          <div class="order-tags">
            <ion-chip>
              <ion-icon :icon="pricetag" />
              <ion-label>Shopify ID</ion-label>
            </ion-chip>
            <ion-chip>
              <ion-icon :icon="pricetag" />
              <ion-label>Customer Loyalty Status</ion-label>
            </ion-chip>
          </div>

          <div class="order-metatags">
            <ion-note class="metatags">Ordered on 7 Jan 2021</ion-note>
            <div class="tags">
              <ion-badge color="primary" slot="end">Approved</ion-badge>
            </div>
          </div>
        </div>
        <div class="order-items">
          <ion-card v-for="index in 10" :key="index">
            <ion-item>
              <ion-thumbnail slot="start">
                <Image />
              </ion-thumbnail>
              <ion-label>
                <p>Brand {{ index }}</p>
                <h1>Virtual Name</h1>
                <p>Color: color</p>
                <p>Size: size</p>
              </ion-label>
              <ion-note slot="end" color="success">15 in Stock</ion-note>
            </ion-item>
            <ion-item>
              <ion-label> Promise date </ion-label>
              <p slot="end">14 Jan 2021</p>
            </ion-item>
            <ion-item>
              <ion-label> PO arrival date </ion-label>
              <p slot="end">14 Jan 2021</p>
            </ion-item>
            <ion-item>
              <ion-label> Last brokered </ion-label>
              <p slot="end">California Warehouse</p>
            </ion-item>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import Image from "../components/Image.vue";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonCard,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { pricetag, ribbon } from "ionicons/icons";
import { setup } from "axios-cache-adapter";
export default {
  name: "Order",
  components: {
    Image,
    IonBackButton,
    IonBadge,
    IonButton,
    IonCard,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonSearchbar,
    IonThumbnail,
    IonTitle,
    IonToolbar,
  },
  setup() {
    return {
      pricetag,
      ribbon,
    };
  },
};
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
}
.text {
  margin-right: 40px;
}
.order-metatags {
  grid-area: metadata;
  justify-self: end;
  margin-right: 10px;
}
.metatags {
  display: block;
}
.tags {
  display: flex;
  justify-content: flex-end;
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
}
</style>
