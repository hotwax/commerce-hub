<template>
  <ion-page>    
    <ion-content :fullscreen="true">
     <main> 
      <figure>
        <img src="../assets/images/hc.png"/>
      </figure>

      <div class="header">
        <nav class="nav-card">
          <a href="">
            <ion-card>
              <img src="../assets/images/PreOrder.svg" />
              <ion-card-header>
                <ion-card-title>Pre Order Management</ion-card-title>
              </ion-card-header>
            </ion-card>
          </a>
          <a href="">
            <ion-card>
              <img src="../assets/images/Threshold.svg" />
              <ion-card-header>
                <ion-card-title>Threshold Management</ion-card-title>
              </ion-card-header>
            </ion-card>
          </a>
          <a href="">
            <ion-card>
              <img src="../assets/images/Transfer.svg" />
              <ion-card-header>
                <ion-card-title>Stock Transfer</ion-card-title>
              </ion-card-header>
            </ion-card>
          </a>
        </nav>

        <section class="pages-card">
          <ion-item button @click="() => router.push('/order')" lines="none" detail>
            <ion-icon :icon="ticketOutline" slot="start" />
            <ion-label>Orders</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/product')" lines="none" detail>
            <ion-icon :icon="shirtOutline" slot="start" />
            <ion-label>Product inventory</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/shipments')" lines="none" detail>
            <ion-icon :icon="sendOutline" slot="start" />
            <ion-label>Shipments</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/purchase-order')" lines="none" detail>
            <ion-icon :icon="calendarOutline" slot="start" />
            <ion-label>Purchase orders</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/settings')" lines="none" detail>
            <ion-icon :icon="settingsOutline" slot="start" />
            <ion-label>Settings</ion-label>
          </ion-item>
        </section>
      </div>

      <section class="scroller">
        <ion-item class="scroller-header" lines="none">
          <ion-label>Stuck orders</ion-label>
            <ion-button slot="end" fill="outline" size="medium">View all</ion-button>
        </ion-item>
  
        <div class="scroller-wrapper" ref="ionCard">
          <div @click="prevItems($event)" class="button-nav-wrapper prev-button-wrapper">
            <ion-icon :icon="chevronBackOutline" />
          </div>
          <div @click="nextItems($event)" class="button-nav-wrapper next-button-wrapper">
            <ion-icon :icon="chevronForwardOutline" />
          </div>
          <div class="scroller-content" ref="scrollItem">
            <div class="scroller-item" v-for="i = 1 in 10" :key="i" >
              <ion-card id="ion-card" class="ion-custom-card">
                <ion-item lines="none">
                  <ion-label>
                    Customer name
                    <p>Order ID</p>
                  </ion-label>
                  <ion-note slot="end">auto cancel delta</ion-note>
                </ion-item>
                <ion-item lines="full">
                  <ion-thumbnail slot="start">
                    <img src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                  </ion-thumbnail>
                  <ion-label>
                    <p>Brand</p>
                    Virtual name
                    <p>Color: color</p>
                    <p>Size: size</p>
                  </ion-label>
                  <ion-note slot="end" color="success">15 in stock</ion-note>
                </ion-item>
                <ion-item>
                  <ion-label>Last brokered</ion-label>
                  <ion-text slot="end">California Warehouse</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Rebrokered</ion-label>
                  <ion-text slot="end">5 times</ion-text>
                </ion-item>
              </ion-card>
            </div>
          </div>
        </div>
      </section>
     </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonCard, IonContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ticketOutline, shirtOutline, sendOutline, calendarOutline, settingsOutline, chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { createAnimation } from '@ionic/vue';
import { ref } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonButton, 
    IonCard, 
    IonContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonNote, 
    IonPage, 
    IonThumbnail
  },
  setup() {
    const router = useRouter();
    const ionCard = ref();
    const scrollItem = ref();
    return {
      router,
      ticketOutline,
      shirtOutline,
      sendOutline,
      calendarOutline,
      settingsOutline,
      chevronBackOutline,
      chevronForwardOutline,
      ionCard,
      scrollItem
    }
  },
   methods: {
    async nextItems(event: any) {
        this.ionCard.scrollLeft += 350;
        const animation = createAnimation()
        .addElement(this.scrollItem)
        .easing('linear')
        .duration(1500)
        .fromTo('transform', 'translate(350px)', 'translate(150px)');
        animation.play();
    },
    async prevItems(event: any) {
      this.ionCard.scrollLeft -= 350;
      const animation = createAnimation()
        .addElement(this.scrollItem)
        .easing('linear')
        .duration(1500)
        .fromTo('transform', 'translate(150px)', 'translate(350px)');
        animation.play();
    },
  }
});
</script>

<style scoped>

figure {
  text-align: center;
}

figure > img {
  width: 386px;
  height: 122px;
}

.header {
  display: grid;
  grid-template-columns: auto 375px;
  align-items: center;
  width: var(--page-width);
  margin: auto;
}

.nav-card {
  display: flex;
}

a {
  text-decoration: none;
  flex-grow: 1;
}

a > ion-card > img {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

ion-card > ion-card-header {
  text-align: center;
}

.pages-card > ion-item {
  border: 1px solid black;
  border-radius: 15px;
}

.scroller > .scroller-header {
  width: var(--page-width);
  margin: auto;
}

.scroller-content {
  display: flex;
}

.scroller-item{
  flex-shrink: 0;
  position: relative;
  transform: translateX(calc(max(var(--page-width), 100vw)/2 - var(--page-width)/2));
  scroll-snap-align: start;
}

.scroller-content > .scroller-item:last-child ion-card{
  margin-right: 40px;
}

.scroller-wrapper {
  position: relative;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

main {
  --page-width: 1024px;
}

.prev-button-wrapper {
  left: 1%;
}

.next-button-wrapper {
  right: 1%;
}

.button-nav-wrapper {
  position: fixed;
  z-index: 1;
  bottom: 28%;
  cursor: pointer;
  background-color: rgba(0,0,0,.2);
  color: white;
  font-size: 24px;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.button-nav-wrapper:hover {
  background: rgba(0,0,0,.36);
}

.scroller-wrapper:hover .button-nav-wrapper {
  opacity: 1;
  transition: opacity .5s linear;
}

.scroller-wrapper::-webkit-scrollbar {
    width: 0; 
    background: transparent;
}

</style>