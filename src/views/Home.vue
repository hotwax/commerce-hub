<template>
  <ion-page>    
    <ion-content :fullscreen="true">
     <main> 
      <figure>
        <img src="../assets/images/hc.png"/>
      </figure>

      <div class="header">
        <nav class="nav-card">
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

        <section class="pages-card">
          <ion-item button @click="() => router.push('/order')" lines="none" detail>
            <ion-icon :icon="ticketOutline" slot="start" />
            <ion-label>Orders</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/product')" lines="none" detail>
            <ion-icon :icon="shirtOutline" slot="start" />
            <ion-label>Product inventory</ion-label>
          </ion-item>
          <ion-item button lines="none" detail>
            <ion-icon :icon="sendOutline" slot="start" />
            <ion-label>Shipments</ion-label>
          </ion-item>
          <ion-item button lines="none" detail>
            <ion-icon :icon="calendarOutline" slot="start" />
            <ion-label>Purchase orders</ion-label>
          </ion-item>
          <ion-item button @click="() => router.push('/settings')" lines="none" detail>
            <ion-icon :icon="settingsOutline" slot="start" />
            <ion-label>Settings</ion-label>
          </ion-item>
        </section>
      </div>

      <section>
        <ion-item lines="none">
          <ion-label>Stuck orders</ion-label>
            <ion-button slot="end" fill="outline" size="medium">View all</ion-button>
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

      <section>
        <ion-item lines="none">
          <ion-label>Old expedited orders</ion-label>
          <ion-button slot="end" fill="outline" size="medium">View all</ion-button>
        </ion-item>
        <div class="product-card">
          <ion-card>
            <ion-item lines="none">
              <ion-label>
                Customer name
                <p>Order ID</p>
              </ion-label>
              <div class="metadata">
                <ion-note slot="end">order placed date</ion-note>
                <ion-badge color="medium">2 days ago</ion-badge>
              </div>
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
              <div class="metadata">
                <ion-note slot="end">order placed date</ion-note>
                <ion-badge color="medium">2 days ago</ion-badge>
              </div>
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
              <div class="metadata">
                <ion-note slot="end">order placed date</ion-note>
                <ion-badge color="medium">2 days ago</ion-badge>
              </div>
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
              <div class="metadata">
                <ion-note slot="end">order placed date</ion-note>
                <ion-badge color="medium">2 days ago</ion-badge>
              </div>
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

      <section>
        <ion-item lines="none">
          <ion-label>Pre-order ending</ion-label>
          <ion-button slot="end" fill="outline" size="medium">View all</ion-button>
        </ion-item>
        <div class="preorder product-card">
          <ion-card>
            <div class="product-image">
              <img src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
            </div>
            <div class="product-detail">
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>Brand</p>
                    Virtual name
                  </ion-label>
                  <ion-badge slot="end" color="medium">2 days left</ion-badge>
                </ion-item>

                <ion-item>
                  <ion-chip><ion-label>Black | XS</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | S</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | M</ion-label></ion-chip>
                </ion-item>

                <ion-item>
                  <ion-label>Last PO</ion-label>
                  <ion-text slot="end">PO ID</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Last arrival date</ion-label>
                  <ion-text slot="end">1 Jan 2021</ion-text>
                </ion-item>
              </ion-list>
            </div>
          </ion-card>
          <ion-card>
            <div class="product-image">
              <img src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
            </div>
            <div class="product-detail">
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>Brand</p>
                    Virtual name
                  </ion-label>
                  <ion-badge slot="end" color="medium">2 days left</ion-badge>
                </ion-item>

                <ion-item>
                  <ion-chip><ion-label>Black | XS</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | S</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | M</ion-label></ion-chip>
                </ion-item>

                <ion-item>
                  <ion-label>Last PO</ion-label>
                  <ion-text slot="end">PO ID</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Last arrival date</ion-label>
                  <ion-text slot="end">1 Jan 2021</ion-text>
                </ion-item>
              </ion-list>
            </div>
          </ion-card>
          <ion-card>
            <div class="product-image">
              <img src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
            </div>
            <div class="product-detail">
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>Brand</p>
                    Virtual name
                  </ion-label>
                  <ion-badge slot="end" color="medium">2 days left</ion-badge>
                </ion-item>

                <ion-item>
                  <ion-chip><ion-label>Black | XS</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | S</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | M</ion-label></ion-chip>
                </ion-item>

                <ion-item>
                  <ion-label>Last PO</ion-label>
                  <ion-text slot="end">PO ID</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Last arrival date</ion-label>
                  <ion-text slot="end">1 Jan 2021</ion-text>
                </ion-item>
              </ion-list>
            </div>
          </ion-card>
          <ion-card>
            <div class="product-image">
              <img src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
            </div>
            <div class="product-detail">
              <ion-list>
                <ion-item>
                  <ion-label>
                    <p>Brand</p>
                    Virtual name
                  </ion-label>
                  <ion-badge slot="end" color="medium">2 days left</ion-badge>
                </ion-item>

                <ion-item>
                  <ion-chip><ion-label>Black | XS</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | S</ion-label></ion-chip>
                  <ion-chip><ion-label>Black | M</ion-label></ion-chip>
                </ion-item>

                <ion-item>
                  <ion-label>Last PO</ion-label>
                  <ion-text slot="end">PO ID</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Last arrival date</ion-label>
                  <ion-text slot="end">1 Jan 2021</ion-text>
                </ion-item>
              </ion-list>
            </div>
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
main {
  margin: 0 40px;
}

figure {
  text-align: center;
}

figure > img {
  width: 386px;
  height: 122px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-card {
  display: flex;
}

ion-card > ion-card-header {
  text-align: center;
}

.pages-card > ion-item {
  width: 500px;
  border: 1px solid black;
  border-radius: 15px;
}

.product-card {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
}

.product-card > ion-card {
  flex-shrink: 0;
}

.product-image {
  align-self: center;
}

.preorder ion-card {
  display: grid;
  grid-template-columns: 50px auto;
}

.metadata {
  text-align: end;
}

.metadata > ion-note {
  display: block;
}
</style>