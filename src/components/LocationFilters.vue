<template>
  <ion-list>
    <ion-item lines="none">
      <ion-icon :icon="globeOutline" slot="start" />
      <ion-label>{{ $t("Shop") }}</ion-label>
      <ion-select :value="currentLocationFilterSelected.productStoreId" @ionChange="updateFilters($event['detail'].value, 'productStoreId')" interface="popover">
        <ion-select-option v-for="store in eComStores" :key="store.productStoreId" :value="store.productStoreId">{{ store.storeName }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item lines="none">
      <ion-icon :icon="businessOutline" slot="start" />
      <ion-label>{{ $t("Type") }}</ion-label>
      <ion-select :value="currentLocationFilterSelected.facilityTypeId" @ionChange="updateFilters($event['detail'].value, 'facilityTypeId')" interface="popover">
        <ion-select-option v-for="type in facilityTypes" :key="type.facilityTypeId" :value="type.facilityTypeId">{{ type.description }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import { businessOutline, close, globeOutline } from "ionicons/icons";
import { mapGetters, useStore } from 'vuex';
import emitter from '@/event-bus';

export default defineComponent({
  name: 'LocationFilters',
  components: {
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
  },
  props: ["facilityTypes", "eComStores"],
  computed: {
    ...mapGetters({
      currentLocationFilterSelected: 'util/getcurrentLocationFilterSelected'
    })
  },
  methods: {
    async updateFilters(value: string, filterName: string) {
      await this.store.dispatch('util/updateLocationFilters', { value, filterName }).then(() => {
        emitter.emit('filtersUpdated');
      })
    }
  },
  setup() {
    const store = useStore();

    return {
      businessOutline,
      close,
      globeOutline,
      store
    }
  }
})
</script>