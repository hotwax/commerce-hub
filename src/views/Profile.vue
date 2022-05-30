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
            <ion-icon :icon="timeOutline" slot="start"/>
            <ion-label> {{ userProfile && userProfile.userTimeZone ? userProfile.userTimeZone : '-' }} </ion-label>
            <ion-button @click="changeTimeZone()" slot="end" fill="outline" color="dark">{{ $t("Change") }}</ion-button>
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
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  IonTitle,
  modalController
} from '@ionic/vue';
import { mapGetters,useStore } from 'vuex';
import { defineComponent } from 'vue';
import { timeOutline } from 'ionicons/icons'
import Image from '@/components/Image.vue';
import { useRouter } from 'vue-router';
import TimeZoneModal from '@/views/TimezoneModal.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonToolbar,
    IonTitle,
    Image,
  },
  computed: {
    ...mapGetters({
      userProfile: 'user/getUserProfile',
    })
  },
  methods: {
    async changeTimeZone() {
      const timeZoneModal = await modalController.create({
        component: TimeZoneModal,
      });
      return timeZoneModal.present();
    },
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
      store,
      timeOutline
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
