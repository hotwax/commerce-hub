<template>
  <ion-list>
    <ion-list-header>{{ $t("Date") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Order created") }}</ion-label>
      <ion-chip id="open-order-created-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.orderCreated" @ionChange.stop="appliedFiltersUpdated(currentOrderFiltersSelected.orderCreated, 'orderCreated')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.orderCreated" @click.stop="appliedFiltersUpdated('', 'orderCreated')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Promise date") }}</ion-label>
      <ion-chip id="open-order-promise-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.promiseDate" @ionChange.prevent="appliedFiltersUpdated(currentOrderFiltersSelected.promiseDate, 'promiseDate')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.promiseDate" @click.prevent="appliedFiltersUpdated('', 'promiseDate')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Auto cancel date") }}</ion-label>
      <ion-chip id="open-order-auto-cancel-date-modal" slot="end">
        <ion-input v-model="currentOrderFiltersSelected.autoCancelDate" @ionChange.prevent="appliedFiltersUpdated(currentOrderFiltersSelected.autoCancelDate, 'autoCancelDate')" type="date" />
        <ion-icon :icon="close" v-if="currentOrderFiltersSelected.autoCancelDate" @click.prevent="appliedFiltersUpdated('', 'autoCancelDate')"/>
      </ion-chip>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Type") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Store pickup") }}</ion-label>
      <ion-checkbox :checked="currentOrderFiltersSelected.storePickup" @ionChange.prevent="appliedFiltersUpdated($event['detail'].checked, 'storePickup')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from store") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.shipFromStore" @ionChange="appliedFiltersUpdated($event['detail'].checked, 'shipFromStore')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Pre-order") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.preOrder" @ionChange="appliedFiltersUpdated($event['detail'].checked, 'preOrder')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Back order") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.backOrder" @ionChange="appliedFiltersUpdated($event['detail'].checked, 'backOrder')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Unfillable") }}</ion-label>
      <ion-checkbox v-model="currentOrderFiltersSelected.unfillable" @ionChange="appliedFiltersUpdated($event['detail'].checked, 'unfillable')"/>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Status") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.status" @ionChange="appliedFiltersUpdated($event['detail'].value, 'status')" interface="popover">
        <ion-select-option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Shipping method") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.shippingMethod" @ionChange="appliedFiltersUpdated($event['detail'].value, 'shippingMethod')" interface="popover">
        <ion-select-option v-for="method in shippingMethodOptions" :key="method" :value="method">{{ method }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from location") }}</ion-label>
      <ion-select :value="currentOrderFiltersSelected.shipFromLocation" @ionChange="appliedFiltersUpdated($event['detail'].value, 'shipFromLocation')" interface="popover">
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
      <ion-chip @click="appliedFiltersUpdated(id, 'poIds')" v-for="(id, index) in Object.keys(poIds)" :key="index">
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
    async appliedFiltersUpdated(value: string, filterName: string) {
      const poIds = this.currentOrderFiltersSelected.poIds;
      if (filterName === 'poIds') {
        !poIds.includes(value) ? poIds.push(value) : poIds.splice(poIds.indexOf(value), 1)
        value = poIds
      }
      await this.store.dispatch('order/appliedFiltersUpdated', { value, filterName }).then(() => {
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
