<template>
  <ion-content class="ion-padding">
    <ion-list>
        <ion-item>Store 1</ion-item>
        <ion-item>Store 2</ion-item>
        <ion-item>Store 3</ion-item>
        <ion-item lines="none">Store 4</ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonItem, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Store-Popover',
  components: { IonContent, IonItem, IonList }
});
</script>