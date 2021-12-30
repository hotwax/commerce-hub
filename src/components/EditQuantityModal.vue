<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon :icon="closeOutline" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ $t("Edit quantity on hand") }}</ion-title>
    </ion-toolbar>
  </ion-header>

 <ion-content>
   <ion-item>
     <ion-label>{{ $t("Current QOH") }}</ion-label>
     <ion-label>200 {{ $t("items") }}</ion-label>
   </ion-item>
   <ion-list>
     <ion-radio-group value="add">
       <ion-list-header>
         <ion-label>{{ $t("Options") }}</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-radio slot="start" value="add"></ion-radio>
          <ion-label>{{ $t("Add") }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-radio slot="start" value="remove"></ion-radio> 
          <ion-label>{{ $t("Remove") }}</ion-label>
        </ion-item>

        <ion-item>
          <ion-radio slot="start" value="overwrite"></ion-radio>  
          <ion-label>{{ $t("Overwrite") }}</ion-label>
        </ion-item>
      </ion-radio-group>
    </ion-list>

    <ion-item>
      <ion-label>{{ $t("QTY") }}</ion-label>
      <ion-input :placeholder="$t('reduce inventory')"></ion-input>
    </ion-item>
    <div>
      <ion-button>{{ $t("Adjust quantity") }}</ion-button>
    </div>
  </ion-content>
</template>

<script>
import { 
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonTitle,
  IonToolbar,
  modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { closeOutline } from "ionicons/icons";

export default defineComponent({
  name: "EditQuantityModal",
  components: { 
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonInput,
    IonRadioGroup,
    IonRadio,
    IonTitle,
    IonToolbar,
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
  },
  setup() {
    return {
      closeOutline
    };
  },
});
</script>