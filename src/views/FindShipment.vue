<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Shipments") }}</ion-title>
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
          <ion-searchbar :placeholder="$t('Search shipments and products')" />
        </section>

        <aside class="filters">
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

          <ion-list>
            <ion-list-header><h3>{{ $t("Date") }}</h3></ion-list-header>
            <ion-item>
              <ion-label>{{ $t("Arrival date") }}</ion-label>
              <ion-chip>
                <ion-icon :icon="calendarOutline" />
                <ion-input type="date" />
                <ion-icon :icon="closeCircle" />
              </ion-chip>
            </ion-item>
          </ion-list>
        </aside>

        <main>
          <section class="sort">
            <ion-item lines="none">
              <h2>{{ $t("Results") }}:</h2>
            </ion-item>

            <div>
              <ion-item lines="none">
                <ion-icon :icon="documentTextOutline" slot="start" />
                <ion-label class="ion-text-wrap">{{ $t("Show shipment items") }}</ion-label>
                <ion-toggle slot="end" checked></ion-toggle>
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

          <div class="product" @click="() => router.push('/shipment')">
            <section class="section-header">
              <div class="primary-info">
                <ion-item lines="none">
                  <ion-label class="ion-text-wrap">
                    <p>Product store</p>
                    Shipment external ID
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
                  <ion-note slot="end">2 {{ $t("items") }}</ion-note>
                </ion-item>
              </div>
            </section>

            <div class="desktop-only">
              <ion-list>
                <ion-list-header>
                  {{ $t("Items") }}
                  <hr />
                </ion-list-header>
                <div v-for="item in 2" :key="item" class="list-item">
                  <div>
                    <ion-item lines="none">
                      <ion-thumbnail slot="start">
                        <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                      </ion-thumbnail>
                      <ion-label class="ion-text-wrap">
                        SKU
                        <p>{{ $t("Color") }} : color</p>
                        <p>{{ $t("Size") }}: size</p>
                      </ion-label>
                    </ion-item>
                  </div>

                  <div>
                    <ion-chip outline>
                      <!-- TODO , Update icon -->
                      <ion-icon :icon="pricetag" />
                      <ion-label>External ID</ion-label>
                    </ion-chip>
                  </div>

                  <div class="items-metadata">
                    <ion-note>ATP</ion-note>
                    <ion-note>Ordered</ion-note>
                  </div>
                </div>
                <hr />
              </ion-list>
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
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
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
  pricetag,
  swapVerticalOutline,
  syncOutline
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default {
  name: 'FindShipment',
  components: {
    Image,
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
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
      pricetag,
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