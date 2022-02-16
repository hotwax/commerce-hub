<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div>
        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="personCircleOutline" slot="start" />
            <ion-label>Profile</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>User</ion-label>
            <ion-note slot="end">Cyrill</ion-note>
          </ion-item>
          <ion-item lines="full">
            <ion-label>OMS</ion-label>
            <ion-note slot="end">dev-hc</ion-note>
          </ion-item>
          <ion-button fill="clear">Details</ion-button>
        </ion-card>
        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="businessOutline" slot="start" />
            <ion-label>Locations</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Locations</ion-label>
            <ion-note slot="end">number of locations</ion-note>
          </ion-item>
          <ion-item lines="full">
            <ion-label>Shops</ion-label>
            <ion-note slot="end">sales channels</ion-note>
          </ion-item>
          <ion-button fill="clear">Details</ion-button>
        </ion-card>
        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="peopleCircleOutline" slot="start" />
            <ion-label>Users</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Staff</ion-label>
            <ion-note slot="end">user count</ion-note>
          </ion-item>
          <ion-item lines="full">
           
          </ion-item>
          <ion-button fill="clear">Details</ion-button>
        </ion-card>
        <ion-card>
          <ion-item lines="none">
            <ion-icon :icon="codeWorkingOutline" slot="start" />
            <ion-label>Connections</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Shopify store name</ion-label>
            <ion-badge color="success" slot="end">active</ion-badge>
          </ion-item>
          <ion-item lines="full">
            <ion-label>Ship station</ion-label>
            <ion-badge color="success" slot="end">active</ion-badge>
          </ion-item>
          <ion-button fill="clear">Details</ion-button>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  businessOutline,
  codeWorkingOutline,
  ellipsisVertical,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Settings",
  components: {
    IonBackButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  computed: {
    ...mapGetters({
      userProfile: "user/getUserProfile",
      currentFacility: "user/getCurrentFacility",
      instanceUrl: "user/getInstanceUrl",
    }),
  },
  methods: {
    setFacility(facility: any) {
      this.userProfile.facilities.map((fac: any) => {
        if (fac.facilityId == facility["detail"].value) {
          this.store.dispatch("user/setFacility", { facility: fac });
          console.log(fac);
        }
      });
    },
    logout() {
      this.store.dispatch("user/logout").then(() => {
        this.router.push("/login");
      });
    },
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
      router,
    };
  },
});
</script>
<style scoped>
@media (min-width: 991px) {
  ion-content > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 720px;
    margin: var(--spacer-xl) auto 0;
  }
}
</style>
