<template>
  <ion-page>    
    <ion-content>
     <main> 
       <Logo />
     
        <nav>
          <section class="external">
            <ion-card href="https://preorder.hotwax.io/login">
              <img src="../assets/images/PreOrder.svg" />
              <ion-card-header>
                <ion-card-title>{{ $t("Pre Order Management") }}</ion-card-title>
              </ion-card-header>
            </ion-card>
            <ion-card href="https://threshold-management.hotwax.io/login">
              <img src="../assets/images/Threshold.svg" />
              <ion-card-header>
                <ion-card-title>{{ $t("Threshold Management") }}</ion-card-title>
              </ion-card-header>
            </ion-card>
            <ion-card href="">
              <img src="../assets/images/Transfer.svg" />
              <ion-card-header>
                <ion-card-title>{{ $t("Stock Transfer") }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </section>

          <section class="internal">
            <ion-item button @click="() => router.push('/find-order')" lines="none" detail>
              <ion-icon :icon="ticketOutline" slot="start" />
              <ion-label>{{ $t("Orders") }}</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/find-product-inventory')" lines="none" detail>
              <ion-icon :icon="shirtOutline" slot="start" />
              <ion-label>{{ $t("Product inventory") }}</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/find-shipment')" lines="none" detail>
              <ion-icon :icon="sendOutline" slot="start" />
              <ion-label>{{ $t("Shipments") }}</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/find-purchase-order')" lines="none" detail>
              <ion-icon :icon="calendarOutline" slot="start" />
              <ion-label>{{ $t("Purchase orders") }}</ion-label>
            </ion-item>
            <ion-item button @click="() => router.push('/settings')" lines="none" detail>
              <ion-icon :icon="settingsOutline" slot="start" />
              <ion-label>{{ $t("Settings") }}</ion-label>
            </ion-item>
          </section>
        </nav>

        <section class="scroller">
          <ion-item class="scroller-header" lines="none">
<<<<<<< HEAD
            <ion-label>Stuck orders</ion-label>
              <ion-button slot="end" fill="outline" size="small" @click.prevent="appliedFiltersUpdated([{value: 'ORDER_APPROVED', filterName: 'status'}, {value: true, filterName: 'unfillable'}])">View all</ion-button>
=======
            <h2>{{ $t("Stuck orders") }}</h2>
              <ion-button slot="end" fill="outline" size="small">{{ $t("View all") }}</ion-button>
>>>>>>> c10acbe1d29f58c4114c2155024cf5e709e2b0b1
          </ion-item>
          <div class="scroller-content">
            <div class="scroller-item" v-for="order in stuckOrders" :key="order" @click.prevent="viewOrder(order)"> 
              <ion-card>
                <ion-item lines="none">
                  <ion-label>
                    {{ order.customerPartyName }}
                    <p>{{ order.orderId }}</p>
                  </ion-label>
                  <ion-note slot="end">{{ getAutoCancelDate(order.autoCancelDate) }}</ion-note>
                </ion-item>
                <ion-item lines="full">
                  <ion-thumbnail slot="start">
                    <Image :src="getProduct(order.productId).mainImageUrl" />
                  </ion-thumbnail>
                  <ion-label>
<<<<<<< HEAD
                    
                    <p>{{ getProduct(order.productId).brandName }}</p>
                    {{ order.productName }}
                    <p>{{ $t("Color") }}: {{ $filters.getFeature(getProduct(order.productId).featureHierarchy, '1/COLOR/') }}</p>
                    <p>{{ $t("Size") }}: {{ $filters.getFeature(getProduct(order.productId).featureHierarchy, '1/SIZE/') }}</p>
                  </ion-label>
                  <ion-note slot="end" color="success">{{getProductStock(order.productId)}} in stock</ion-note>
=======
                    <p>Brand</p>
                    Virtual name
                    <p>{{ $t("Color") }}: color</p>
                    <p>{{ $t("Size") }}: size</p>
                  </ion-label>
                  <ion-note slot="end" color="success">15 {{ $t("in stock") }}</ion-note>
>>>>>>> c10acbe1d29f58c4114c2155024cf5e709e2b0b1
                </ion-item>
                <ion-item>
                  <ion-label>{{ $t("Last brokered") }}</ion-label>
                  <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                  <p slot="end">{{ getStuckOrderChangeFacilityInformation(order.orderId)?.LastBrokeredFacility }}</p>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>Rebrokered</ion-label>
                  <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                  <p  slot="end">{{ getStuckOrderChangeFacilityInformation(order.orderId)?.count }} times</p>
                </ion-item>
              </ion-card>
            </div>   
          </div>
        </section>

        <section class="scroller">
          <ion-item class="scroller-header" lines="none">
            <ion-label>Old expedited orders</ion-label>
              <ion-button slot="end" fill="outline" size="small" @click.prevent="appliedFiltersUpdated([{value: '(NEXT_DAY OR SECOND_DAY)', filterName: 'shippingMethod'}])">View all</ion-button>
          </ion-item>
          <div class="scroller-content">
            <div class="scroller-item" v-for="order in OldExpeditedOrders" :key="order" @click.prevent="viewOrder(order)"> 
              <ion-card>
                <ion-item lines="none">
                  <ion-label>
                    {{ order.customerPartyName }}
                    <p>{{ order.orderId }}</p>
                  </ion-label>
                  <div class="metadata">
                    <ion-note slot="end">order placed date</ion-note>
                    <ion-badge slot="end" color="medium">{{ getAutoCancelDate(order.autoCancelDate) }}</ion-badge>
                  </div>
                  
                  
                </ion-item>
                <ion-item lines="full">
                  <ion-thumbnail slot="start">
                    <Image :src="getProduct(order.productId).mainImageUrl" />
                  </ion-thumbnail>
                  <ion-label>
                    
                    <p>{{ getProduct(order.productId).brandName }}</p>
                    {{ order.productName }}
                    <p>{{ $t("Color") }}: {{ $filters.getFeature(getProduct(order.productId).featureHierarchy, '1/COLOR/') }}</p>
                    <p>{{ $t("Size") }}: {{ $filters.getFeature(getProduct(order.productId).featureHierarchy, '1/SIZE/') }}</p>
                  </ion-label>
                  <ion-note slot="end" color="success">{{getProductStock(order.productId)}} in stock</ion-note>
                </ion-item>
                <ion-item>
                  <ion-label>Last brokered</ion-label>
                  <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                  <p slot="end">{{ getOldExpeditedOrderChangeFacilityInformation(order.orderId)?.LastBrokeredFacility }}</p>
                </ion-item>
                <ion-item>
                  <ion-label>Rebrokered</ion-label>
                  <!-- TODO Replace 'p' tag with 'ion-label' after upgrading Ionic 5 to Ionic 6 -->
                  <p  slot="end">{{ getOldExpeditedOrderChangeFacilityInformation(order.orderId)?.count }} times</p>
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
import { IonButton, IonCard, IonContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonLabel, IonNote, IonPage, IonThumbnail, IonBadge } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ticketOutline, shirtOutline, sendOutline, calendarOutline, settingsOutline } from 'ionicons/icons'
import Logo from '@/components/Logo.vue';
import { mapGetters, useStore } from 'vuex';
import Image from "@/components/Image.vue";
import moment from 'moment'

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
    Logo,
    Image,
    IonBadge
  },
  computed: {
    ...mapGetters({
      OldExpeditedOrders: 'order/getOldExpeditedOrders',
      stuckOrders: 'order/getStuckOrders',
      getProduct: 'product/getProduct',
      getProductStock: 'stock/getProductStock',
      getStuckOrderChangeFacilityInformation: 'order/getStuckOrderChangeFacilityInformation',
      getOldExpeditedOrderChangeFacilityInformation: 'order/getOldExpeditedOrderChangeFacilityInformation'
    })
  },
  methods: {
    getAutoCancelDate(cancelDate: any){
     return moment("03/02/2022", "MM-DD-YYYY").fromNow();
    },
    async viewOrder (order: any) {
      await this.store.dispatch('order/updateCurrent', { order }).then(() => {
        this.$router.push({ path: `/order/${order.orderId}` })
      })
    },
    async appliedFiltersUpdated(filters: any) {
      filters.forEach(async (filter: any) => {
        await this.store.dispatch('order/appliedFiltersUpdated', { value: filter.value, filterName: filter.filterName  })
      })
      await this.store.dispatch('order/updateQuery', {viewSize: process.env.VUE_APP_VIEW_SIZE, viewIndex: 0}).then(async (payload) => {
        this.store.dispatch('order/findOrders', payload);
        this.router.push('/find-order');
      })
    }
  },
  mounted(){
    this.store.dispatch('order/fetchStuckOrders');
    this.store.dispatch('order/fetchOldExpeditedOrders');
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      router,
      ticketOutline,
      shirtOutline,
      sendOutline,
      calendarOutline,
      settingsOutline,
      store
    }
  }
});
</script>

<style scoped>
figure {
  max-width: 375px;
  margin: var(--spacer-xl) auto;
}

.external {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.external > ion-card {
  flex: 1 0 100%;
  max-width: 200px;
  scroll-snap-align: center;
 }

 .metadata {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 4px;
}

.external > ion-card > img {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

ion-card-title {
  font-size: 16px;
  font-weight: bold;
}

.internal {
  margin: var(--spacer-base) 0 0;
}

.internal > ion-item {
  border: var(--border-medium);
  border-radius: 15px;
  margin: var(--spacer-xs) var(--spacer-xs) 0;
}

ion-card > ion-card-header {
  text-align: center;
}

.scroller > .scroller-header {
  width: var(--page-width);
  margin: var(--spacer-xl) auto 0;
}

h2 {
  font-weight: bold;
}

.scroller-content {
  display: flex;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.scroller-item{
  flex-shrink: 0;
  position: relative;
  transform: translateX(calc(max(var(--page-width), 100vw)/2 - var(--page-width)/2));
  scroll-snap-align: center;
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
    margin: unset;
  }

  .scroller > .scroller-header {
    margin-bottom: var(--spacer-sm);
  }

  main {
    --page-width: 1040px;
    margin: unset;
  }
}
</style>