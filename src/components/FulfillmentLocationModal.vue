<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon :icon="closeOutline" slot="icon-only" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ $t("Change fulfillment location") }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-searchbar :placeholder="$t('Search facilities')" />  

    <ion-list>
      <ion-list-header>{{ $t("Locations") }}</ion-list-header>
      <ion-radio-group value="send">
        <ion-item>
          <ion-icon :icon="pulseOutline" slot="start" />
          <ion-label>{{ $t("Send to brokering queue") }}</ion-label>
          <ion-radio slot="end" value="send" />
        </ion-item>
        <ion-item>
          <ion-icon :icon="storefrontOutline" slot="start" />
          <ion-label>
          <p class="overline">Retail</p>
          Store name
          </ion-label>
          <ion-radio slot="end" value="retail" />
        </ion-item>
        <ion-item>
          <ion-icon :icon="businessOutline" slot="start" />
          <ion-label>
          <p class="overline">Warehouse</p>
          Warehouse name
          </ion-label>
          <ion-radio slot="end" value="warehouse" />
        </ion-item>
      </ion-radio-group>
    </ion-list>
  </ion-content>

  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
    <ion-icon :icon="sendOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  businessOutline,
  closeOutline,
  pulseOutline,
  sendOutline,
  storefrontOutline,
} from 'ionicons/icons';

export default defineComponent({
  name: 'FulfillmentLocationModal',
  components: {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
  },
  setup() {
    return {
      businessOutline,
      closeOutline,
      pulseOutline,
      sendOutline,
      storefrontOutline
    };
  },
});
</script>