<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>User name</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <ion-item>
          <ion-icon :icon="personCircleOutline" slot="start" />
          <ion-label>
            Full name
            <p>User name</p>
          </ion-label>
          <ion-note slot="end">Created date</ion-note>
        </ion-item>

        <ion-item lines="none">
          <ion-icon :icon="idCardOutline" slot="start" />
          <ion-label>{{ $t("Role") }}</ion-label>
          <RolesPopover />
        </ion-item>

        <ion-list>
          <ion-list-header>{{ $t("Contact information") }}</ion-list-header>
          <ion-item>
            <ion-icon :icon="callOutline" slot="start" />
            <ion-label>123-456-7890</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon :icon="mailOutline" slot="start" />
            <ion-label>xyz@hotwax.co</ion-label>
          </ion-item>
        </ion-list>

        <ion-item>
          <ion-label>{{ $t("Deactivate user") }}</ion-label>
          <ion-toggle color="secondary" slot="end" />
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
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonHeader,
  IonTitle,
  IonToggle,
  IonToolbar  
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  businessOutline,
  callOutline,
  idCardOutline,
  mailOutline,
  personCircleOutline,
  storefrontOutline,
} from 'ionicons/icons';
import RolesPopover from '@/components/RolesPopover.vue';

export default defineComponent({
  name: 'User',
  components: {
    IonBackButton,
    IonCheckbox,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonPage,
    IonHeader,
    IonTitle,
    IonToggle,
    IonToolbar,
    RolesPopover
  },
  setup() {
    return {
      businessOutline,
      callOutline,
      idCardOutline,
      mailOutline,
      personCircleOutline,
      storefrontOutline,
    };
  },
});
</script>

<style scoped>
main {
  max-width: 500px;
  margin: var(--spacer-base) auto 0; 
}
</style>
