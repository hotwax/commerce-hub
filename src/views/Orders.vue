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
            <ion-label>order id</ion-label>
            <ion-badge slot="end">Approved</ion-badge>
            <ion-icon slot="end" :icon="caretDown" />
          </ion-item>
        </div>
        <div class="order-timeline">
          <div class="timeline-header">
            <ion-item>
              <ion-label>{{ $t("Timeline") }}</ion-label>
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
                <ion-label>John Doe</ion-label>
                <ion-chip slot="end">
                  <ion-icon :icon="ribbon" />
                  <ion-label>Loyalty Status</ion-label>
                </ion-chip>
              </ion-item>
              <ion-item lines="full">
                <ion-icon :icon="mailOutline" slot="start" />
                <ion-label>{{ $t("Email") }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="callOutline" slot="start" />
                <ion-label>{{ $t("Phone Number") }}</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-icon :icon="cashOutline" slot="start" />
                <ion-label>
                  {{ $t("Full Name") }}
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
                <ion-label> {{ $t("Order Number") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Order ID") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Order Name") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
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
        <div class="product">
          <div class="desktop-only">
            <Image />
          <ion-button color="secondary" fill="outline">product inventory
              <ion-icon :icon="openOutline" />
            </ion-button>
          </div>
          <div class="mobileonly">
            <div class="product-detail">
              <div class="product-virtual">
                <ion-item lines="none">
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
                  <ion-badge slot="end" color="success">Shipped</ion-badge>
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
                        <ion-label>Full Name</ion-label>

                        <p>Address line 1</p>
                        <p>Address line 1</p>
                        <p>Address line 1</p>
                        <p>Address line 1</p>
                      </ion-label>
                    </ion-item>
                    <ion-buttons>
                      <ion-button color="primary" fill="clear">edit address</ion-button>
                    </ion-buttons>
                  </ion-list>
                </ion-card>
                <ion-card>
                  <ion-list>
                    <ion-list-header>{{ $t("Pre-order") }}</ion-list-header>
                    <ion-item>
                      <ion-label> {{ $t("Purchae Order") }} </ion-label>
                      <ion-chip slot="end">PO#</ion-chip>
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
                      <ion-button color="primary" fill="clear">Edit dates</ion-button>
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
                      <ion-label> {{ $t("Location inventory") }} </ion-label>
                      <p>0</p>
                    </ion-item>
                      <ion-buttons>
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
<script>
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
    async getOrders(vSize?: any, vIndex?: any){
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;
      const payload = {
        viewIndex: viewIndex,
        viewSize: viewSize,
        queryString: '* *',
        groupLimit: 10000,
        groupByField: 'orderId',
        filters: JSON.parse(process.env.VUE_APP_ORDER_FILTERS)
      }
      await this.store.dispatch("order/findOrders", payload)
    },
    async copyToClipboard(text: any) {
      await Clipboard.write({
        string: text
      }).then(() => {
        showToast(this.$t('Copied', { text }));
      })
    },
  },
  mounted() {
    this.getOrders();
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
      syncOutline,
      ticketOutline,
    };
  }
})
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