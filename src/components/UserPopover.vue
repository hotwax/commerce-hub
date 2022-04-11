<template>
  <ion-content>
    <ion-list>
      <ion-list-header>username</ion-list-header>
      <ion-item button>{{ $t("Reset password") }}</ion-item>
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
  popoverController
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserPopover',
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