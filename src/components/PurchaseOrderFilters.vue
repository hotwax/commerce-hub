<template>
  <ion-list>
    <ion-list-header><h3>{{ $t("Location") }}</h3></ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Product Store") }}</ion-label>
      <ion-select :value="query.productStoreId" @ionChange="updateAppliedPoFilters($event['detail'].value, 'productStoreId')" interface="popover">
        <ion-select-option value="any">Australia</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-label>{{ $t("Facility") }}</ion-label>
      <ion-select :value="query.facilityId" @ionChange="updateAppliedPoFilters($event['detail'].value, 'facilityId')" interface="popover">
        <ion-select-option value="any">California Warehouse</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>

  <ion-list>
    <ion-list-header><h3>{{ $t("Date") }}</h3></ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Arrival date") }}</ion-label>
      <ion-chip slot="end">
        <ion-icon :icon="calendarOutline" />
        <ion-input v-model="query.estimatedDeliveryDate" @ionChange="updateAppliedPoFilters(query.estimatedDeliveryDate, 'estimatedDeliveryDate')" type="date" />
        <ion-icon :icon="close" v-if="query.estimatedDeliveryDate" @click="updateAppliedPoFilters('', 'estimatedDeliveryDate')"/>
      </ion-chip>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { close, checkmarkOutline, calendarOutline } from "ionicons/icons";
import { mapGetters, useStore } from "vuex";

export default defineComponent({
  name: 'OrderFilters',
  components: {
    IonChip,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption
  },
  computed: {
    ...mapGetters({
      query: 'order/getPurchaseOrderQuery'
    })
  },
  methods: {
    async updateAppliedPoFilters(value: string, filterName: string) {
      if (value === this.query[filterName] && !(filterName === 'estimatedDeliveryDate')) {
        return ;
      }
      // TODO: handle the case when the applied filter type is date, as in that case the action is called
      // multiple times (two times when date is applied and three times when date filter is removed)
      await this.store.dispatch('order/updateAppliedPoFilters', { value, filterName })
    }
  },
  setup() {
    const store = useStore();

    return {
      calendarOutline,
      close,
      checkmarkOutline,
      store
    }
  }
})
</script>

<style scoped>
ion-modal {
  --width: 290px;
  --height: 382px;
  --border-radius: 8px;
}
</style>
