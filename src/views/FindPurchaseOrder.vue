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

          <ion-list>
            <ion-list-header>{{ $t("Date") }}</ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Arrival date") }}</ion-label>
              <ion-chip>
                <ion-icon :icon="calendarOutline" />
                <ion-datetime value="12/01/2021" />
                <ion-icon :icon="closeCircle" />
              </ion-chip>
            </ion-item>
          </ion-list>
        </aside>

        <main class="main" @click="() => router.push('/purchase-order')">
          <section class="sort">
            <ion-item lines="none">
              <ion-icon :icon="documentTextOutline"  slot="start" />
              <ion-label>{{ $t("Show order items") }}</ion-label>
              <ion-toggle slot="end" checked></ion-toggle>
            </ion-item>

            <ion-item lines="none">
              <ion-icon :icon="swapVerticalOutline" slot="start" />
              <ion-label>{{ $t("Sort by") }}</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">Arrival date</ion-select-option>
              </ion-select>
            </ion-item>
          </section>

          <hr />

          <div class="product">
            <div class="product-detail">
              <section class="section-header">
                <div class="primary-info">
                  <ion-item lines="none">
                    <ion-label>
                      <p>Product store</p>
                      PO external ID
                      <p>Created date</p>
                    </ion-label>
                  </ion-item>
                </div>

                <div class="tags desktop-only">
                  <ion-chip outline>
                    <ion-icon :icon="calendarOutline" />
                    <ion-label>Arrival date</ion-label>
                  </ion-chip>
                </div>

                <div class="metadata">
                  <ion-item lines="none" detail>
                    <ion-note slot="end" class="metatags">2 {{ $t("variants") }}</ion-note>
                  </ion-item>
                </div>
              </section>

              <div class="desktop-only">
                <ion-list>
                  <ion-list-header>
                    {{ $t("Items") }}
                    <hr align="right" width="90%" />
                  </ion-list-header>
                  <div class="list-item">
                    <div>
                      <ion-item lines="none">
                        <ion-thumbnail slot="start">
                          <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                        </ion-thumbnail>
                        <ion-label>
                          SKU
                          <p>{{ $t("Color") }} : color</p>
                          <p>{{ $t("Size") }}: size</p>
                        </ion-label>
                      </ion-item>
                    </div>

                    <div class="variant-tags">
                      <ion-chip outline>
                        <!-- TODO -->
                        <ion-icon />
                        <ion-label>Shopify ID</ion-label>
                      </ion-chip>
                    </div>

                    <div>
                      <ion-item lines="none">
                        <ion-note slot="end" class="metatags">ATP Ordered</ion-note>
                      </ion-item>
                    </div>
                  </div>
                  <hr align="right" width="90%" />
                  <div class="list-item">
                    <div class="variant-info">
                      <ion-item lines="none">
                        <ion-thumbnail slot="start">
                          <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                        </ion-thumbnail>
                        <ion-label>
                          SKU
                          <p>{{ $t("Color") }} : color</p>
                          <p>{{ $t("Size") }}: size</p>
                        </ion-label>
                      </ion-item>
                    </div>

                    <div class="variant-tags">
                      <ion-chip outline>
                        <!-- TODO -->
                        <ion-icon />
                        <ion-label>Shopify ID</ion-label>
                      </ion-chip>
                    </div>

                    <div class="variant-metadata">
                      <ion-item lines="none">
                        <ion-note slot="end" class="metatags">ATP Ordered</ion-note>
                      </ion-item>
                    </div>
                  </div>
                  <hr />
                </ion-list>
              </div>
            </div>
          </div>

          <section class="section-grid"></section>
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
  IonChip,
  IonContent,
  IonDatetime,
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
  closeCircle,
  documentTextOutline,
  downloadOutline,
  filterOutline,
  folderOutline,
  swapVerticalOutline,
  syncOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default {
  name: 'PurchaseOrder',
  components: {
    Image,
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonDatetime,
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
    IonToolbar
  },
  setup() {
    const router = useRouter();

    return {
      calendarOutline,
      closeCircle,
      documentTextOutline,
      downloadOutline,
      filterOutline,
      folderOutline,
      swapVerticalOutline,
      syncOutline,
      router
    };
  },
};
</script>

<style scoped>

@media (min-width: 991px) {
  .list-item {
    --columns-desktop: 3;
    grid-template-columns: 1fr max-content 1fr;
  }

  .variant-tags {
    justify-self: center;
  }

  .section-header {
    grid-template-columns: 1fr max-content 1fr;
  }
}
</style>
