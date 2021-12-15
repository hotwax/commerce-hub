<template>
  <div class="order-detail">
    <div class="order-header">
      <div class="order-id">
        <ion-item lines="none">
          <ion-label>
            <h1>{{ order.orderId }}</h1>
            <p>{{ order.customerName }}</p>
          </ion-label>
        </ion-item>
      </div>
      <div class="order-tags">
        <ion-chip>
          <ion-icon :icon="pricetag" />
					<!-- NOTE :- Here should be Shopify Id which was not available in API -->
          <ion-label>{{ order.customerId }}</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-icon :icon="pricetag" />
          <ion-label>Customer Loyalty Status</ion-label>
        </ion-chip>
      </div>
      <div class="order-metatags">
        <ion-note class="metatags">{{ $t('Ordered on') }} {{ order.orderDate ? $filters.formatDate(order.orderDate, undefined, "DD-MM-YYYY") : '-' }}</ion-note>
        <div class="tags">
          <ion-badge color="primary" slot="end">{{ order.statusId }}</ion-badge>
        </div>
      </div>
    </div>
    <div class="order-items">
      <OpenItemCard v-for="item in order.items" :key="item.itemId" :item="item" />
    </div>
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
import { pricetag } from "ionicons/icons";

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
    return { pricetag };
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
  .order-detail {
    grid-area: details;
  }

}

</style>