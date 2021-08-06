<template>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-radio-group value="rd" v-model="currentFacility.facilityId">
        <ion-item v-for="(facility, index) in facilities" :key="facility.facilityId" @click="setFacility(facility)" :lines="index === facilities.length-1 ? 'none' : ''">
          <ion-label>{{ facility.facilityId }}</ion-label>
          <ion-radio :value="facility.facilityId" slot="start"></ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonList, IonRadioGroup, IonItem, IonLabel, IonRadio, popoverController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'Store-Popover',
  components: { IonContent, IonItem, IonList, IonRadioGroup, IonLabel, IonRadio },
  computed: {
    ...mapGetters({
      currentFacility: 'user/getCurrentFacility'
    })
  },
  props: [
    'facilities'
  ],
  methods: {
    setFacility (facility: object) {
      this.store.dispatch('user/setFacility', {facility}).then(() => {
        popoverController.dismiss({ dismissed: true });
      });
    }
  },
  setup () {
    const store = useStore();
    
    return {
      store
    }
  }
});
</script>