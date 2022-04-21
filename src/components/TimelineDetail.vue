<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonList
} from '@ionic/vue'
import { informationCircleOutline, ticketOutline } from 'ionicons/icons'

export default defineComponent({
  name: "TimelineDetail",
  components: {
    IonItem,
    IonIcon,
    IonLabel,
    IonList
  },
  
  setup() {
    return {
      informationCircleOutline,
      ticketOutline
    }
  },
})
</script>