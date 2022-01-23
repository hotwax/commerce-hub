<template>
  <ion-content>
    <ion-list>
      <ion-list-header>SKU</ion-list-header>
      <ion-item button>{{ $t("Edit ordered quantity") }}</ion-item>
      <ion-item button>{{ $t("Edit arrival date") }}</ion-item>
      <ion-item button lines="none">{{ $t("View orders") }}</ion-item>
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
  name: 'ProductPopover',
  components: {
    IonContent,
    IonItem,
    IonList,
    IonListHeader
  },
});
</script> 