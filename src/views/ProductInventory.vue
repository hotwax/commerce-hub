<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/find-product-inventory" />
        <ion-title>{{ $t("Product inventory detail") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">
            <ion-icon :icon="syncOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <section class="product">
          <ion-card class="desktop-only">
            <Image :src="product.mainImage" />
          </ion-card>
        
          <div class="product-info desktop-only">
            <ion-label>{{ product.productName }}</ion-label>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("General information") }}</ion-card-title>
              </ion-card-header>
              <ion-item>
                <ion-label>{{ $t("Internal ID") }}</ion-label>
                <ion-label slot="end">{{ product.productId }}</ion-label>
              </ion-item>
              <!-- TODO: need to implement this functionality -->
              <ion-item>
                <ion-label>{{ $t("In stock") }}</ion-label>
                <ion-label slot="end">QOH</ion-label>
              </ion-item>
              <!-- TODO: need to implement this functionality -->
              <ion-item lines="none">
                <ion-label>{{ $t("On order") }}</ion-label>
                <ion-label slot="end">ordered</ion-label>
              </ion-item>
            </ion-card>
          </div>
        </section>

        <ion-item class="mobile-only" lines="none">
          <ion-thumbnail>
            <Image :src="product.mainImage" />
          </ion-thumbnail>
          <ion-label>
            {{ product.productName }}
            <p>{{ product.externalId }}</p>
          </ion-label>
          <ion-chip>
            <ion-label>Shopify logo</ion-label>
          </ion-chip>
        </ion-item>

        <hr />

        <section class="variant">
          <div class="variant-info">
            <ion-item class="desktop-only" lines="none">
              <ion-icon slot="start" :icon="shirtOutline" />
              <h1>{{ $t("Variant") }}</h1>
            </ion-item>
            <ion-list>
              <ion-list-header>{{ $t("Color") }}</ion-list-header>
              <ion-item lines="none">
                <ion-chip v-for="(feature, index) in $filters.getFeaturesList(product.features, '1/COLOR/')" :key="index" @click="updateCurrentSelectedFeatures(feature, 'color')">
                  <ion-icon v-if="currentSelectedFeatures.color === feature" :icon="checkmarkOutline" />
                  <ion-label>{{ feature }}</ion-label>
                </ion-chip>
              </ion-item>
            </ion-list>
            <ion-list>
              <ion-list-header>{{ $t("Size") }}</ion-list-header>
              <ion-item lines="none">
                <ion-chip v-for="(feature, index) in $filters.getFeaturesList(product.features, '1/SIZE/')" :key="index" @click="updateCurrentSelectedFeatures(feature, 'size')">
                  <ion-icon v-if="currentSelectedFeatures.size === feature" :icon="checkmarkOutline" />
                  <ion-label>{{ feature }}</ion-label>
                </ion-chip>
              </ion-item>
            </ion-list>
          </div>

          <div class="variant-id desktop-only">
            <ion-card v-for="(productStore, index) in productStores" :key="index">
              <ion-card-header>
                <ion-card-title>{{ productStore.storeName }}</ion-card-title>
              </ion-card-header>
              <ion-item>
                <ion-label>{{ productStore.description }}</ion-label>
                <ion-label slot="end">{{ productStore?.internalName }}</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-label>{{ $t("Internal ID") }}</ion-label>
                <ion-label slot="end">{{ productStore?.shopifyProductId }}</ion-label>
              </ion-item>
            </ion-card>
          </div>
        </section>

        <section>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="ticketOutline" />
            <h1>{{ $t("Orders") }}</h1>
          </ion-item>
          
          <div class="orders">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Shipping method") }}</ion-card-title>
              </ion-card-header>
              <ion-item detail>
                <ion-label>{{ $t("Store pickup") }}</ion-label>
                <ion-note slot="end">orders</ion-note>
              </ion-item>
              <ion-item detail>
                <ion-label>{{ $t("Standard") }}</ion-label>
                <ion-note slot="end">orders</ion-note>
              </ion-item>
              <ion-item lines="none" detail>
                <ion-label>{{ $t("Expedited") }}</ion-label>
                <ion-note slot="end">orders</ion-note>
              </ion-item>
            </ion-card>
          
            <ion-card>
              <ion-item>
                <ion-label>{{ $t("Open orders") }}</ion-label>
                <ion-label class="ion-text-center">
                  400
                  <p>{{ $t("Total") }}</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  400
                  <p>{{ $t("Without promise date") }}</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p>{{ $t("Pre orders") }}</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
              </ion-item>

              <ion-item lines="none">
                <ion-label>
                  <p>{{ $t("Back orders") }}</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p>{{ $t("Unfillable") }}</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
                <ion-label class="ion-text-center">
                  <p>400</p>
                </ion-label>
              </ion-item>
            </ion-card>
          </div>
        </section>

        <section class="segments">
          <ion-segment scrollable @ionChange="segmentChanged($event)" v-model="segment">
            <ion-segment-button value="locations" layout="icon-start">
              <ion-icon :icon="locationOutline" />
              <ion-label>{{ $t("Locations") }}</ion-label>
            </ion-segment-button>
            <ion-segment-button value="purchase-orders" layout="icon-start">
              <ion-icon :icon="calendarOutline" />
              <ion-label>{{ $t("Purchase orders") }}</ion-label>
            </ion-segment-button>
            <ion-segment-button value="fulfillment" layout="icon-start">
              <ion-icon :icon="sendOutline" />
              <ion-label>{{ $t("Fulfillment") }}</ion-label>
            </ion-segment-button>
            <ion-segment-button value="logs" layout="icon-start">
              <ion-icon :icon="listOutline" />
              <ion-label>{{ $t("Logs") }}</ion-label>
            </ion-segment-button>
          </ion-segment>

          <div v-if="segment == 'locations'">
            <ion-searchbar class="mobile-only" />

            <div class="actions">
              <div>
                <ion-chip>
                  <ion-icon :icon="checkmarkOutline" />
                  <ion-label>All</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Retail</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Warehouses</ion-label>
                </ion-chip>
              </div>
              <div class="desktop-only">
                <ion-button fill="outline" color="medium">{{
                  $t("Edit ordered stock")
                }}</ion-button>
                <ion-button fill="outline" color="medium">{{
                  $t("Edit qoh")
                }}</ion-button>
              </div>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="globeOutline" slot="start" />
                <ion-label>30 {{ $t("locations") }}</ion-label>
              </ion-item>

              <ion-label class="tablet">
                600
                <p>{{ $t("orders") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("purchase order ATP") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("QOH") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("ATP") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button
                fill="clear"
                color="medium"
                @click="openLocationPopover"
              >
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="storefrontOutline" slot="start" />
                <ion-label>
                  <p>Retail</p>
                  Store 1 name
                  <p>Pickup and shipping</p>
                </ion-label>
              </ion-item>

              <ion-label class="tablet">
                600
                <p>{{ $t("orders") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("purchase order ATP") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("QOH") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("ATP") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openLocationPopover">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="businessOutline" slot="start" />
                <ion-label>
                  <p>Warehouse</p>
                  Warehouse 1 name
                  <p>Shipping</p>
                </ion-label>
              </ion-item>

              <ion-label class="tablet">
                600
                <p>{{ $t("orders") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("purchase order ATP") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("QOH") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("ATP") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openLocationPopover">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />
          </div>

          <div v-if="segment == 'purchase-orders'">
            <div class="actions">
              <div>
                <ion-chip>
                  <ion-icon :icon="checkmarkOutline" />
                  <ion-label>All</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Upcoming</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Past date</ion-label>
                </ion-chip>
              </div>
              <div class="action-buttons desktop-only">
                <ion-button fill="outline" color="medium" @click="editQuantity()">{{ $t("Edit ordered qty") }}</ion-button>
                <ion-button fill="outline" color="medium">{{ $t("Edit arrival date") }}</ion-button>
              </div>
            </div>

            <hr />

            <div class="list-item purchase-orders">
              <ion-item lines="none">
                <ion-label>PO ID</ion-label>
              </ion-item>

              <ion-label class="tablet">
                600
                <p>{{ $t("ordered") }}</p>
              </ion-label>

              <ion-label class="tablet">
                400
                <p>{{ $t("ATP") }}</p>
              </ion-label>

              <ion-label>
                400
                <p>{{ $t("received") }}</p>
              </ion-label>

              <ion-label class="tablet">
                6th Dec 2021
                <p>{{ $t("arrival date") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openPopover">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />
          </div>

          <div v-if="segment == 'fulfillment'">
            <div class="actions">
              <div>
                <ion-chip>
                  <ion-icon :icon="checkmarkOutline" />
                  <ion-label>All</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Upcoming</ion-label>
                </ion-chip>
                <ion-chip>
                  <ion-label>Past date</ion-label>
                </ion-chip>
              </div>
              <div class="action-buttons desktop-only">
                <ion-button fill="outline" color="medium">{{ $t("Edit safety stock") }}</ion-button>
                <ion-button fill="outline" color="medium">{{ $t("Edit threshold") }}</ion-button>
              </div>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="globeOutline" slot="start" />
                <ion-label>2 {{ $t("locations") }}</ion-label>
              </ion-item>

              <ion-label>
                8
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label>
                19 / 20
                <p>{{ $t("threshold consumed") }}</p>
              </ion-label>

              <ion-chip class="tablet" outline>
                <ion-label>93 {{ $t("ATP") }}</ion-label>
                <ion-icon :icon="shareOutline" />
              </ion-chip>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("pickup") }}</p>
              </ion-label>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("delivery") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="storefrontOutline" slot="start" />
                <ion-label>
                  <p>Retail</p>
                  Brooklyn
                </ion-label>
              </ion-item>

              <ion-label>
                8
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label>
                19 / 20
                <p>{{ $t("threshold consumed") }}</p>
              </ion-label>

              <ion-chip class="tablet" outline>
                <ion-label>93 {{ $t("ATP") }}</ion-label>
                <ion-icon :icon="shareOutline" />
              </ion-chip>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("pickup") }}</p>
              </ion-label>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("delivery") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />

            <div class="list-item">
              <ion-item lines="none">
                <ion-icon :icon="businessOutline" slot="start" />
                <ion-label>
                  <p>Warehouse</p>
                  Hoboken
                </ion-label>
              </ion-item>

              <ion-label>
                8
                <p>{{ $t("safety stock") }}</p>
              </ion-label>

              <ion-label>
                19 / 20
                <p>{{ $t("threshold consumed") }}</p>
              </ion-label>

              <ion-chip class="tablet" outline>
                <ion-label>93 {{ $t("ATP") }}</ion-label>
                <ion-icon :icon="shareOutline" />
              </ion-chip>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("pickup") }}</p>
              </ion-label>

              <ion-label class="tablet">
                <ion-toggle />
                <p>{{ $t("delivery") }}</p>
              </ion-label>

              <ion-checkbox />

              <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>

            <hr />
          </div>

          <div v-if="segment == 'logs'"></div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
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
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonThumbnail,
  IonToggle,
  IonToolbar,
  modalController,
  popoverController
} from '@ionic/vue';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  businessOutline,
  calendarOutline,
  checkmarkOutline,
  ellipsisVerticalOutline,
  globeOutline,
  listOutline,
  locationOutline,
  shareOutline,
  shirtOutline,
  sendOutline,
  storefrontOutline,
  syncOutline,
  ticketOutline,
} from 'ionicons/icons';
import Image from '@/components/Image.vue';
import EditQuantityModal from '@/components/EditQuantityModal.vue';
import LocationPopover from '@/components/LocationPopover.vue';
import PurchaseOrderPopover from '@/components/PurchaseOrderPopover.vue';
import FulfillmentSettingsPopover from '@/components/FulfillmentSettingsPopover.vue';
import { useStore, mapGetters } from 'vuex';
import { ProductService } from "@/services/ProductService";
import { hasError } from '@/utils';

