<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/find-order" slot="start" />
        <ion-title>{{ $t("Order detail") }}</ion-title>
        <!-- TODO: implement functionality for the sync button -->
        <!-- <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="syncOutline" />
          </ion-button>
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <main>
        <section class="header">
          <div class="id">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="ticketOutline" />
              <h1>{{ order.orderName ? order.orderName : order.orderId }}</h1>
              <ion-badge :color="orderStatus[order.statusId]?.color ? orderStatus[order.statusId]?.color : 'primary'" slot="end">{{ orderStatus[order.statusId]?.label ? orderStatus[order.statusId]?.label : order.statusId }}</ion-badge>
              <ion-select :value="order.statusId" @ionChange="changeStatus(order.orderId, $event)" slot="end">
                <ion-select-option v-for="status in validStatusChange(order.statusId)" :key="status" :value="status">{{ orderStatus[status]?.label }}</ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <!-- TODO: Update timeline to display the orderCreatedDate, orderCompletedDate, brokeredDate and entryDate -->
          <!-- <div class="timeline">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="timeOutline" class="mobile-only" />
              <h2>{{ $t("Timeline") }}</h2>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>

            <ion-list class="desktop-only">
              <ion-item v-for="item in 2" :key="item">
                <ion-icon :icon="ticketOutline" slot="start" />
                <ion-label>
                  <p>+10 minutes</p>
                  Imported from Shopify
                </ion-label>
                <ion-icon slot="end" :icon="informationCircleOutline" />
              </ion-item>
            </ion-list>
          </div> -->

          <div class="info">
            <ion-card>
              <ion-list>
                <ion-item lines="none">
                  <ion-label> {{ order.customer?.name }} </ion-label>
                  <!-- TODO: handle this property to display loyalty options -->
                  <ion-chip slot="end" v-if="order.customer?.loyaltyOptions">
                    <ion-icon :icon="ribbon" />
                    <ion-label>{{ order.customer?.loyaltyOptions }}</ion-label>
                  </ion-chip>
                </ion-item>
                <ion-item v-if="order.customer?.emailId">
                  <ion-icon :icon="mailOutline" slot="start" />
                  <ion-label> {{ order.customer?.emailId }} </ion-label>
                </ion-item>
                <ion-item v-if="order.customer?.phoneNumber">
                  <ion-icon :icon="callOutline" slot="start" />
                  <ion-label> {{ order.customer?.phoneNumber }} </ion-label>
                </ion-item>
                <ion-item lines="none" v-if="order.customer?.toName || order.customer?.address1 || order.customer?.address2 || order.customer?.city || order.customer?.country">
                  <ion-icon :icon="cashOutline" slot="start" />
                  <ion-label>
                    {{ order.customer?.toName }}
                    <p>{{ order.customer?.address1 }}</p>
                    <p>{{ order.customer?.address2 }}</p>
                    <p>{{ order.customer?.city }} {{ order.customer?.zipCode && ',' }} {{ order.customer?.zipCode }}</p>
                    <p>{{ order.customer?.state }} {{ order.customer?.country && ',' }} {{ order.customer?.country }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card>

            <ion-card>
              <ion-list>
                <ion-list-header>{{ $t("Shopify IDs") }}</ion-list-header>
                <ion-item>
                  <ion-label> {{ $t("Order Number") }} </ion-label>
                  <p slot="end">{{ order.identifications?.orderNo ? order.identifications.orderNo : "-" }}</p>
                </ion-item>
                <ion-item>
                  <ion-label> {{ $t("Order ID") }} </ion-label>
                  <p slot="end">{{ order.identifications?.orderId ? order.identifications.orderId : "-" }}</p>
                </ion-item>
                <ion-item lines="none">
                  <ion-label> {{ $t("Order Name") }} </ion-label>
                  <p slot="end">{{ order.identifications?.orderName ? order.identifications.orderName : "-" }} </p>
                </ion-item>
              </ion-list>
            </ion-card>
          </div>
        </section>

        <section class="products">
          <ion-item lines="none">
            <ion-icon slot="start" :icon="shirtOutline" />
            <h1>{{ $t("Products") }}</h1>
          </ion-item>

          <div class="product" v-for="(item, index) of order.items" :key="index">
            <div class="product-image desktop-only">
              <Image :src="getProduct(item.productId).mainImageUrl" />
              <!-- TODO: handle navigation to product inventory page -->
              <!-- <ion-button expand="block" color="secondary" fill="outline">
                {{ $t("Product inventory") }}
                <ion-icon :icon="openOutline" slot="end" />
              </ion-button> -->
            </div>

            <div>
              <hr />

              <div class="product-header">
                  <ion-item lines="none">
                    <ion-thumbnail slot="start" class="mobile-only">
                      <Image :src="getProduct(item.productId).mainImageUrl" />
                    </ion-thumbnail>
                    <ion-label>
                      <p> {{ item.brandName }} </p>
                      {{ item.parentProductName ? item.parentProductName : item.productName }}
                      <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/')">{{ $t("Color") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }}</p>
                      <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/')">{{ $t("Size") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }}</p>
                    </ion-label>
                  </ion-item>

                <div class="product-tags desktop-only">
                  <ion-chip v-if="item.internalName">
                    <!-- TODO update shopify icon later -->
                    <ion-icon :icon="pricetag" />
                    <ion-label>{{ item.internalName }}</ion-label>
                  </ion-chip>
                </div>

                  <ion-item lines="none">
                    <ion-badge slot="end" :color="itemStatus[item.orderItemStatusId]?.color ? itemStatus[item.orderItemStatusId]?.color : 'primary'">{{ itemStatus[item.orderItemStatusId]?.label ? itemStatus[item.orderItemStatusId]?.label : item.orderItemStatusId }}</ion-badge>
                  </ion-item>
              </div>

              <hr />

              <div class="desktop-only">
                <div class="product-card">
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Destination") }}</ion-list-header>
                      <ion-item lines="none">
                        <ion-label>
                          {{ item.customerPartyName }}
                          <p>{{ item.address1 }}</p>
                          <p>{{ item.address2 }}</p>
                          <p>{{ item.shipToCity }} {{ item.postalCode && ',' }} {{ item.postalCode }}</p>
                          <p>{{ item.shipToState }} {{ item.shipToCountry && ',' }} {{ item.shipToCountry }}</p>
                        </ion-label>
                      </ion-item>
                      <!-- TODO: make edit address button functional, also add UI for same -->
                      <!-- <ion-buttons>
                        <ion-button color="primary" fill="clear">{{ $t("Edit address") }}</ion-button>
                      </ion-buttons> -->
                    </ion-list>
                  </ion-card>
                  <ion-card v-if="item.facilityId === orderPreOrderId || item.facilityId === orderBackOrderId">
                    <ion-list>
                      <ion-list-header>{{ item.facilityId === orderPreOrderId ? $t("Pre-order") : $t("BackOrder") }}</ion-list-header>
                      <ion-item>
                        <ion-label>{{ $t("Purchase order") }}</ion-label>
                        <ion-chip slot="end">
                          <!-- TODO: check for this property -->
                          <ion-label>PO#</ion-label>
                        </ion-chip>
                      </ion-item>
                      <ion-item v-if="item.orderItemStatusId !== 'ORDER_COMPLETED'">
                        <ion-label>{{ $t("Estimated arrival") }}</ion-label>
                        <!-- TODO: handle it property again -->
                        <p slot="end">{{ item.promiseOrderArrivalDate ? $filters.formatUtcDate(item.promiseOrderArrivalDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-' }}</p>
                      </ion-item>
                      <ion-item v-if="item.orderItemStatusId !== 'ORDER_COMPLETED'">
                        <ion-label> {{ $t("Promise date") }} </ion-label>
                        <p slot="end">{{ item.promisedDatetime ? $filters.formatUtcDate(item.promisedDatetime, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-'  }}</p>
                      </ion-item>
                      <ion-item v-if="item.orderItemStatusId !== 'ORDER_COMPLETED'">
                        <ion-label> {{ $t("Auto cancel") }} </ion-label>
                        <p slot="end">{{ item.autoCancelDate ? $filters.formatUtcDate(item.autoCancelDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : "-" }}</p>
                      </ion-item>
                      <ion-item v-if="item.orderItemStatusId === 'ORDER_COMPLETED'">
                        <ion-label> {{ $t("Received Date") }} </ion-label>
                        <p slot="end">{{ item.receivedDate ? $filters.formatUtcDate(item.receivedDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : "-" }}</p>
                      </ion-item>
                      <!-- TODO: make edit date button functional, also add UI for same -->
                      <!-- <ion-buttons>
                        <ion-button color="primary" fill="clear">{{ $t("Edit dates") }}</ion-button>
                      </ion-buttons> -->
                    </ion-list>
                  </ion-card>
                  <ion-card>
                    <ion-list>
                      <ion-list-header>{{ $t("Fulfillment") }}</ion-list-header>
                      <ion-item>
                        <ion-label> {{ $t("Shipping method") }} </ion-label>
                        <p>{{ getShipmentMethod(item.shipmentMethodTypeId) ? getShipmentMethod(item.shipmentMethodTypeId) : "-"}}</p>
                      </ion-item>
                      <ion-item>
                        <ion-label>{{ $t("Shipping from") }}</ion-label>
                        <p>{{ item.facilityName ? item.facilityName : "-" }}</p>
                      </ion-item>
                      <ion-item lines="none">
                        <ion-label>{{ $t("Location Inventory") }}</ion-label>
                        <p>{{ getProductStock(item.productId) }}</p>
                      </ion-item>
                      <!-- TODO: make changing location button functional, also add UI for same -->
                      <!-- <ion-buttons>
                        <ion-button color="primary" fill="clear">{{ $t("Change fulfillment location") }}</ion-button>
                      </ion-buttons> -->
                    </ion-list>
                  </ion-card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import Image from '@/components/Image.vue';
import {
  callOutline,
  caretDown,
  cashOutline,
  informationCircleOutline,
  mailOutline,
  openOutline,
  pricetag,
  ribbon,
  shirtOutline,
  syncOutline,
  ticketOutline,
  timeOutline
} from 'ionicons/icons';
import {
  IonBackButton,
  IonBadge,
  IonCard,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { useStore } from "@/store";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Order',
  components: {
    Image,
    IonBackButton,
    IonBadge,
    IonCard,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonTitle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
      order: 'order/getCurrentOrder',
      getProduct: 'product/getProduct',
      getProductStock: 'stock/getProductStock',
      getShipmentMethod: 'util/getShipmentMethod',
      validStatusChange: 'order/getOrderValidStatusChange'
    })
  },
  methods:{
    orderDetails(orderId?: any){
      this.store.dispatch("order/getOrderDetails", orderId);
    },
    changeStatus(orderId: string, ev: CustomEvent) {
      // Added this condition to not call the updateOrderStatus action when the current
      // selected status and the order status is same
      if (this.order.statusId === ev['detail'].value) return ;
      this.store.dispatch('order/updateOrderStatus', {orderId, statusId: ev['detail'].value, 'setItemStatus': 'Y'})
    }
  },
  mounted() {
    this.orderDetails(this.$route.params.orderId);
  },
  setup() {
    const store = useStore();
    const orderStatus = JSON.parse(process.env.VUE_APP_ORDER_STATUS)
    const itemStatus = JSON.parse(process.env.VUE_APP_ITEM_STATUS)
    const orderPreOrderId = process.env.VUE_APP_PRE_ORDER_IDNT_ID
    const orderBackOrderId = process.env.VUE_APP_BACKORDER_IDNT_ID

    return {
      callOutline,
      caretDown,
      cashOutline,
      informationCircleOutline,
      itemStatus,
      mailOutline,
      openOutline,
      orderBackOrderId,
      orderPreOrderId,
      orderStatus,
      pricetag,
      ribbon,
      shirtOutline,
      store,
      syncOutline,
      ticketOutline,
      timeOutline
    };
  },
});
</script>

<style scoped>
/* To hide selected text which appear after selecting any option*/
ion-select::part(text) {
  display: none;
}

/* To remove margin between badge and ion-select */
ion-select {
  margin-inline-start: 0;
}

.product-header {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
}

.product-tags {
  justify-self: center;
}

.product-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
  align-items: start;
}

@media (min-width: 991px) {
  .product {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacer-lg);     
    align-items: start;
  }

  .product-image {
    height: 362px;
  }
}
</style>
