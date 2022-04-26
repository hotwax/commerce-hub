<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Purchase orders") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="syncOutline" slot="icon-only" />
          </ion-button>
          <ion-button>
            <ion-icon :icon="downloadOutline" slot="icon-only" />
          </ion-button>
          <ion-button fill="clear" class="mobile-only">
            <ion-icon :icon="filterOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="find">
        <section class="search">
          <ion-searchbar :placeholder="$t('Search purchase orders and products')" />
        </section>

        <aside class="filters">
          <PurchaseOrderFilters />
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none">
              <h2>{{ $t("Results") }}:</h2>
            </ion-item>

            <div>
              <ion-item lines="none" class="desktop-only">
                <ion-icon :icon="documentTextOutline" slot="start" />
                <ion-label class="ion-text-wrap">{{ $t("Show order items") }}</ion-label>
                <ion-toggle slot="end" :checked="showOrderItems" @ionChange="() => showOrderItems = !showOrderItems" />
              </ion-item>

              <ion-item lines="none">
                <ion-icon :icon="swapVerticalOutline" slot="start" />
                <ion-label class="ion-text-wrap">{{ $t("Sort by") }}</ion-label>
                <ion-select value="any" interface="popover">
                  <ion-select-option value="any">Arrival date</ion-select-option>
                </ion-select>
              </ion-item>
            </div>
          </section>

          <hr />

          <div v-for="order in purchaseOrders" :key="order.orderId" class="product" @click="() => router.push('/purchase-order')">
            <section class="section-header">
              <div class="primary-info">
                <ion-item lines="none">
                  <ion-label class="ion-text-wrap">
                    <!-- TODO: display product store name on the place of id -->
                    <p>{{ order.productStoreId }}</p>
                    {{ order.orderName }}
                    <p>{{ $filters.formatUtcDate(order.orderDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') }}</p>
                  </ion-label>
                </ion-item>
              </div>

              <div class="tags desktop-only">
                <ion-chip outline>
                  <ion-icon :icon="calendarOutline" />
                  <ion-label>{{ $filters.formatUtcDate(order.arrivalDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') }}</ion-label>
                </ion-chip>
              </div>

              <div class="metadata">
                <ion-item lines="none" detail>
                  <ion-note slot="end">{{ order.items.length }} {{ $t("variants") }}</ion-note>
                </ion-item>
              </div>
            </section>

            <div class="desktop-only" v-if="showOrderItems">
              <ion-list>
                <ion-list-header>
                  {{ $t("Items") }}
                  <hr />
                </ion-list-header>
                <div v-for="(item, index) in order.items" :key="index" class="list-item">
                  <div>
                    <ion-item lines="none">
                      <ion-thumbnail slot="start">
                        <Image :src="getProduct(item.productId).mainImageUrl" />
                      </ion-thumbnail>
                      <ion-label class="ion-text-wrap">
                        {{ getProduct(item.productId).sku }}
                        <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/')">{{ $t("Color") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }}</p>
                        <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/')">{{ $t("Size") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }}</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div @click.stop="copyToClipboard(getProduct(item.productId).internalName)">
                    <ion-chip outline>
                      <!-- TODO, Update icon -->
                      
                      <ion-icon :icon="pricetag" />
                      <ion-label>{{ getProduct(item.productId).internalName }}</ion-label>
                    </ion-chip>
                  </div>

                  <div class="items-metadata">
                    <ion-note>{{ item.availableToPromise }} {{ 'ATP' }}</ion-note>
                    <ion-note>{{ item.quantity }} {{ 'ordered' }}</ion-note>
                  </div>
                </div>
              </ion-list>
            </div>
            <hr />
          </div>
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import Image from '@/components/Image.vue';
import {
  IonBackButton,
  IonButton,
  IonButtons,
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
  IonToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import {
  calendarOutline,
  close,
  documentTextOutline,
  downloadOutline,
  filterOutline,
  folderOutline,
  pricetag,
  swapVerticalOutline,
  syncOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { mapGetters, useStore } from 'vuex';
import { showToast } from '@/utils';
import { Plugins } from '@capacitor/core';
import PurchaseOrderFilters from '@/components/PurchaseOrderFilters.vue'

const { Clipboard } = Plugins;

export default {
  name: 'PurchaseOrder',
  components: {
    Image,
    IonBackButton,
    IonButton,
    IonButtons,
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
    IonToggle,
    IonTitle,
    IonToolbar,
    PurchaseOrderFilters
  },
  data() {
    return {
      showOrderItems: true,
      purchaseOrders: {}
    }
  },
  computed: {
    ...mapGetters({
      getProduct: 'product/getProduct',
    })
  },
  async mounted() {
    this.purchaseOrders = await this.store.dispatch('order/findPurchaseOrders')
  },
  methods: {
    async copyToClipboard(text) {
      await Clipboard.write({
        string: text
      }).then(() => {
        showToast(this.$t('Copied', { text }));
      })
    },
    async updateQueryString() {
      await this.store.dispatch('order/updateAppliedPoFilters', { value: this.queryString, filterName: 'queryString' })
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      calendarOutline,
      close,
      documentTextOutline,
      downloadOutline,
      filterOutline,
      folderOutline,
      pricetag,
      store,
      swapVerticalOutline,
      syncOutline,
      router
    };
  },
};
</script>

<style scoped>
.items-metadata {
  text-align: end;
}

.items-metadata > ion-note {
  display: block;
}

@media (min-width: 991px) {
  .list-item {
    --columns-desktop: 3;
    grid-template-columns: 1fr max-content 1fr;
  }
}
</style>
