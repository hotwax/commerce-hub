<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>Order detail</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="order-detail">
        <div class="order-ID">
          <ion-item lines="none">
            <ion-icon slot="start" :icon="ticketOutline" />
            <ion-label>order id</ion-label>
            <ion-badge slot="end">Approved</ion-badge>
            <ion-icon slot="end" :icon="caretDown" />
          </ion-item>
        </div>
        <div class="order-timeline">
          <div class="timeline-header">
            <ion-item>
              <ion-label>Timeline</ion-label>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>
          </div>
          <div class="desktop-only">
            <ion-list>
              <ion-item v-for="item in 7" :key="item">
                <ion-icon :icon="ticketOutline" slot="start" />
                <ion-label>
                  <p>+10 minutes</p>
                  Imported from Shopify</ion-label
                >
                <ion-icon slot="end" :icon="informationCircleOutline" />
              </ion-item>
            </ion-list>
          </div>
        </div>
        <div class="order-card">
          <ion-card>
            <ion-list>
              <ion-item lines="none">
                <ion-label>John Doe</ion-label>
                <ion-chip slot="end">
                  <ion-icon slot="start" :icon="ribbon" />
                  <ion-label>Loyalty Status</ion-label>
                </ion-chip>
              </ion-item>
              <ion-item>
                <ion-icon :icon="callOutline" slot="start" />
                <ion-label>{{ $t("Phone Number") }}</ion-label>
              </ion-item>
              <ion-item lines="full">
                <ion-icon :icon="mailOutline" slot="start" />
                <ion-label>{{ $t("Email") }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-thumbnail slot="start" class="mobile-only">
                  <Image />
                </ion-thumbnail>
                <ion-label>
                  <ion-label>Full Name</ion-label>
                  Virtual Name
                  <p>Address line 1</p>
                  <p>Address line 1</p>
                  <p>Address line 1</p>
                  <p>Address line 1</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card>
          <ion-card>
            <ion-list>
              <ion-list-header>Shopify IDs</ion-list-header>
              <ion-item>
                <ion-label> {{ $t("PO arrival date") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("PO arrival date") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("PO arrival date") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
            </ion-list>
          </ion-card>
        </div>
      </div>
      <div class="products">
        <ion-item>
          <ion-icon slot="start" />
          <ion-label>Products</ion-label>
        </ion-item>
        <div class="product">
          <div class="desktop-only">
            <Image />
          </div>
          <div class="mobileonly">
            <div class="product-detail">
              <div class="product-virtual">
                <ion-item>
                  <ion-thumbnail slot="start" class="mobile-only">
                    <Image />
                  </ion-thumbnail>
                  <ion-label>
                    <p>Brand</p>
                    Virtual Name
                    <p>{{ $t("Color") }} : color</p>
                    <p>{{ $t("Size") }}: size</p>
                  </ion-label>
                </ion-item>
              </div>
              <div class="product-tags">
                <ion-chip>
                  <ion-icon />
                  <ion-label>Shopify ID</ion-label>
                </ion-chip>
              </div>
              <div class="product-metadata">
                <ion-item lines="none" detail>
                  <ion-note slot="end" class="metatags">3 variants</ion-note>
                </ion-item>
              </div>
            </div>
            <div></div>
            <div class="desktop-only">
              <div class="order-card">
                <ion-card>
                  <ion-list>
                    <ion-item lines="none">
                      <ion-label>John Doe</ion-label>
                      <ion-chip slot="end">Loyalty Status</ion-chip>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="callOutline" slot="start" />
                      <ion-label>{{ $t("Phone Number") }}</ion-label>
                    </ion-item>
                    <ion-item lines="full">
                      <ion-icon :icon="mailOutline" slot="start" />
                      <ion-label>{{ $t("Email") }}</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-thumbnail slot="start" class="mobile-only">
                        <Image />
                      </ion-thumbnail>
                      <ion-label>
                        <ion-label>Full Name</ion-label>
                        Virtual Name
                        <p>Address line 1</p>
                        <p>Address line 1</p>
                        <p>Address line 1</p>
                        <p>Address line 1</p>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                </ion-card>
                <ion-card>
                  <ion-list>
                    <ion-list-header>Shopify IDs</ion-list-header>
                    <ion-item>
                      <ion-label> {{ $t("PO arrival date") }} </ion-label>
                      <p slot="end">14 Jan 2021</p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("PO arrival date") }} </ion-label>
                      <p slot="end">14 Jan 2021</p>
                    </ion-item>
                    <ion-item>
                      <ion-label> {{ $t("PO arrival date") }} </ion-label>
                      <p slot="end">14 Jan 2021</p>
                    </ion-item>
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
<script>
import Image from "@/components/Image.vue";
import {
  informationCircleOutline,
  caretDown,
  ticketOutline,
  mailOutline,
  callOutline,
  cashOutline,
  ribbon,
} from "ionicons/icons";
import {
  IonBackButton,
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

export default {
  components: {
    Image,
    IonBackButton,
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
  name: "OrderFind",
  setup() {
    return {
      informationCircleOutline,
      caretDown,
      ticketOutline,
      mailOutline,
      callOutline,
      cashOutline,
      ribbon,
    };
  },
};
</script>
<style scoped>
.order-find {
}
.order-detail {
}
.order-ID {
  grid-area: ID;
}
.order-timeline {
  grid-area: timeline;
  border-left: 0.5px solid #92949c;
  /* height: 485px; */
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
}
.product-tags {
  display: none;
}
.product {
  grid-area: product;
}
.desktop-only {
  display: none;
}

#desktop-card {
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
  }

  .desktop-only {
    grid-area: image;
    height: 362px;
  }
  .mobileonly {
    grid-area: mobileonly;
    /* border: 2px solid black; */
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