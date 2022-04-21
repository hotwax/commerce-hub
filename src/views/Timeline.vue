<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Timeline") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <TimelineDetail />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { informationCircleOutline, ticketOutline } from 'ionicons/icons'
import TimelineDetail from '@/components/TimelineDetail.vue'

export default defineComponent({
  name: 'Timeline',
  components: {
    IonBackButton,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    TimelineDetail
  },
  setup() {
    return {
      informationCircleOutline,
      ticketOutline
    }
  }
});
</script>