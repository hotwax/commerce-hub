<template>
  <ion-content>
    <ion-list>
        <ion-list-header>PO ID</ion-list-header>
      <ion-item button>{{ $t("Edit ordered quantity") }}</ion-item>
      <ion-item button lines="none"> {{ $t("Edit arrival date") }}</ion-item>
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
  name: "PucrhaseOrderPopover",
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