<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <!-- Profile of user logged in -->
      <ion-item>
        <ion-icon :icon="personCircleOutline" slot="start" />
        <ion-label>user-profile</ion-label>
        <ion-button slot="end" fill="outline" color="dark">{{ $t("Logout") }}</ion-button>
      </ion-item>

      <!-- Select store -->
      <ion-item>
        <ion-icon :icon="storefrontOutline" slot="start" />
        <ion-label>{{ $t("Store") }}</ion-label>
        <ion-button fill="clear" color="medium" @click="selectStore">
          <ion-icon slot="icon-only" :icon="ellipsisVertical" />
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader,IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, popoverController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { ellipsisVertical, personCircleOutline, storefrontOutline} from 'ionicons/icons'
import StorePopover from "@/views/Store-Popover.vue";

export default defineComponent({
  name: 'Settings',
  components: {
    IonButton, 
    IonContent, 
    IonHeader, 
    IonIcon,
    IonItem, 
    IonLabel, 
    IonPage, 
    IonTitle, 
    IonToolbar
  },
  methods: {
    async selectStore(ev: Event) {
      const popover = await popoverController
        .create({
          component: StorePopover,
          event: ev,
          showBackdrop: false,
          translucent: true
        })
      await popover.present();
    },
  },
  setup(){
    return {
    ellipsisVertical,
    personCircleOutline,
    storefrontOutline
    }
  }
});
</script>

