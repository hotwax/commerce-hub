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
      <ion-item lines="none">
        <ion-button size="medium" @click="openApp('http://localhost:8103/')">Preorder</ion-button>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
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
     token: 'user/getUserToken'
    })
  },
  methods:{
    openApp(url: any){
      console.log(this.token);
      window.location.href = url+`?token=${this.token}`;
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