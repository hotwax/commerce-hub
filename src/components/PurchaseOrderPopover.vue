<template>
  <ion-content>
    <ion-list>
      <ion-list-header>PO ID</ion-list-header>
      <ion-item button @click="editQuantity()">{{ $t("Edit ordered quantity") }}</ion-item>
      <ion-item button lines="none"> {{ $t("Edit arrival date") }}</ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  popoverController,
  modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import EditQuantityModal from '@/components/EditQuantityModal.vue'


export default defineComponent({
  name: "PucrhaseOrderPopover",
  methods: {
    closePopover() {
      popoverController.dismiss({ dismissed: true });
    },
    async editQuantity() {
      const editmodal = await modalController.create({
        component: EditQuantityModal 
      });
      return editmodal.present();
    },
  },
  components: { 
    IonContent,
    IonItem,
    IonList,
    IonListHeader
  },
});
</script>