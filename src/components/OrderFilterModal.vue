<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon :icon="close" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ $t("Filters") }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-list-header>{{ $t("Date") }}</ion-list-header>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-list-header>{{ $t("Type") }}</ion-list-header>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-checkbox />
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-checkbox />
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-checkbox />
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>order created</ion-label>
        <ion-select value="any">
          <ion-select-option value="any">any</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>

    <ion-card>
      <ion-toolbar>
        <ion-title>{{ $t("Purchase orders") }}</ion-title>
      </ion-toolbar>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  modalController
} from '@ionic/vue';
import { close } from "ionicons/icons";

export default defineComponent({
  name: 'OrderFilterModal',
  components: {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonChip,
    IonCheckbox,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    }
  },
  setup() {
    return {
      close
    }
  }
})
</script>
