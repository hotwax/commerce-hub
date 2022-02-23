<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon :icon="closeOutline" />
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t("Create user") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">{{ $t("Save") }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item lines="full">
        <ion-label position="fixed">{{ $t("First name") }}</ion-label>
        <ion-input type="text" required />
      </ion-item>
      <ion-item lines="full">
        <ion-label position="fixed">{{ $t("Last name") }}</ion-label>
        <ion-input type="text" required />
      </ion-item>
      <ion-item lines="full">
        <ion-label position="fixed">{{ $t("Email") }}</ion-label>
        <ion-input type="email" required />
      </ion-item>
      <ion-item lines="full">
        <ion-label position="fixed">{{ $t("Phone") }}</ion-label>
        <ion-input type="number" required />
      </ion-item>

      <ion-item lines="none">
        <ion-label>{{ $t("Role") }}</ion-label>
        <ion-select value="fulfillment">
          <ion-select-option value="fulfillment">Fulfillment</ion-select-option>
          <ion-select-option value="fulfillment-manager">Fulfillment manager</ion-select-option>
          <ion-select-option value="merchendiser">Merchendiser</ion-select-option>
          <ion-select-option value="administrator">Administrator</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>{{ $t("Activate") }}</ion-label>
        <ion-checkbox slot="end" />
      </ion-item>

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
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar 
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  businessOutline,
  closeOutline,
  storefrontOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "Create User",
  components: {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonHeader,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
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
