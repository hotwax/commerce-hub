<template>
  <ion-content class="ion-padding">
    <ion-list>
        <ion-radio-group value="rd" >
        <ion-item >
          <ion-label>Store 1</ion-label>
          <ion-radio value="store 1" slot="start"></ion-radio>
        </ion-item>
        <ion-item >
          <ion-label>Store 2</ion-label>
          <ion-radio value="store 2" slot="start"></ion-radio>
        </ion-item>
        <ion-item >
          <ion-label>Store 3</ion-label>
          <ion-radio value="store 3" slot="start"></ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonList, IonRadioGroup, IonItem, IonLabel, IonRadio } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Store-Popover',
  components: { IonContent, IonItem, IonList, IonRadioGroup, IonLabel, IonRadio }
});
</script>