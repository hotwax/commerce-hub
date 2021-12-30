<template>
  <ion-content>
    <ion-list>
        <ion-list-header>Location Inventory</ion-list-header>
      <ion-item button>{{ $t("Edit quantity on hand") }}</ion-item>
      <ion-item button> {{ $t("Edit safety stock") }}</ion-item>
      <ion-item button lines="none"> {{ $t("Fulfillment options") }}</ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonItem,
  IonList,
  popoverController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LocationPopover",
  methods: {
    closePopover() {
      popoverController.dismiss({ dismissed: true });
    }
  },
  components: { 
    IonContent,
    IonItem,
    IonList,
  },
});
</script>