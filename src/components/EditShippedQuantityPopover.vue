<template>
  <ion-content>
    <ion-list>
      <ion-list-header>SKU</ion-list-header>
      <ion-item button>{{ $t("Edit shipped quantity") }}</ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader
} from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EditShippedQuantity',
  components: {
    IonContent,
    IonItem,
    IonList,
    IonListHeader
  },
});
</script> 