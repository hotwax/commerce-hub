<template>
  <ion-list>
    <ion-list-header>{{ $t("Date") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Order created") }}</ion-label>
      <ion-chip id="open-order-created-date-modal" slot="end">
        <ion-input v-model="query.orderCreated" @ionChange="updateAppliedFilters(query.orderCreated, 'orderCreated')" type="date" />
        <ion-icon :icon="close" v-if="query.orderCreated" @click="updateAppliedFilters('', 'orderCreated')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Promised date") }}</ion-label>
      <ion-chip id="open-order-promise-date-modal" slot="end">
        <ion-input v-model="query.promisedDate" @ionChange="updateAppliedFilters(query.promisedDate, 'promisedDate')" type="date" />
        <ion-icon :icon="close" v-if="query.promisedDate" @click="updateAppliedFilters('', 'promisedDate')"/>
      </ion-chip>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Auto cancel date") }}</ion-label>
      <ion-chip id="open-order-auto-cancel-date-modal" slot="end">
        <ion-input v-model="query.autoCancelDate" @ionChange="updateAppliedFilters(query.autoCancelDate, 'autoCancelDate')" type="date" />
        <ion-icon :icon="close" v-if="query.autoCancelDate" @click="updateAppliedFilters('', 'autoCancelDate')"/>
      </ion-chip>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Type") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Store pickup") }}</ion-label>
      <ion-checkbox :checked="query.storePickup" @ionChange="updateAppliedFilters($event['detail'].checked, 'storePickup')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from store") }}</ion-label>
      <ion-checkbox :checked="query.shipFromStore" @ionChange="updateAppliedFilters($event['detail'].checked, 'shipFromStore')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Pre-order") }}</ion-label>
      <ion-checkbox :checked="query.preOrder" @ionChange="updateAppliedFilters($event['detail'].checked, 'preOrder')"/>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Back order") }}</ion-label>
      <ion-checkbox :checked="query.backOrder" @ionChange="updateAppliedFilters($event['detail'].checked, 'backOrder')"/>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Status") }}</ion-label>
      <ion-select :value="query.status" @ionChange="updateAppliedFilters($event['detail'].value, 'status')" interface="popover">
        <ion-select-option v-for="status in orderStatusOptions" :key="status" :value="status">{{ status ? ( orderStatus[status]?.label ? orderStatus[status]?.label : status ) : "any" }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Shipping method") }}</ion-label>
      <ion-select :value="query.shippingMethod" @ionChange="updateAppliedFilters($event['detail'].value, 'shippingMethod')" interface="popover">
        <ion-select-option v-for="shippingMethod in shippingMethodOptions" :key="shippingMethod" :value="shippingMethod">{{ shippingMethod  ? getShipmentMethodDesc(shippingMethod) : 'any' }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Ship from location") }}</ion-label>
      <ion-select :value="query.shipFromLocation" @ionChange="updateAppliedFilters($event['detail'].value, 'shipFromLocation')" interface="popover">
        <ion-select-option value="" >{{ $t('any') }}</ion-select-option>
        <ion-select-option value="RETAIL_STORE" >{{ $t('Store') }}</ion-select-option>
        <ion-select-option value="WAREHOUSE" >{{ $t('Warehouse') }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>

  <ion-card>
    <ion-toolbar>
      <ion-title>{{ $t("Purchase orders") }}</ion-title>
    </ion-toolbar>
    <ion-card-content>
      <ion-chip @click="updateAppliedFilters(id, 'selectedPoIds')" v-for="(id, index) in Object.keys(poIds)" :key="index" :outline="!query.selectedPoIds.includes(id)">
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
      query: 'order/getOrderQuery',
      getShipmentMethodDesc: 'util/getShipmentMethod'
    })
  },
  methods: {
    async updateAppliedFilters(value: string, filterName: string) {
      if (value === this.query[filterName] && !(filterName === 'orderCreated' || filterName === 'promisedDate' || filterName === 'autoCancelDate')) {
        return ;
      }
      // TODO: handle the case when the applied filter type is date, as in that case the action is called
      // multiple times (two times when date is applied and three times when date filter is removed)
      await this.store.dispatch('order/updateAppliedFilters', { value, filterName })
    }
  },
  setup() {
    const store = useStore();
    const orderStatus = JSON.parse(process.env.VUE_APP_ORDER_STATUS)

    return {
      close,
      checkmarkOutline,
      orderStatus,
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
