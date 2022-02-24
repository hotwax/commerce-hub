<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>{{ $t("Settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <!-- Select store -->
      <ion-item>
        <ion-icon :icon="storefrontOutline" slot="start" />
        <ion-label>{{ $t("Store") }}</ion-label>
        <ion-select interface="popover" :value="currentFacility.facilityId" @ionChange="setFacility($event)">
          <ion-select-option v-for="facility in userProfile.facilities" :key="facility.facilityId" :value="facility.facilityId" >{{ facility.name }}</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- OMS information -->
      <ion-item>
        <ion-icon :icon="codeWorkingOutline" slot="start"/>
        <ion-label>{{ $t("OMS") }}</ion-label>
        <p slot="end">{{ instanceUrl }}</p>
      </ion-item>

      <!-- Profile of user logged in -->
      <ion-item>
        <ion-icon :icon="personCircleOutline" slot="start" />
        <ion-label>{{ userProfile !== null ? userProfile.partyName : '' }}</ion-label>
        <ion-button slot="end" fill="outline" color="dark" @click="logout()">{{ $t("Logout") }}</ion-button>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonContent, IonHeader,IonIcon, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { codeWorkingOutline, ellipsisVertical, personCircleOutline, storefrontOutline} from 'ionicons/icons'
import { mapGetters, useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Settings',
  components: {
    IonBackButton,
    IonButton, 
    IonContent, 
    IonHeader, 
    IonIcon,
    IonItem, 
    IonLabel, 
    IonPage, 
    IonSelect, 
    IonSelectOption,
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
          console.log(fac);
        }
      })
    },
    logout () {
      this.store.dispatch('user/logout').then(() => {
        this.router.push('/login');
      })
    }
  },
  setup(){
    const store = useStore();
    const router = useRouter();

    return {
      codeWorkingOutline,
      ellipsisVertical,
      personCircleOutline,
      storefrontOutline,
      store,
      router
    }
  }
});
</script>
