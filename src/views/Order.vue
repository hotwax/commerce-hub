<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"/>
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-label color="secondary" slot="end">
          <ion-button fill="clear">{{ $t("Download orders") }}</ion-button>
        </ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="order">
        <div class="search">
          <ion-searchbar/>
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
              <ion-checkbox/>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox/>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox/>
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
        <div class="order-detail">
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
            <ion-card>
              <ion-item>
                <ion-thumbnail slot="start">
                  <Image />
                </ion-thumbnail>
                <ion-label>
                  <p>Brand</p>
                  <h1>Virtual Name</h1>
                  <p>{{ $t("Color") }} : color</p>
                  <p>{{ $t("Size") }}: size</p>
                </ion-label>
                <ion-note slot="end" color="success">
                  {{ $t("In Stock", { count: 15 }) }}
                </ion-note>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Promise date") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("PO arrival date") }} </ion-label>
                <p slot="end">14 Jan 2021</p>
              </ion-item>
              <ion-item>
                <ion-label> {{ $t("Last brokered") }} </ion-label>
                <p slot="end">California Warehouse</p>
              </ion-item>
            </ion-card>
          </div>
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
import { pricetag, ribbon } from "ionicons/icons";
export default {
  name: "Order",
  components: {
    Image,
    IonSelectOption,
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