export default defineComponent({
  name: 'ProductInventory',
  components: {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
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
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonThumbnail,
    IonToggle,
    IonToolbar,
    Image
  },
  data() {
    return {
      productStores: []
    }
  },
  computed: {
    ...mapGetters({
      product: 'product/getCurrent'
    })
  },
  methods: {
    segmentChanged(ev: CustomEvent) {
      this.segment = ev.detail.value;
    },
    async editQuantity() {
      const editmodal = await modalController.create({
        component: EditQuantityModal
      });
      return editmodal.present();
    },
    async openLocationPopover(ev: Event) {
      const popover = await popoverController.create({
        component: LocationPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: PurchaseOrderPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async openFulfillmentSettings(ev: Event) {
      const popover = await popoverController.create({
        component: FulfillmentSettingsPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    filterProductFeatures(features: any, featureName: any) {
      let featuresList = []
      if (features) {
        featuresList = features.filter((featureItem: any) => featureItem.startsWith(featureName)).map((feature: any) => {
          const featureSplit = feature ? feature.split('/') : [];
          const featureValue = featureSplit[2] ? featureSplit[2] : '';
          return featureValue;
        })
      }
      return featuresList;
    },
    async updateCurrentSelectedFeatures(feature: any, featureName: any) {
      (this.currentSelectedFeatures as any)[featureName] = feature
      await this.getShopifyInformations(this.currentSelectedFeatures.color, this.currentSelectedFeatures.size);
    },
    async getShopifyProductStores(productStoreIds: any) {
      let resp;

      try{
        const payload = {
          "inputFields": {
            "productStoreId": productStoreIds,
            "productStoreId_op": 'in',
            "productIdentifierEnumId_op": 'not-empty'
          },
          "fieldList": ['productStoreId', 'productIdentifierEnumId', 'storeName'],
          "entityName": "ProductStore",
          "noConditionFind": "Y",
          "distinct": "Y"
        }
        resp = await ProductService.getShopifyProductStores(payload);
        if (resp.status === 200 && resp.data.docs?.length > 0 && !hasError(resp)) {
          return resp.data.docs;
        }
      } catch(error) {
        console.error(error);
      }
      return []
    },
    async getShopifyInformations(color: any, size: any) {
      if(this.product.variants) {
        const variant = this.product.variants.find((variant: any) => {
          const variantColor = this.filterProductFeatures(variant.productFeatures, 'Color')
          const variantSize = this.filterProductFeatures(variant.productFeatures, 'Size')

          if((variantColor.includes(color) && variantSize.includes(size))) return variant
        })

        await this.getShopifyProductStores(variant?.productStoreIds).then( async(shopifyProductStores: any) => {
          if(shopifyProductStores.length) {
            await this.store.dispatch('util/getShopifyEnumerations', shopifyProductStores).then((enums: any) => {
              this.productStores = shopifyProductStores.map((prdtStore: any) => {
                return {
                  ...prdtStore,
                  internalName: variant?.internalName,
                  description: enums[prdtStore.productIdentifierEnumId]?.description
                }
              })
            })
            console.log(variant?.productId)
            await this.store.dispatch('util/getShopifyConfigIds', { shopifyProductStores, productId: variant?.productId }).then((configs: any) => {
              this.productStores  = (this.productStores as any).map((prdtStore: any) => {
                return {
                  ...prdtStore,
                  ...configs[prdtStore.productStoreId]
                }
              })
            })
          }
        })

        return this.productStores;
      }
    }
  },
  mounted() {
    this.store.dispatch('product/updateCurrent', { productId: this.$route.params.id }).then(() => {
      this.updateCurrentSelectedFeatures(this.filterProductFeatures(this.product.feature, 'Color')[0], 'color')
      this.updateCurrentSelectedFeatures(this.filterProductFeatures(this.product.feature, 'Size')[0], 'size')
      this.getShopifyInformations(this.currentSelectedFeatures.color, this.currentSelectedFeatures.size);
    })
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const segment = ref("locations");
    const currentSelectedFeatures = reactive({
      color: '',
      size: ''
    })

    return {
      businessOutline,
      calendarOutline,
      checkmarkOutline,
      currentSelectedFeatures,
      ellipsisVerticalOutline,
      globeOutline,
      listOutline,
      locationOutline,
      shareOutline,
      shirtOutline,
      sendOutline,
      storefrontOutline,
      syncOutline,
      ticketOutline,
      router,
      segment,
      store
    }
  }
});
</script>

<style scoped>
section {
  margin-top: var(--spacer-lg)
}

.product {
  display: grid;
  grid-template-columns: minmax(254px, auto) 1fr;
  gap: var(--spacer-xl);
  justify-items: start;
  margin: 0 0 var(--spacer-base);
}

.product > ion-card {
  height: 360px;
  border-radius: 20px;
  padding: var(--spacer-base);
}

img {
  max-width: unset;
  height: 100%;
}

h1 {
  margin-left: var(--spacer-xs);
}

.product-info,
.variant-info,
.variant-id {
  width: 343px;
}

.variant,
.actions {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
}

.actions {
  margin: var(--spacer-xl) 0 var(--spacer-base);
}

/*Height of segment is defined now since their are less list items. Will remove it later */
.segments {
  height: 400px;
  margin-top: var(--spacer-2xl);
}

ion-segment {
  justify-content: start;
}

.purchase-orders {
  --columns-desktop: 7;
}

@media (min-width: 991px) {
  .orders {
    display: grid;
    grid-template-columns: 343px 570px;
  }
}
</style>