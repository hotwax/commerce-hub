<template>
  <ion-page>    
    <ion-content :fullscreen="true">
     <main> 
      <figure class="logo">
        <img src="../assets/images/hc.png"/>
      </figure>

      <div class="header">
        <nav>
          <ion-card>
            <img src="../assets/images/PreOrder.svg" />
            <ion-card-header>
            <ion-card-title>Pre Order Management</ion-card-title>
          </ion-card-header>
          </ion-card>
          <ion-card>
            <img src="../assets/images/Threshold.svg" />
            <ion-card-header>
            <ion-card-title>Threshold Management</ion-card-title>
          </ion-card-header>
          </ion-card>
          <ion-card>
            <img src="../assets/images/Transfer.svg" />
            <ion-card-header>
            <ion-card-title>Stock Transfer</ion-card-title>
          </ion-card-header>
          </ion-card>
        </nav>

        <section>
          <ion-item @click="() => router.push('/order')" detail>
            <ion-icon :icon="ticketOutline" slot="start" />
            <ion-label>Orders</ion-label>
          </ion-item>
          <ion-item @click="() => router.push('/product')" detail>
            <ion-icon :icon="shirtOutline" slot="start" />
            <ion-label>Product inventory</ion-label>
          </ion-item>
          <ion-item detail>
            <ion-icon :icon="sendOutline" slot="start" />
            <ion-label>Shipments</ion-label>
          </ion-item>
          <ion-item detail>
            <ion-icon :icon="calendarOutline" slot="start" />
            <ion-label>Purchase orders</ion-label>
          </ion-item>
          <ion-item detail>
            <ion-icon :icon="settingsOutline" slot="start" />
            <ion-label>Settings</ion-label>
          </ion-item>
        </section>
      </div>

      <section>
        <ion-item lines="none">
          <ion-label>Stuck orders</ion-label>
            <ion-button slot="end">View all</ion-button>
        </ion-item>
        <div class="product-card">
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
              <ion-text slot="end">California Warehouse</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Rebrokered</ion-label>
              <ion-text slot="end">5 times</ion-text>
            </ion-item>
          </ion-card>
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
              <ion-text slot="end">California Warehouse</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Rebrokered</ion-label>
              <ion-text slot="end">5 times</ion-text>
            </ion-item>
          </ion-card>
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
              <ion-text slot="end">California Warehouse</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Rebrokered</ion-label>
              <ion-text slot="end">5 times</ion-text>
            </ion-item>
          </ion-card>
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
              <ion-text slot="end">California Warehouse</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Rebrokered</ion-label>
              <ion-text slot="end">5 times</ion-text>
            </ion-item>
          </ion-card>
        </div>  
      </section>
     </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonItem, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ticketOutline, shirtOutline, sendOutline, calendarOutline, settingsOutline } from 'ionicons/icons'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonItem,
    IonPage
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

img {
  width: 386px;
  height: 122px;
}
</style>