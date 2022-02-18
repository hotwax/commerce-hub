<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Profile") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <div class="user">
          <ion-avatar>
            <Image />
          </ion-avatar>

          <ion-list>
            <ion-item>
              <ion-label position="fixed">{{ $t("First name") }}</ion-label>
              <ion-input clear-input></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="fixed">{{ $t("Last name") }}</ion-label>
              <ion-input clear-input></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label>{{ $t("Role") }}</ion-label>
              <ion-label slot="end">Admin</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <div class="settings">
          <ion-label>{{ $t("Settings") }}</ion-label>
          <ion-list>
            <ion-item>
              <ion-label position="fixed">{{ $t("Login") }}</ion-label>
              <ion-input :placeholder="$t('username')" clear-input></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="fixed">{{ $t("Password") }}</ion-label>
              <ion-input :placeholder="$t('password')" type="password" clear-input></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label>{{ $t("Time zone") }}</ion-label>
              <ion-select value="n">
                <ion-select-option value="n">New York</ion-select-option>
                <ion-select-option value="t">Texas</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
        <ion-button expand="block" color="medium" fill="outline">{{ $t("Logout") }}</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonAvatar,  
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonTitle
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Image from '@/components/Image.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    IonAvatar,  
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonTitle,
    Image
  },
});
</script>

<style scoped>
ion-content > div {
  max-width: 375px;
  margin: var(--spacer-base) auto 0;
}

.user,
.settings {
  display: flex;
}
</style>
