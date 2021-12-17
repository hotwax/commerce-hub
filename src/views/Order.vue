<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"/>
        <ion-title>{{ $t("Orders") }}</ion-title>
        <ion-label color="secondary" slot="end">
          <ion-button fill="clear">{{ $t("Download orders") }}</ion-button>
        </ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="order">
        <div class="search">
          <ion-searchbar/>
        </div>
        <div class="order-filter">
          <ion-list>
            <ion-list-header>Date</ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header>Type</ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox/>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox/>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-checkbox/>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header>Date</ion-list-header>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>order created</ion-label>
              <ion-select value="any">
                <ion-select-option value="any">any</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
          <ion-card>
            <ion-toolbar>
              <ion-title>Purchase date</ion-title>
            </ion-toolbar>
            <ion-card-content>
              <ion-chip>
                <ion-label>PO #</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-label>PO #</ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>
        </div>
        <div class="order-card">
          <OrderCard v-for="(order, index) in orders" :key="index" :order="order" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonTitle,
  IonToolbar,
  IonSelectOption,
} from "@ionic/vue";
import { pricetag, ribbon } from "ionicons/icons";
import { defineComponent } from "vue"
import { mapGetters } from 'vuex'
import OrderCard from '@/components/OrderCard.vue'
import { useStore } from '@/store'
export default  defineComponent({
  name: "Order",
  components: {
    IonSelectOption,
    IonBackButton,
    IonButton,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonSearchbar,
    IonSelect,
    IonTitle,
    IonToolbar,
    OrderCard
  },

  computed: {
    ...mapGetters({
      orders: 'order/getList',
      currentFacilityId: 'user/getCurrentFacility'
    })
  },

  methods: {
    async getOrders(vSize, vIndex){
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : 0;
      const payload = {
        viewIndex: viewIndex,
        viewSize: viewSize,
        queryString: '* *',
        groupLimit: 10000,
        groupByField: 'orderId',
        filters: JSON.parse(process.env.VUE_APP_ORDER_FILTERS)
      }
      await this.store.dispatch("order/findOrders", payload)
    }
  },
  mounted() {
    this.getOrders(10, 0);
  },

  setup() {
    const store = useStore();
    return {
      pricetag,
      ribbon,
      store
    };
  },
});
</script>
<style scoped>
.order-filter {
  display: none;
}

@media (min-width: 900px) {
  .order {
    display: grid;
    grid-template-areas:
      "search details"
      "filter details";
  }
  .order-filter {
    grid-area: filter;
    display: unset;
  }
  .search {
    grid-area: search;
  }
  .order-card{
    grid-area: details;
  }
}
</style>
