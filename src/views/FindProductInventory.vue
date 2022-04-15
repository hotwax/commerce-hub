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
            <ion-list-header><h3>{{ $t("Catalog") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Categories") }}</ion-label>
              <ion-select value="any" interface="popover">
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
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">all</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Color") }}</ion-label>
              <ion-select value="any" interface="popover">
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
            <ion-list-header><h3>{{ $t("Order") }}</h3></ion-list-header>
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
            <ion-list-header><h3>{{ $t("Location") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Product Store") }}</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">Australia</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>{{ $t("Facility") }}</ion-label>
              <ion-select value="any" interface="popover">
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
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">Partent</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none">
              <ion-icon slot="start" :icon="swapVerticalOutline" />
              <ion-label>{{ $t("Sort") }}</ion-label>
              <ion-select value="any" interface="popover">
                <ion-select-option value="any">{{ $t("Product name") }}</ion-select-option>
              </ion-select>
            </ion-item>
          </section>

          <hr />

          <div class="product" v-for="product in products" :key="product.productId" @click.prevent="viewProduct(product)">
            <div class="desktop-only">
              <Image :src="product.mainImageUrl" />
            </div>

            <div>
              <section class="section-header">
                <div class="primary-info">
                  <ion-item lines="none">
                    <ion-thumbnail slot="start" class="mobile-only">
                      <Image :src="product.mainImageUrl" />
                    </ion-thumbnail>
                    <ion-label>
                      <p>{{ product.brandName }}</p>
                      {{ product.productName }}
                      <p>{{ $t("Color") }}: {{ $filters.getFeaturesList(product.featureHierarchy, '1/COLOR/').join(", ") }}</p>
                      <p>{{ $t("Size") }}: {{ $filters.getFeaturesList(product.featureHierarchy, '1/SIZE/').join(", ") }}</p>
                    </ion-label>
                  </ion-item>
                </div>
                <div class="tags desktop-only">
                  <ion-chip>
                    <ion-icon :icon="pricetag" />
                    <ion-label>{{ product.internalName }}</ion-label>
                  </ion-chip>
                </div>
                <div class="metadata">
                  <ion-item lines="none" detail>
                    <ion-note slot="end">{{ product.variants?.length }} {{ $t("variants") }}</ion-note>
                  </ion-item>
                </div>
              </section>

              <div class="desktop-only">
                <ion-list>
                  <ion-list-header>
                    {{ $t("variants") }}
                    <hr />
                  </ion-list-header>
                  <div v-for="variant in product.variants" :key="variant.productId" class="list-item">
                    <div>
                      <ion-item lines="none">
                        <ion-label>
                          {{ variant.sku }}
                          <p>{{ $t("Color") }}: {{ $filters.getFeature(variant.featureHierarchy, '1/COLOR/') }}</p>
                          <p>{{ $t("Size") }}: {{ $filters.getFeature(variant.featureHierarchy, '1/SIZE/') }}</p>
                        </ion-label>
                      </ion-item>
                    </div>

                    <div>
                      <ion-chip>
                        <ion-icon :icon="pricetag" />
                        <ion-label>{{ variant.internalName }}</ion-label>
                      </ion-chip>
                    </div>

                    <!-- Commenting this code because we will be releasing this feature in next release. -->
                    <!-- <div>
                      <ion-item lines="none" detail>
                        <ion-note slot="end">{{ getProductStock(variant.productId) }}</ion-note>
                      </ion-item>
                    </div> -->
                  </div>
                  <hr />
                </ion-list>
              </div>
            </div>
          </div>
          <ion-infinite-scroll @ionInfinite="loadMoreProducts($event)" threshold="100px" :disabled="!isScrollable">
            <ion-infinite-scroll-content loading-spinner="crescent" :loading-text="$t('Loading')"/>
          </ion-infinite-scroll>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
import { defineComponent } from 'vue';
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
  computed: {
    ...mapGetters({
      products: "product/getProducts",
      getProduct: "product/getProduct",
      // Commenting this code because we will be releasing this feature in next release.
      // getProductStock: "stock/getProductStock",
      isScrollable: 'product/isScrollable'
    })
  },
  methods: {
    async getProducts(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;

      const payload = {
        "json": {
          "params": {
            "rows": viewSize,
            "start": viewIndex * viewSize,
            "group": true,
            "group.field": "groupId",
            "group.limit": 10000,
            "group.ngroups": true,
          } as any,
          "query": "*:*",
          "filter": "docType: PRODUCT"
        }
      }
      this.store.dispatch("product/getProducts", payload);
    },
    async loadMoreProducts(event: any){
      this.getProducts(
        undefined,
        Math.ceil(this.products.length / process.env.VUE_APP_VIEW_SIZE).toString()
      ).then(() => {
        event.target.complete();
      })
    },
    async viewProduct(product: any) {
      const virtual = this.getProduct(product.productId);

      product = {
        productId: product.productId,
        productName: product.productName,
        brand: virtual.brandName,
        externalId: virtual.internalName,
        mainImage: virtual.mainImageUrl,
        features: virtual.productFeatures,
        variants: product.variants
      }

      await this.store.dispatch('product/updateCurrent', product).then(() => {
        this.router.push(`/product-inventory/${product.productId}`)
      })
    }
  },
  mounted() {
    this.getProducts();
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      downloadOutline,
      filterOutline,
      folderOutline,
      sync,
      pricetag,
      swapVerticalOutline, 
      router,
      store
    };
  },
});
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
