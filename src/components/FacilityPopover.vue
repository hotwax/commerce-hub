<template>
  <ion-content>
    <ion-list>
      <ion-list-header>facility name</ion-list-header>
      <ion-item button>{{ $t("Edit external IDs") }}</ion-item>
      <ion-item button>{{ $t("Edit address") }}</ion-item>
      <ion-item button>{{ $t("Change type") }}</ion-item>
      <ion-item button lines="none">{{ $t("Deactivate") }}</ion-item>
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
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FacilityPopover',
  methods: {
    closePopover() {
      popoverController.dismiss({ dismissed: true });
    }
  },
  components: {
    IonContent,
    IonItem,
    IonList,
    IonListHeader
  },
});
</script>