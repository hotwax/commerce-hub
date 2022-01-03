<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Blank") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-item lines="none">
        <ion-button size="medium" @click="() => router.push('/order')">Orders</ion-button>
      </ion-item>
      <ion-item lines="none">  
        <ion-button size="medium" @click="() => router.push('/product')">Product inventory</ion-button>
      </ion-item>
      <ion-buttons>
        <ion-button @click="pinnedPage">Pinned page 1</ion-button>
        <ion-button>Pinned page 2</ion-button>
      </ion-buttons>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { mapGetters} from 'vuex';
import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar
  },
  computed: {
    ...mapGetters({
     pinnedPages: 'user/getPinnedPages'
    })
  },
  methods:{
    pinnedPage(){
    this.$router.push(this.pinnedPages[0]);
    }
  },
  setup() {
    const router = useRouter();
    return {
      router
    }
  }
});
</script>