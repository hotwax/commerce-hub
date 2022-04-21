<template>
  <ion-card>
    <ion-item>
      <ion-thumbnail slot="start">
        <Image :src="getProduct(item.productId).mainImageUrl" />
      </ion-thumbnail>
      <ion-label class="ion-text-wrap">
        <p>{{ getProduct(item.productId)?.brandName }}</p>
        {{ item.parentProductName ? item.parentProductName : item.productName }}
        <!-- TODO: make the attribute displaying logic dynamic -->
        <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/')"> {{ $t("Color") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/COLOR/') }} </p>
        <p v-if="$filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/')"> {{ $t("Size") }}: {{ $filters.getFeature(getProduct(item.productId).featureHierarchy, '1/SIZE/') }} </p>
      </ion-label>
      <div class="metadata">
        <StatusBadge :statusDesc="item.orderItemStatusDesc || ''" :key="item.orderItemStatusDesc"/>
        <StatusBadge v-if="item.facilityId === orderPreOrderFacilityId || item.facilityId === orderBackOrderFacilityId" :statusDesc="item.facilityId === orderPreOrderFacilityId ? 'Pre-order' : 'Backorder' || ''" :key="item.facilityName"/>
      </div>
    </ion-item>
    <!-- TODO: Need to handle this property -->
    <div v-if="item.facilityId === orderPreOrderFacilityId || item.facilityId === orderBackOrderFacilityId">
      <ion-item>
        <ion-label>{{ $t("Promise date") }}</ion-label>
        <p slot="end"> {{ item.promisedDatetime ? $filters.formatUtcDate(item.promisedDatetime, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-'  }} </p>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t("PO arrival date") }}</ion-label>
        <!-- TODO: Need to handle this property -->
        <p slot="end"> {{ item.promiseOrderArrivalDate ? $filters.formatUtcDate(item.promiseOrderArrivalDate, 'YYYY-MM-DDTHH:mm:ssZ', 'D MMM YYYY') : '-' }} </p>
      </ion-item>
      <ion-item>
        <ion-label>{{ $t("Parking") }}</ion-label>
        <!-- TODO: Need to handle this property -->
        <p slot="end"> {{ item.facilityName ? item.facilityName : '-' }} </p>
      </ion-item>
    </div>
    <div v-else>
      <ion-item>
        <ion-label>{{ $t("Shipping method") }}</ion-label>
        <p slot="end"> {{ item.shipmentMethodTypeId ? getShipmentMethodDesc(item.shipmentMethodTypeId) : '-' }} </p>
      </ion-item>
      <div v-if="item.facilityId !== '_NA_' && item.orderItemStatusId !== 'ITEM_COMPLETED'">
        <ion-item>
          <ion-label>{{ $t("Shipping from") }}</ion-label>
          <!-- Used ion-badge to display a dot after the facility name when the ship from facility is brokering queue -->
          <p slot="end">
            {{ item.facilityName ? item.facilityName : "-" }}
          </p>
        </ion-item>
        <ion-item lines="none">
          <ion-label>{{ $t("Location inventory") }}</ion-label>
          <p slot="end">{{ getProductStock(item.productId) }}</p>
        </ion-item>
      </div>
      <div v-if="item.facilityId === '_NA_' && item.orderItemStatusId !== 'ITEM_COMPLETED'">
        <ion-item>
          <ion-label>{{ $t("Auto cancel") }}</ion-label>
          <p slot="end">{{ item.autoCancelDate ? moment.utc(item.autoCancelDate).fromNow() : '-' }}</p>
        </ion-item>
        <ion-item lines="none">
          <ion-label>{{ $t("Parking") }}</ion-label>
          <p slot="end">{{ 'Brokering queue' }}</p>
        </ion-item>
      </div>
      <div v-if="item.orderItemStatusId === 'ITEM_COMPLETED'">
        <ion-item>
          <ion-label>{{ $t("Shipped from") }}</ion-label>
          <p slot="end">{{ item.facilityName ? item.facilityName : "-" }}</p>
        </ion-item>
        <ion-item lines="none">
          <ion-label>{{ $t("Tracking code") }}</ion-label>
          <p slot="end">{{ item.orderItemTrackingCode ? item.orderItemTrackingCode : '-' }}</p>
        </ion-item>
      </div>
    </div>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonItem,
  IonLabel,
  IonThumbnail
} from '@ionic/vue'
import { mapGetters } from "vuex";
import Image from '@/components/Image.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import * as moment from "moment-timezone";

export default defineComponent({
  name: "OrderItemCard",
  components: {
    Image,
    IonCard,
    IonItem,
    IonLabel,
    IonThumbnail,
    StatusBadge
  },
  computed: {
    ...mapGetters({
      getProduct: 'product/getProduct',
      getShipmentMethodDesc: 'util/getShipmentMethod',
      getProductStock: 'stock/getProductStock',
    })
  },
  props: ["item"],
  setup() {
    const orderPreOrderFacilityId = process.env.VUE_APP_PRE_ORDER_IDNT_ID
    const orderBackOrderFacilityId = process.env.VUE_APP_BACKORDER_IDNT_ID

    return {
      moment,
      orderPreOrderFacilityId,
      orderBackOrderFacilityId
    }
  }
});
</script>

<style scoped>
.metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 4px;
}
</style>
