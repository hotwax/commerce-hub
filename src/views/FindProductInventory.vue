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
          <ion-button fill="clear" class="mobile-only" @click="openProductFilterMenu()">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-menu content-id="content" type="overlay" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ $t('Filters') }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ProductFilters :categories="categories" :colors="colors" :sizes="sizes" :tags="tags" />
      </ion-content>
    </ion-menu>

    <ion-content id="content">
      <div class="find">
        <section class="search">
          <ion-searchbar v-model="queryString" @keyup.enter="getProducts()" />
        </section>

        <aside class="filters desktop-only">
          <ProductFilters :categories="categories" :colors="colors" :sizes="sizes" :tags="tags" />
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none" class="desktop-only">
              <ion-icon slot="start" :icon="folderOutline" />
              <ion-label>{{ $t("Show variants") }}</ion-label>
              <ion-toggle color="secondary" :checked="showVariants" @ionChange="() => showVariants = !showVariants"/>
            </ion-item>

            <ion-item lines="none">
              <ion-icon slot="start" :icon="swapVerticalOutline" />
              <ion-label>{{ $t("Sort") }}</ion-label>
              <ion-select :value="sort" interface="popover" @ionChange="updateProductSorting($event.detail.value)">
                <ion-select-option value="asc">{{ $t("A-Z") }}</ion-select-option>
                <ion-select-option value="desc">{{ $t("Z-A") }}</ion-select-option>
              </ion-select>
            </ion-item>
          </section>

          <hr />

          <div class="product" v-for="product in products" :key="product.productId" @click="() => router.push('/product-inventory')">
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

              <div class="desktop-only" v-if="showVariants">
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
  IonMenu,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  menuController
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
import ProductFilters from "@/components/ProductFilters.vue"
import { ProductService } from "@/services/ProductService";
import { hasError } from '@/utils';
import emitter from '@/event-bus';

export default defineComponent({
  name: 'ProductInventory',
  components: {
    Image,
    IonBackButton,
    IonButton,
    IonButtons,
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
    IonMenu,
    IonPage,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    IonToggle,
    ProductFilters
  },
  data() {
    return {
      queryString: '',
      categories: [{ categoryName: 'All', productCategoryId: 'All' }],
      colors: [{ productFeatureTypeId: 'All', productFeatureId: 'All', description: 'All' }],
      sizes: [{ productFeatureTypeId: 'All', productFeatureId: 'All', description: 'All' }],
      tags: [],
      showVariants: true,
      sort: 'asc'
    }
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

      await this.store.dispatch('product/updateQuery', { viewSize, viewIndex, queryString: this.queryString });
    },
    async loadMoreProducts(event: any){
      this.getProducts(
        undefined,
        Math.ceil(this.products.length / process.env.VUE_APP_VIEW_SIZE).toString()
      ).then(() => {
        event.target.complete();
      })
    },
    async getCategories() {
      const payload = {
        "inputFields": {
          "parentProductCategoryId": "NN_CATALOG_CAT"
        },
        viewSize: 50,
        "fieldList": ["categoryName", "productCategoryId"],
        "entityName": "ProductCategoryAndRollup",
        "distinct": "Y",
        "noConditionFind": "Y",
      }
      let resp;

      try{
        resp = await ProductService.getCategories(payload);
        if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
          this.categories = this.categories.concat(resp.data.docs);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getFeatures() {
      const payload = {
        "inputFields": {
          "productFeatureTypeId": ['COLOR', 'SIZE'],
          "productFeatureTypeId_op": 'in'
        },
        "viewSize": 50,
        "fieldList": ['productFeatureId', 'description', 'productFeatureTypeId'],
        "entityName": "ProductFeature",
        "distinct": "Y",
        "noConditionFind": "Y"
      }
      let resp;

      try {
        resp = await ProductService.getFeatures(payload);
        if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
          this.colors = this.colors.concat(resp.data.docs.filter((feature: any) => feature.productFeatureTypeId === 'COLOR'));
          this.sizes = this.sizes.concat(resp.data.docs.filter((feature: any) => feature.productFeatureTypeId === 'SIZE'));
        }
      } catch(error) {
        console.error(error);
      }
    },
    async getTags() {
      const payload = {
        "viewSize": 50,
        "fieldList": ["keyword", "keywordTypeId"],
        "entityName": "ProductKeyword",
        "distinct": "Y",
        "noConditionFind": "Y"
      }
      let resp;

      try {
        resp = await ProductService.getTags(payload);
        if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
          this.tags = resp.data.docs.map((tag: any) => tag.keyword)
        }
      } catch(error) {
        console.error(error);
      }
    },
    async openProductFilterMenu() {
      await menuController.open();
    },
    async updateProductSorting(value: string) {
      this.sort = value
      await this.store.dispatch('product/updateSortOption', this.sort)
      this.getProducts();
    }
  },
  mounted() {
    this.getProducts();
    this.getCategories();
    this.getFeatures();
    this.getTags();
    this.store.dispatch('util/fetchEcomStores')
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
