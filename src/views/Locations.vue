<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Locations") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="mobile-only">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content
      <div class="find">
        <section class="search">
          <ion-searchbar :placeholder="$t('Search locations')" />
        </section>

        <aside class="filters">
          <ion-list>
            <ion-item lines="none">
              <ion-icon :icon="globeOutline" slot="start" />
              <ion-label>{{ $t("Shop") }}</ion-label>
              <ion-select value="p">
                <ion-select-option value="p">Product store</ion-select-option>
                <ion-select-option value="d">Department store</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="businessOutline" slot="start" />
              <ion-label>{{ $t("Type") }}</ion-label>
              <ion-select value="r">
                <ion-select-option value="r">Retail</ion-select-option>
                <ion-select-option value="w">Wholesale</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </aside>

        <main>
          <div class="list-item">
            <ion-item lines="none">
              <ion-icon :icon="storefrontOutline" slot="start" />
              <ion-label>
                <p class="overline">Retail</p>
                Store 1 name
              </ion-label>
            </ion-item>

            <ion-label class="tablet">
              shopify id
              <p>{{ $t("Shopify") }}</p>
            </ion-label>

            <ion-label class="tablet">
              netsuite id
              <p>{{ $t("Netsuite") }}</p>
            </ion-label>

            <ion-label class="tablet">
              175 Cherry Ln
              <p>Amherst MA, 01002</p>
            </ion-label>

            <ion-button fill="clear" color="medium" @click="openFacilityPopover">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>

          <hr />
        </main>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button><ion-icon :icon="storefrontOutline" /></ion-fab-button>
          <ion-fab-button><ion-icon :icon="businessOutline" /></ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonTitle,
  popoverController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  addOutline,
  businessOutline,
  ellipsisVerticalOutline,
  filterOutline,
  globeOutline,
  storefrontOutline,
} from 'ionicons/icons';
import FacilityPopover from '@/components/FacilityPopover.vue';

export default defineComponent({
  name: 'Locations',
  components: {
    IonBackButton,  
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonTitle,
  },
  methods: {
    async openFacilityPopover(ev: Event) {
      const popover = await popoverController.create({
        component: FacilityPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
  },
  setup() {
    return {
      addOutline,
      businessOutline,
      ellipsisVerticalOutline,
      filterOutline,
      globeOutline,
      storefrontOutline
    };
  },
});
</script>

<style scoped>
.list-item {
  --columns-desktop: 5;
}
</style>
