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
          <ion-button fill="clear" class="mobile-only">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="find">
        <section class="search">
          <ion-searchbar />
        </section>

        <aside class="filters desktop-only">
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
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none">
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
          </section>

          <hr />

          <div class="product" @click="() => router.push('/product-inventory')">
            <div class="product-image desktop-only">
              <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
            </div>

            <div>
              <section class="section-header">
                <div class="primary-info">
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
                <div class="tags desktop-only">
                  <ion-chip>
                    <ion-icon :icon="pricetag" />
                    <ion-label>Shopify ID</ion-label>
                  </ion-chip>
                </div>
                <div class="metadata">
                  <ion-item lines="none" detail>
                    <ion-note slot="end">3 variants</ion-note>
                  </ion-item>
                </div>
              </section>

              <div class="desktop-only">
                <ion-list>
                  <ion-list-header>
                    Variants
                    <hr />
                  </ion-list-header>
                  <div v-for="item in 2" :key="item" class="list-item">
                    <div>
                      <ion-item lines="none">
                        <ion-label>
                          SKU
                          <p>{{ $t("Color") }} : color</p>
                          <p>{{ $t("Size") }}: size</p>
                        </ion-label>
                      </ion-item>
                    </div>

                    <div>
                      <ion-chip>
                        <ion-icon :icon="pricetag" />
                        <ion-label>{{ $t("Shopify ID") }}</ion-label>
                      </ion-chip>
                    </div>

                    <div>
                      <ion-item lines="none" detail>
                        <ion-note slot="end">3 variants</ion-note>
                      </ion-item>
                    </div>
                  </div>
                  <hr />
                </ion-list>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import Image from '../components/Image.vue';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
  IonToolbar
} from '@ionic/vue';
import {
  downloadOutline,
  filterOutline,
  folderOutline,
  pricetag,
  sync,
  swapVerticalOutline  
} from 'ionicons/icons';

import { useRouter } from "vue-router";

export default {
  name: 'ProductInventory',
  components: {
    Image,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
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
    IonToolbar
  },
  setup() {
    const router = useRouter();

    return {
      downloadOutline,
      filterOutline,
      folderOutline,
      sync,
      pricetag,
      swapVerticalOutline, 
      router
    };
  },
};
</script>

<style scoped>
@media (min-width: 991px) {
  .product {
    display: grid;
    grid-template-columns: 115px 1fr;
  }

  .product-image {
    height: 180px;
  }

  .section-header {
    grid-template-columns: 1fr max-content 1fr;
  }

  .list-item {
    --columns-desktop: 3;
    grid-template-columns: 1fr max-content 1fr;
  }
}
</style>
