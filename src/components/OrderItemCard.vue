<template>
  <ion-card>
    <ion-item>
      <ion-thumbnail slot="start">
        <Image />
      </ion-thumbnail>
      <ion-label>
        <!-- Here we need to add brandName which is not available in the api-->
        <p>{{ item.brandName }}</p>
        {{ item.productName }}

        <!-- These two functionalities are not available in api -->
        <!-- <p>{{ $t("Color") }} : {{ item.standardFeatures.COLOR.description }}</p> -->
        <!-- <p>{{ $t("Size") }}: {{ item.standardFeatures.SIZE.description }}</p> -->
      </ion-label>
      <ion-note slot="end" color="success">
        {{ item.orderItemStatusId }}
      </ion-note>
    </ion-item>

    <div v-if="(preOrder && backOrder && notFillable)">
      <ion-item>
        <ion-label> {{ $t("Promise date") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">14 Jan 2021</p>
      </ion-item>
      <ion-item>
        <ion-label> {{ $t("PO arrival date") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">14 Jan 2021</p>
      </ion-item>
      <ion-item>
        <ion-label> {{ $t("Last brokered") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">California Warehouse</p>
      </ion-item>
    </div>

    <div v-else>
      <ion-item>
        <ion-label> {{ $t("Shipping method") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">{{item.shipmentMethodTypeId}}</p>
      </ion-item>
      <ion-item>
        <ion-label> {{ $t("Shipping from") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">{{item.facilityName}}</p>
      </ion-item>
      <ion-item>
        <ion-label> {{ $t("Location inventory") }} </ion-label>
        <!-- This property was not available in api -->
        <p slot="end">15</p>
      </ion-item>
    </div>

  </ion-card>
</template>

<script>
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
import { IonCard, IonItem, IonLabel, IonNote, IonThumbnail } from "@ionic/vue";
export default defineComponent({
  name: "OpenItemCard",
  components: {
    Image,
    IonCard,
    IonItem,
    IonLabel,
    IonNote,
    IonThumbnail,
  },
  props: ['item'],

  setup() {
    return {};
  },
});
</script>