<template>
  <div class="order-header">
    <div class="order-id">
      <ion-item lines="none">
        <ion-label>
          <h1>{{ order.doclist.docs[0].orderId }}</h1>
          <p>{{ order.doclist.docs[0].customerPartyName }}</p>
        </ion-label>
      </ion-item>
    </div>
    <div class="order-tags">
      <ion-chip outline v-if="$filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, orderIdentificationTypeId)">
        <ion-icon :icon="pricetag" />
        <!-- NOTE:- Here we needed to print Shopify Id but not got from api so taken reference from preOrder app -->
        <ion-label>{{ $filters.getOrderIdentificationId(order.doclist.docs[0].orderIdentifications, orderIdentificationTypeId) }}</ion-label>
      </ion-chip>
      <ion-chip outline v-if="$filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, cusotmerLoyaltyOptions)">
        <ion-icon :icon="ribbon" />          
        <!-- NOTE:- Here we needed to print Shopify Id but not got from api so taken reference from preOrder app -->
        <ion-label>{{ $filters.getCustomerLoyalty(order.doclist.docs[0].orderNotes, cusotmerLoyaltyOptions) }}</ion-label>
      </ion-chip>
    </div>
    <div class="order-metatags">
      <div class="metatags">
        <ion-note>{{ $t("Order placed on") }} {{ $filters.formatUtcDate(order.doclist.docs[0].orderDate, 'YYYY-MM-DDTHH:mm:ssZ') }}</ion-note>
      </div>
      <div class="tags">
        <!-- Specific order status property in not available in api-->
        <ion-badge color="primary" slot="end">{{ order.doclist.docs[0].orderStatusDesc }}</ion-badge>
      </div>
    </div>
  </div>
  <div class="order-items">
    <OpenItemCard v-for="(item, index) in order.doclist.docs" :key="index" :item="item" />
  </div>
</template>
<script>
import {
  IonBadge,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/vue";
import { defineComponent } from "vue";
import OpenItemCard from "@/components/OrderItemCard.vue";
import { pricetag, ribbon } from "ionicons/icons";

export default defineComponent({
  name: "OrderCard",
  components: {
    IonBadge,
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    OpenItemCard,
  },
	props: ['order'],
  setup() {
    return { pricetag, ribbon };
  },
});
</script>
<style scoped>

.order-header {
  display: grid;
  grid-template-areas:
    "id metadata"
    "tags tags";
}
.order-id {
  grid-area: id;
}
.order-tags {
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
	align-self: center;
}
.text {
  margin-right: 40px;
}
.order-metatags {
  grid-area: metadata;
  justify-self: end;
  margin-right: 10px;
	align-self: center;
}
.metatags {
  display: block;
}
.tags {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 900px){
	.order-header {
    grid: "id tags metadata" / max-content 1fr max-content;
  }
  .order-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
    gap: 10px;
  }
  .order-tags {
    justify-content: center;
  }
}
</style>