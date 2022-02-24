<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon :icon="closeOutline" slot="icon-only" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ $t("Locations") }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-list-header>{{ $t("Locations") }}</ion-list-header>
      <ion-item>
        <ion-icon :icon="storefrontOutline" slot="start" />
        <ion-label>
          <p class="overline">Retail</p>
          Store name
        </ion-label>
        <ion-checkbox slot="end" />
      </ion-item>
      <ion-item>
        <ion-icon :icon="businessOutline" slot="start" />
        <ion-label>
          <p class="overline">Warehouse</p>
          Warehouse name
        </ion-label>
        <ion-checkbox slot="end" />
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  businessOutline,
  closeOutline,
  storefrontOutline,
} from 'ionicons/icons';

export default defineComponent({
  name: 'LocationModal',
  components: {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
  },
  setup() {
    return {
      businessOutline,
      closeOutline,
      storefrontOutline,
    };
  },
});
</script>