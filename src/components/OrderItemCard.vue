<template>
  <ion-card>
    <ion-item>
      <ion-thumbnail slot="start">
        <Image />
      </ion-thumbnail>
      <ion-label>
        <p>{{ item.brandName }}</p>
        <h1>{{ item.itemName }}</h1>
        <p>{{ $t("Color") }} : {{ item.standardFeatures.COLOR.description }}</p>
        <p>{{ $t("Size") }}: {{ item.standardFeatures.SIZE.description }}</p>
      </ion-label>
      <ion-note slot="end" color="success">
        {{ item.statusId }}
      </ion-note>
    </ion-item>
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