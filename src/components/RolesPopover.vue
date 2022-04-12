<template>
  <ion-select value="fulfillment" :interface-options="customPopoverOptions" interface="popover">
    <ion-select-option value="fulfillment">Fulfillment</ion-select-option>
    <ion-select-option value="fulfillment-manager">Fulfillment manager</ion-select-option>
    <ion-select-option value="merchendiser">Merchendiser</ion-select-option>
    <ion-select-option value="administrator">Administrator</ion-select-option>
  </ion-select>
</template>

<script lang="ts">
import {
  IonSelect,
  IonSelectOption,
  popoverController
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RolesPopover',
  methods: {
    closePopover() {
      popoverController.dismiss({ dismissed: true });
    }
  },
  components: {
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const customPopoverOptions: any = {
      header: "Role",
      showBackdrop: false,
    };
    return {
      customPopoverOptions,
    }
  },  
});
</script>