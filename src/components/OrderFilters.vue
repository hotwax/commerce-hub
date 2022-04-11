<template>
  <ion-list>
    <ion-list-header>{{ $t("Date") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Order created") }}</ion-label>
      <ion-chip id="open-order-created-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.orderCreated" @ionChange.stop="updateAppliedFilters(currentOrderFiltersSelected.orderCreated, 'orderCreated')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.orderCreated" @click.stop="updateAppliedFilters('', 'orderCreated')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Promised date") }}</ion-label>
      <ion-chip id="open-order-promise-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.promisedDate" @ionChange.prevent="updateAppliedFilters(currentOrderFiltersSelected.promisedDate, 'promisedDate')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.promisedDate" @click.prevent="updateAppliedFilters('', 'promisedDate')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Auto cancel date") }}</ion-label>
      <ion-chip id="open-order-auto-cancel-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.autoCancelDate" @ionChange.prevent="updateAppliedFilters(currentOrderFiltersSelected.autoCancelDate, 'autoCancelDate')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.autoCancelDate" @click.prevent="updateAppliedFilters('', 'autoCancelDate')"/>
      </ion-chip>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Type") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Store pickup") }}</ion-label>
      <ion-checkbox :checked="currentOrderFiltersSelected.storePickup" @ionChange.prevent="updateAppliedFilters($event['detail'].checked, 'storePickup')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from store") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.shipFromStore" @ionChange="updateAppliedFilters($event['detail'].checked, 'shipFromStore')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Pre-order") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.preOrder" @ionChange="updateAppliedFilters($event['detail'].checked, 'preOrder')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Back order") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.backOrder" @ionChange="updateAppliedFilters($event['detail'].checked, 'backOrder')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Unfillable") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.unfillable" @ionChange="updateAppliedFilters($event['detail'].checked, 'unfillable')"/>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Status") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.status" @ionChange="updateAppliedFilters($event['detail'].value, 'status')" interface="popover">
        <ion-select-option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Shipping method") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.shippingMethod" @ionChange="updateAppliedFilters($event['detail'].value, 'shippingMethod')" interface="popover">
        <ion-select-option v-for="method in shippingMethodOptions" :key="method" :value="method">{{ method }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from location") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.shipFromLocation" @ionChange="updateAppliedFilters($event['detail'].value, 'shipFromLocation')" interface="popover">
        <ion-select-option value="any" >{{ $t('any') }}</ion-select-option>
        <ion-select-option value="store" >{{ $t('Store') }}</ion-select-option>
        <ion-select-option value="warehouse" >{{ $t('Warehouse') }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>

  <ion-card>
    <ion-toolbar>
      <ion-title>{{ $t("Purchase orders") }}</ion-title>
    </ion-toolbar>
    <ion-card-content>
      <ion-chip @click="updateAppliedFilters(id, 'poIds')" v-for="(id, index) in Object.keys(poIds)" :key="index" :outline="!currentOrderFiltersSelected.poIds.includes(id)">
        <ion-label>{{ id }}</ion-label>
      </ion-chip>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { close, checkmarkOutline } from "ionicons/icons";
import { mapGetters, useStore } from "vuex";
import emitter from '@/event-bus';

export default defineComponent({
  name: 'OrderFilters',
  components: {
    IonCard,
    IonCardContent,
    IonChip,
    IonCheckbox,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
  },
  props: ["poIds", "shippingMethodOptions", "orderStatusOptions"],
  computed: {
    ...mapGetters({
      currentOrderFiltersSelected: 'order/getCurrentOrderFiltersSelected'
    })
  },
  methods: {
    async updateAppliedFilters(value: string, filterName: string) {
      await this.store.dispatch('order/updateAppliedFilters', { value, filterName }).then(() => {
        emitter.emit('filterUpdated');
      })
    }
  },
  setup() {
    const store = useStore();

    return {
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
