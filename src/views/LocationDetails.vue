<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Location details") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-icon :icon="storefrontOutline" slot="start" />
          <ion-label>
            <p class="overline">Retail</p>
            Store name
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Orders") }}</ion-label>
          <ion-note slot="end">note</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Purchase order ATP") }}</ion-label>
          <ion-note slot="end">note</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("QOH") }}</ion-label>
          <ion-note slot="end">note</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Safety stock") }}</ion-label>
          <ion-note slot="end">note</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("ATP") }}</ion-label>
          <ion-note slot="end">note</ion-note>
        </ion-item>

        <ion-item>
          <ion-label>{{ $t("Threshold") }}</ion-label>
          <ion-label slot="end">25 {{ $t("orders") }}</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-progress-bar value="0.5" />
          <ion-label slot="end">10</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Pick up") }}</ion-label>
          <ion-toggle color="secondary" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Delivery") }}</ion-label>
          <ion-toggle color="secondary" slot="end" />
        </ion-item>
        <ion-item>
          <ion-label>{{ $t("Publish ATP") }}</ion-label>
          <ion-toggle color="secondary" slot="end" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonToggle,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { storefrontOutline } from "ionicons/icons";

export default defineComponent({
  name: "Profile",
  components: {
    IonBackButton,
    IonContent,
    IonHeader,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonNote,
    IonPage,
    IonProgressBar,
    IonToggle,
    IonToolbar,
    IonTitle,
  },
  setup() {
    return {
      storefrontOutline,
    };
  },
});
</script>