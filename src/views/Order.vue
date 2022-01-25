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
              <ion-label>Order id</ion-label>
              <ion-badge slot="end">Approved</ion-badge>
              <ion-icon slot="end" :icon="caretDown" />
            </ion-item>
          </div>

          <div class="timeline">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="timeOutline" class="mobile-only" />
              <ion-label>{{ $t("Timeline") }}</ion-label>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>

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
                  <ion-label>John Doe</ion-label>
                  <ion-chip slot="end">
                    <ion-icon :icon="ribbon" />
                    <ion-label>Loyalty Status</ion-label>
                  </ion-chip>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="mailOutline" slot="start" />
                  <ion-label>Email</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="callOutline" slot="start" />
                  <ion-label>Phone Number</ion-label>
                </ion-item>
                <ion-item lines="none">
                  <ion-icon :icon="cashOutline" slot="start" />
                  <ion-label>
                    Full Name
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
                <ion-list-header>{{ $t("Shopify IDs") }}</ion-list-header>
                <ion-item>
                  <ion-label> {{ $t("Order Number") }} </ion-label>
                  <p slot="end">14 Jan 2021</p>
                </ion-item>
                <ion-item>
                  <ion-label> {{ $t("Order ID") }} </ion-label>
                  <p slot="end">14 Jan 2021</p>
                </ion-item>
                <ion-item lines="none">
                  <ion-label> {{ $t("Order Name") }} </ion-label>
                  <p slot="end">14 Jan 2021</p>
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

          <div class="product-detail">
            <div class="product-image desktop-only">
              <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
              <ion-button color="secondary" fill="outline">
                {{ $t("Product inventory") }}
                <ion-icon :icon="openOutline" slot="end" />
              </ion-button>
            </div>

            <div class="product-info">
              <hr />

              <div class="product-header">
                <div>
                  <ion-item lines="none">
                    <ion-thumbnail slot="start" class="mobile-only">
                      <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                    </ion-thumbnail>
                    <ion-label>
                      <p>Brand</p>
                      Virtual Name
                      <p>{{ $t("Color") }} : color</p>
                      <p>{{ $t("Size") }}: size</p>
                    </ion-label>
                  </ion-item>
                </div>

                <div class="product-tags desktop-only">
                  <ion-chip>
                    <!-- TODO update shopify icon later -->
                    <ion-icon :icon="pricetag" />
                    <ion-label>Shopify ID</ion-label>
                  </ion-chip>
                </div>

                <div>
                  <ion-item lines="none" detail>
                    <ion-badge slot="end" color="success">Shipped</ion-badge>
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
                          Full Name
                          <p>Address line 1</p>
                          <p>Address line 1</p>
                          <p>Address line 1</p>
                          <p>Address line 1</p>
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
                          <ion-label>PO#</ion-label>
                        </ion-chip>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Estimated arrival") }} </ion-label>
                        <p slot="end">14 Jan 2021</p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Promise date") }} </ion-label>
                        <p slot="end">14 Jan 2021</p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Auto cancel") }} </ion-label>
                        <p slot="end">14 Jan 2021</p>
                      </ion-item>
                      <ion-buttons>
                        <ion-button color="primary" fill="clear">{{ $t("Edit dates") }}</ion-button>
                      </ion-buttons>
                    </ion-list>
                  </ion-card>
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
                      <ion-item>
                        <ion-label> {{ $t("Shipping method") }} </ion-label>
                        <p>Standard</p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Tracking number") }} </ion-label>
                        <p>Tracking number</p>
                      </ion-item>
                      <ion-item>
                        <ion-label> {{ $t("Location Inventory") }} </ion-label>
                        <p>0</p>
                      </ion-item>
                      <ion-buttons>
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
<script>
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

export default {
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
  setup() {
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
      syncOutline,
      ticketOutline,
      timeOutline
    };
  },
};
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
