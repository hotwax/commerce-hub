<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Profile") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <div>
          <ion-item lines="none">
            <ion-avatar>
              <Image />
            </ion-avatar>
          </ion-item>

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
        </div>

        <div>
          <ion-item lines="none">
            <ion-label>{{ $t("Settings") }}</ion-label>
          </ion-item>

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
        </div>

        <ion-button expand="block" color="medium" fill="outline" @click="logout()">{{ $t("Logout") }}</ion-button>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
import Image from '@/components/Image.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Profile',
  components: {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonTitle,
    Image,
  },
  methods: {
    logout () {
      this.store.dispatch('user/logout').then(() => {
        this.router.push('/login');
      })
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      router,
      store
    }
  }
});
</script>

<style scoped>
main {
  max-width: 375px;
  margin: 0 auto 0;
}

main > div,
ion-button {
  margin-top: var(--spacer-xl);
}
</style>
