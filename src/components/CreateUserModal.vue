<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="closeModal">
            <ion-icon :icon="closeOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t("Create user") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">{{ $t("Save") }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="fixed">{{ $t("First name") }}</ion-label>
        <ion-input type="text" />
      </ion-item>
      <ion-item>
        <ion-label position="fixed">{{ $t("Last name") }}</ion-label>
        <ion-input type="text" />
      </ion-item>
      <ion-item>
        <ion-label position="fixed">{{ $t("Email") }}</ion-label>
        <ion-input type="email" />
      </ion-item>
      <ion-item>
        <ion-label position="fixed">{{ $t("Phone") }}</ion-label>
        <ion-input />
      </ion-item>

      <ion-item>
        <ion-label>{{ $t("Role") }}</ion-label>
        <RolesPopover />
      </ion-item>

      <ion-item>
        <ion-label>{{ $t("Activate") }}</ion-label>
        <ion-checkbox slot="end" />
      </ion-item>

      <ion-list>
        <ion-list-header>{{ $t("Locations") }}</ion-list-header>
        <ion-item>
          <ion-icon :icon="storefrontOutline" slot="start" />
          <ion-label>
            <p class="overline">Retail</p>
            Store name
          </ion-label>
          <ion-checkbox slot="end" />
        </ion-item>
        <ion-item>
          <ion-icon :icon="businessOutline" slot="start" />
          <ion-label>
            <p class="overline">Warehouse</p>
            Warehouse name
          </ion-label>
          <ion-checkbox slot="end" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  businessOutline,
  closeOutline,
  storefrontOutline,
} from 'ionicons/icons';
import RolesPopover from '@/components/RolesPopover.vue';

export default defineComponent({
  name: 'CreateUser',
  components: {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    RolesPopover
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
  },
  setup() {
    const customPopoverOptions: any = {
      header: "Role",
    };

    return {
      businessOutline,
      closeOutline,
      storefrontOutline,
      customPopoverOptions,
    };
  },
});
</script>