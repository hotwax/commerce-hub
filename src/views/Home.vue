<template>
  <ion-page>    
    <ion-content :fullscreen="true">
     <main> 
       <Logo />
     
        <nav>
          <section class="external">
            <ion-card href="https://preorder.hotwax.io/login">
              <img src="../assets/images/PreOrder.svg" />
              <ion-card-header>
                <ion-card-title>Pre Order Management</ion-card-title>
              </ion-card-header>
            </ion-card>
            <ion-card href="https://threshold-management.hotwax.io/login">
              <img src="../assets/images/Threshold.svg" />
              <ion-card-header>
                <ion-card-title>Threshold Management</ion-card-title>
              </ion-card-header>
            </ion-card>
            <ion-card href="">
              <img src="../assets/images/Transfer.svg" />
              <ion-card-header>
                <ion-card-title>Stock Transfer</ion-card-title>
              </ion-card-header>
            </ion-card>
          </section>

          <section class="internal">
            <ion-item button @click="() => router.push('/find-order')" lines="none" detail>
              <ion-icon :icon="ticketOutline" slot="start" />
              <ion-label>Orders</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/find-product-inventory')" lines="none" detail>
              <ion-icon :icon="shirtOutline" slot="start" />
              <ion-label>Product inventory</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/shipments')" lines="none" detail>
              <ion-icon :icon="sendOutline" slot="start" />
              <ion-label>Shipments</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/find-purchase-order')" lines="none" detail>
              <ion-icon :icon="calendarOutline" slot="start" />
              <ion-label>Purchase orders</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/settings')" lines="none" detail>
              <ion-icon :icon="settingsOutline" slot="start" />
              <ion-label>Settings</ion-label>
            </ion-item>
          </section>
        </nav>

        <section class="scroller">
          <ion-item class="scroller-header" lines="none">
            <ion-label>Stuck orders</ion-label>
              <ion-button slot="end" fill="outline" size="small">View all</ion-button>
          </ion-item>
    
          <div class="scroller-content">
            <div class="scroller-item" v-for="i = 1 in 10" :key="i">  
                <ion-card>
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
                    <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                    <p slot="end">California Warehouse</p>
                  </ion-item>
                  <ion-item>
                    <ion-label>Rebrokered</ion-label>
                    <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                    <p  slot="end">5 times</p>
                  </ion-item>
                </ion-card>
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
import { ticketOutline, shirtOutline, sendOutline, calendarOutline, settingsOutline } from 'ionicons/icons'
import Logo from '@/components/Logo.vue';

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
    IonThumbnail,
    Logo
  },
  setup() {
    const router = useRouter();

    return {
      router,
      ticketOutline,
      shirtOutline,
      sendOutline,
      calendarOutline,
      settingsOutline
    }
  }
});
</script>

<style scoped>
  figure {
    max-width: 375px;
    margin: auto;
  }

.external {
  display: flex;
  overflow-x: scroll;
}

.external > ion-card {
  flex: 1 0 100%;
  max-width: 200px;
 }

 .external > ion-card > img {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

 .internal {
   margin: var(--spacer-sm) var( --spacer-xs) 0 var( --spacer-xs);
 }

.internal > ion-item {
  border: 1px solid var(--ion-color-medium);
  border-radius: 15px;
  margin-bottom: var(--spacer-xs);
}

ion-card > ion-card-header {
  text-align: center;
}

.scroller > .scroller-header {
  width: var(--page-width);
  margin: auto;
}

.scroller-content {
  display: flex;
  overflow-x: scroll;
}

.scroller-item{
  flex-shrink: 0;
  position: relative;
  transform: translateX(calc(max(var(--page-width), 100vw)/2 - var(--page-width)/2));
}

.scroller-content > .scroller-item:last-child ion-card{
  margin-right: var(--spacer-xl);
}

@media (min-width: 991px) {
  nav {
    display: grid;
    grid-template-columns: auto 375px;
    width: var(--page-width);
    margin: auto;
  }

  .external {
    overflow-x: unset;
  }

  .internal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: unset;
 }

 .internal > ion-item {
   margin-bottom: unset;
}

  main {
    --page-width: 1040px;
  }
}
</style>
