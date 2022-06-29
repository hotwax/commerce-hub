<template>
  <ion-select value= "WAREHOUSE_PICKER" :interface-options="customPopoverOptions" interface="popover">
    <ion-select-option value="WAREHOUSE_CLERK">Warehouse Clerk</ion-select-option>
    <ion-select-option value="WAREHOUSE_MANAGER">Warehouse Manager</ion-select-option>
    <ion-select-option value="WAREHOUSE_PACKER">Warehouse Packer</ion-select-option>
    <ion-select-option value="WAREHOUSE_PICKER">Warehouse Picker</ion-select-option>
    <ion-select-option value="WAREHOUSE_RECEIVER">Warehouse Receiver</ion-select-option>
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