<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon :icon="close" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ $t("Filters") }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-list-header>{{ $t("Date") }}</ion-list-header>
      <ion-item>
        <ion-label>{{ $t("Order created") }}</ion-label>
        <ion-chip slot="end" @click.stop="openOrderedDateModal()">
          <ion-label>{{ currentOrderFiltersSelected.orderCreated ? $filters.formatDate(currentOrderFiltersSelected.orderCreated, 'YYYY-MM-DDTHH:mm:ssTZD', 'D MMM YYYY') : 'any' }}</ion-label>
        </ion-chip>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t("Promise date") }}</ion-label>
        <ion-chip slot="end" @click.stop="openPromiseDateModal()">
          <ion-label>{{ currentOrderFiltersSelected.promiseDate ? $filters.formatDate(currentOrderFiltersSelected.promiseDate, 'YYYY-MM-DDTHH:mm:ssTZD', 'D MMM YYYY') : 'any' }}</ion-label>
        </ion-chip>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t("Auto cancel date") }}</ion-label>
        <ion-chip slot="end" @click.stop="openAutoCancelDateModal()">
          <ion-label>{{ currentOrderFiltersSelected.autoCancelDate ? $filters.formatDate(currentOrderFiltersSelected.autoCancelDate, 'YYYY-MM-DDTHH:mm:ssTZD', 'D MMM YYYY') : 'any' }}</ion-label>
        </ion-chip>
      </ion-item>
    </ion-list>
    <ion-list>
      <ion-list-header>{{ $t("Type") }}</ion-list-header>
      <ion-item>
        <ion-label>{{ $t("Store pickup") }}</ion-label>
        <ion-checkbox :checked="currentOrderFiltersSelected.storePickup" @ionChange="appliedFiltersUpdated($event['detail'].checked, 'storePickup')"/>
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
        <ion-chip v-for="(id, index) in poIds" :key="index">
          <ion-label>{{ id }}</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  modalController
} from '@ionic/vue';
import { close } from "ionicons/icons";
import { mapGetters, useStore } from "vuex";
import emitter from '@/event-bus';

export default defineComponent({
  name: 'OrderFilterModal',
  components: {
    IonButtons,
    IonButton,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
      currentOrderFiltersSelected: 'order/getCurrentOrderFiltersSelected'
    })
  },
  props: ["poIds", "shippingMethodOptions", "orderStatusOptions"],
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
    async appliedFiltersUpdated(value: string, filterName: string) {
      await this.store.dispatch('order/appliedFiltersUpdated', { value, filterName })
    },
    async openOrderedDateModal() {
      const orderCreatedDateModal = await modalController.create({
        component: IonDatetime,
        componentProps: {
          value: this.currentOrderFiltersSelected.orderCreated,
          presentation: 'date'
        }
      })

      orderCreatedDateModal.onDidDismiss().then((data) => console.log(data));

      return orderCreatedDateModal.present();
    },
    async openPromiseDateModal() {
      const openPromiseDateModal = await modalController.create({
        component: IonDatetime,
        componentProps: {
          value: this.currentOrderFiltersSelected.promiseDate,
          presentation: 'date'
        }
      });

      return openPromiseDateModal.present();
    },
    async openAutoCancelDateModal() {
      const openAutoCancelDateModal = await modalController.create({
        component: IonDatetime,
        componentProps: {
          value: this.currentOrderFiltersSelected.autoCancelDate,
          presentation: 'date'
        }
      });

      return openAutoCancelDateModal.present();
    }
  },
  setup() {
    const store = useStore();

    return {
      close,
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
