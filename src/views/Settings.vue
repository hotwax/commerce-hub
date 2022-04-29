<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="personCircleOutline" slot="start" />
            <ion-label>{{ $t("Profile") }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>{{ $t("User") }}</ion-label>
            <ion-label slot="end">{{ userProfile !== null ? userProfile.partyName : '' }}</ion-label>
          </ion-item>
          <ion-item lines="full">
            <ion-label>{{ $t("OMS") }}</ion-label>
            <ion-label slot="end">{{ instanceUrl }}</ion-label>
          </ion-item>
          <ion-button fill="clear" @click="() => router.push('/profile')">{{ $t("Details") }}</ion-button>
        </ion-card>

        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="businessOutline" slot="start" />
            <ion-label>{{ $t("Locations")}}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>{{ $t("Locations")}}</ion-label>
            <ion-note slot="end">number of locations</ion-note>
          </ion-item>
          <ion-item lines="full">
            <ion-label>{{ $t("Shops") }}</ion-label>
            <ion-note slot="end">sales channels</ion-note>
          </ion-item>
          <ion-button fill="clear" @click="() => router.push('/locations')">{{ $t("Details") }}</ion-button>
        </ion-card>

        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="peopleCircleOutline" slot="start" />
            <ion-label>{{ $t("Users") }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>{{ $t("Staff") }}</ion-label>
            <ion-note slot="end">user count</ion-note>
          </ion-item>
          <ion-item lines="full"></ion-item>
          <ion-button fill="clear" @click="() => router.push('/users')">{{ $t("Details") }}</ion-button>
        </ion-card>

        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="codeWorkingOutline" slot="start" />
            <ion-label>{{ $t("Connections") }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Shopify store name</ion-label>
            <ion-badge color="success" slot="end">active</ion-badge>
          </ion-item>
          <ion-item lines="full">
            <ion-label>Ship station</ion-label>
            <ion-badge color="success" slot="end">active</ion-badge>
          </ion-item>
          <ion-button fill="clear">{{ $t("Details") }}</ion-button>
        </ion-card>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonContent,
  IonCard,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  businessOutline,
  codeWorkingOutline,
  ellipsisVertical,
  peopleCircleOutline,
  personCircleOutline
} from 'ionicons/icons';
import { mapGetters, useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Settings',
  components: {
    IonBackButton,
    IonBadge,
    IonButton,
    IonContent,
    IonCard,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
      userProfile: 'user/getUserProfile',
      currentFacility: 'user/getCurrentFacility',
      instanceUrl: 'user/getInstanceUrl'
    })
  },
  methods: {
    setFacility (facility: any) {
      this.userProfile.facilities.map((fac: any) => {
        if (fac.facilityId == facility['detail'].value) {
          this.store.dispatch('user/setFacility', {'facility': fac});
        }
      })
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
      businessOutline,
      codeWorkingOutline,
      ellipsisVertical,
      peopleCircleOutline,
      personCircleOutline,
      store,
      router
    }
  }
});
</script>
<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(343px, 1fr));
  max-width: 720px;
  margin: var(--spacer-base) auto 0;
}
</style>
