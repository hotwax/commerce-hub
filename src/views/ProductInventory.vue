<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Product inventory") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="sync" slot="icon-only" />
          </ion-button>
          <ion-button>
            <ion-icon :icon="downloadOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="product-find">
        <div class="product-search">
          <ion-searchbar />
        </div>
        <div class="desktop-only">
          <ion-list>
            <ion-list-header>{{ $t("Catalog") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Categories") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">all</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
              </ion-card-content>
            </ion-card>
            <ion-item>
              <ion-label>{{ $t("Size") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">all</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Color") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">all</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
              </ion-card-content>
            </ion-card>
          </ion-list>

          <ion-list>
            <ion-list-header>{{ $t("Order") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("order created") }}</ion-label>
              <ion-checkbox />
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("order created") }}</ion-label>
              <ion-checkbox />
            </ion-item>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>PO #</ion-label>
                </ion-chip>
              </ion-card-content>
            </ion-card>
          </ion-list>
          <ion-list>
            <ion-list-header>{{ $t("Location") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Product Store") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">Australia</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Facility") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">California Warehouse</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
        <div class="product-sort">
          <ion-item lines="none" class="border-sort">
            <ion-icon slot="start" :icon="folderOutline" />
            <ion-label>{{ "Group by" }}</ion-label>
            <ion-select value="any">
              <ion-select-option value="any">Partent</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="swapVerticalOutline" />
            <ion-label>{{ $t("Sort") }}</ion-label>
            <ion-select value="any">
              <ion-select-option value="any">{{ $t("Product name") }}</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
        <div class="products">
          <div class="product">
            <div class="product-image">
              <Image />
            </div>
            <div class="mobileonly">
              <div class="product-detail">
                <div class="product-virtual">
                  <ion-item>
                    <ion-thumbnail slot="start" class="mobileonly-image">
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
              <div class="desktop-only">
                <ion-list>
                  <ion-list-header>Variants</ion-list-header>

                  <div class="product-detail">
                    <div class="product-virtual">
                      <ion-item lines="none">
                        <ion-label>
                          SKU
                          <p>{{ $t("Color") }} : color</p>
                          <p>{{ $t("Size") }}: size</p>
                        </ion-label>
                      </ion-item>
                    </div>
                    <div class="product-tags">
                      <ion-chip>
                        <ion-icon />
                        <ion-label>{{ $t("Shopify ID") }}</ion-label>
                      </ion-chip>
                    </div>
                    <div class="product-metadata">
                      <ion-item lines="none" detail>
                        <ion-note slot="end" class="metatags">3 variants</ion-note>
                      </ion-item>
                    </div>
                  </div>
                </ion-list>
              </div>
            </div>
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
} from "@ionic/vue";
import {
  folderOutline,
  swapVerticalOutline,
  downloadOutline,
  sync,
} from "ionicons/icons";

export default {
  name: "ProductInventory",
  components: {
    Image,
    IonBackButton,
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
  setup () {
    return {
      downloadOutline,
      folderOutline,
      swapVerticalOutline,
      sync
    };
  },
};
</script>
<style scoped>
.product-detail {
  display: grid;
  grid: "virtual tags metadata" / max-content 1fr max-content;
  grid-area: detail;
  border-bottom: 1px solid #92949c;
}

.product-search {
  grid-area: search;
}
.product-filter {
  grid-area: filter;
  display: none;
}
.product-sort {
  grid-area: sort;
}
.products {
  grid-area: products;
}
.product {
  display: grid;
  grid: "detail";
  grid-area: product;
}
.product-image {
  grid-area: image;
  display: none;
}
.product-virtual {
  grid-area: virtual;
}
.product-tags {
  grid-area: tags;
  display: none;
  align-self: center;
  justify-content: center;
}
.product-metadata {
  grid-area: metadata;
  justify-content: center;
}
.desktop-only {
  display: none;
}

@media (min-width: 900px) {
  .product-find {
    display: grid;
    grid:
      "search sort"
      "filter products"/ 345px auto;
  }
  .product {
    grid:
      "image detail"
      / 115px auto;
  }
  .desktop-only {
    display: unset;
  }
  .product-tags {
    display: unset;
    display: flex;
  }
  .product-image {
    display: unset;
    height: 180px;
  }
  .mobileonly-image {
    display: none;
  }

  .product-sort {
    display: flex;
    justify-content: flex-end;
  }
  ion-select {
    max-width: 100%;
  }
  .border-sort {
    border-right: 0.5px solid #92949c;
    border-left: 0.5px solid #92949c;
    height: 48px;
  }
}
</style>