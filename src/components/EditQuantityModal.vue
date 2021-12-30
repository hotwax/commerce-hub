<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon :icon="closeOutline" />
        </ion-button>
      </ion-buttons>
      <ion-title>Edit quantity on hand</ion-title>
    </ion-toolbar>
  </ion-header>

 <ion-content>
   <ion-item>
     <ion-label>Current QOH</ion-label>
     <ion-label>200 items</ion-label>
   </ion-item>
   <ion-list>
     <ion-radio-group value="add">
       <ion-list-header>
         <ion-label>Options</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-radio slot="start" value="add"></ion-radio>
          <ion-label>Add</ion-label>
        </ion-item>

        <ion-item>
          <ion-radio slot="start" value="remove"></ion-radio> 
          <ion-label>Remove</ion-label>
        </ion-item>

        <ion-item>
          <ion-radio slot="start" value="overwrite"></ion-radio>  
          <ion-label>Overwrite</ion-label>
        </ion-item>
      </ion-radio-group>
    </ion-list>

    <ion-item>
      <ion-label>QTY</ion-label>
      <ion-input placeholder="reduce inventory"></ion-input>
    </ion-item>
    <div>
      <ion-button>Adjust quantity</ion-button>
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

<style scoped>

</style>