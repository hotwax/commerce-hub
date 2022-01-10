<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <figure>
          <img src="../assets/images/hc.png" />
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
            <ion-item
              button
              @click="() => router.push('/find-order')"
              lines="none"
              detail
            >
              <ion-icon :icon="ticketOutline" slot="start" />
              <ion-label>Orders</ion-label>
            </ion-item>
            <ion-item
              button
              @click="() => router.push('/find-product-inventory')"
              lines="none"
              detail
            >
              <ion-icon :icon="shirtOutline" slot="start" />
              <ion-label>Product inventory</ion-label>
            </ion-item>
            <ion-item
              button
              @click="() => router.push('/shipments')"
              lines="none"
              detail
            >
              <ion-icon :icon="sendOutline" slot="start" />
              <ion-label>Shipments</ion-label>
            </ion-item>
            <ion-item
              button
              @click="() => router.push('/find-purchase-order')"
              lines="none"
              detail
            >
              <ion-icon :icon="calendarOutline" slot="start" />
              <ion-label>Purchase orders</ion-label>
            </ion-item>
            <ion-item
              button
              @click="() => router.push('/settings')"
              lines="none"
              detail
            >
              <ion-icon :icon="settingsOutline" slot="start" />
              <ion-label>Settings</ion-label>
            </ion-item>
          </section>
        </div>

        <section class="scroller">
          <ion-item class="scroller-header" lines="none">
            <ion-label>Stuck orders</ion-label>
            <ion-button slot="end" fill="outline" size="medium"
              >View all</ion-button
            >
          </ion-item>

          <ion-fab vertical="center" horizontal="start">
            <ion-fab-button color="medium" @click="scrollLeft()">
              <ion-icon :icon="chevronBack" />
            </ion-fab-button>
          </ion-fab>
          <ion-fab vertical="center" horizontal="end">
            <ion-fab-button color="medium" @click="scrollRight()">
              <ion-icon :icon="chevronForward" />
            </ion-fab-button>
          </ion-fab>

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
                    <img
                      src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137"
                    />
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
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonText,
  IonThumbnail,
  createAnimation,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  chevronBack,
  checkmark,
  chevronForward,
  ticketOutline,
  shirtOutline,
  sendOutline,
  calendarOutline,
  settingsOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "Home",
  components: {
    IonButton,
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonText,
    IonThumbnail,
  },
  methods: {
    scrollLeft() {
      const content = document.querySelector(".scroller-content");
      content.scrollLeft -= 500;
    },
    scrollRight() {
      const content = document.querySelector(".scroller-content");
      content.scrollLeft += 500;
      const animation = createAnimation()
        .addElement(document.querySelector(".scroller-content"))
        .duration(2000)
        .fromTo(
          "transform",
          "translate(calc(max(var(--page-width), 100vw) / 2))"
        );
      animation.play();
    },
  },
  setup() {
    const router = useRouter();

    return {
      router,
      chevronForward,
      chevronBack,
      ticketOutline,
      shirtOutline,
      sendOutline,
      calendarOutline,
      settingsOutline,
      checkmark,
    };
  },
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
  overflow-x: scroll;
}

.scroller-item {
  flex-shrink: 0;
  position: relative;
  transform: translateX(
    calc(max(var(--page-width), 100vw) / 2 - var(--page-width) / 2)
  );
  cursor: pointer;
}

.scroller-content > .scroller-item:last-child ion-card {
  margin-right: 40px;
}

main {
  --page-width: 1024px;
}

ion-fab {
  top: 70%;
}
</style>
