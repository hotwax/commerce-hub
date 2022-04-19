<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Timeline") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="item in 5" :key="item">
        <ion-icon :icon="ticketOutline" slot="start" />
        <ion-label>
          <p>+10 minutes</p>
          Imported from Shopify
        </ion-label>
        <ion-icon slot="end" :icon="informationCircleOutline" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { informationCircleOutline, ticketOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'Timeline',
  components: {
    IonBackButton,
    IonContent,
    IonHeader,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonToolbar,
    IonTitle,
  },
  setup() {
    return {
      informationCircleOutline,
      ticketOutline
    }
  }
});
</script>