<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />  
        <ion-title>{{ $t("Product inventory detail") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear">
            <ion-icon :icon="syncOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <main>  
        <section class="product">
          <div class="product-image desktop-only">
            <ion-card>   
            <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />   
          </ion-card>
        </div>
        <div class="product-info desktop-only">
          <ion-label>Parent product name</ion-label> 
          <ion-card>
            <ion-card-header>
              <ion-card-title>General information</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label>Shopify ID</ion-label>
              <ion-label slot="end">external ID</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Internal ID</ion-label>
              <ion-label slot="end">internal ID</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>In stock</ion-label>
              <ion-label slot="end">QOH</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>On order</ion-label>
              <ion-label slot="end">ordered</ion-label>
            </ion-item>
          </ion-card> 
        </div> 
      </section>   

       <ion-item class="mobile-only" lines="none">
          <ion-thumbnail>
            <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />   
          </ion-thumbnail>
          <ion-label>
            Virtual name
            <p>Shopify ID</p>  
          </ion-label>
          <ion-chip>
            <ion-avatar>
              <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />     
            </ion-avatar>  
          </ion-chip>
        </ion-item>

      <hr />   

      <section class="variant">
        <div class="variant-features">
          <ion-item class="desktop-only" lines="none">
            <ion-icon slot="start" :icon="shirtOutline" />  
            <ion-label>Variant</ion-label>
          </ion-item>
          <ion-list>
            <ion-list-header>Color</ion-list-header>
            <ion-item lines="none">
              <ion-chip>
                <ion-label>All</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-label>Color 1</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-icon :icon="checkmarkOutline" />  
                <ion-label>Color 2</ion-label>
              </ion-chip>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header>Size</ion-list-header>
            <ion-item lines="none">
              <ion-chip>
                <ion-label>All</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-label>Size 1</ion-label>
              </ion-chip>
              <ion-chip>
                <ion-icon :icon="checkmarkOutline" />  
                <ion-label>Size 2</ion-label>
              </ion-chip>
            </ion-item>
          </ion-list>
        </div>
          
        <div class="variant-info desktop-only">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Shopify IDs</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label>SKU</ion-label>
              <ion-label slot="end">SKU</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>UPC</ion-label>
              <ion-label slot="end">order id</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Internal ID</ion-label>
              <ion-label slot="end">internal id</ion-label>
            </ion-item>
          </ion-card> 
        </div>  
      </section>

      <section>
        <ion-item lines="none">
            <ion-icon slot="start" :icon="ticketOutline" />  
            <ion-label>Orders</ion-label>
          </ion-item>  
          <div class="orders">
        <div class="shipping-method">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Shipping method</ion-card-title>
            </ion-card-header>
            <ion-item detail>
              <ion-label>Store pickup</ion-label>
              <ion-note slot="end">orders</ion-note>
            </ion-item>
            <ion-item detail>
              <ion-label>Standard</ion-label>
              <ion-note slot="end">orders</ion-note>
            </ion-item>
            <ion-item detail>
              <ion-label>Expedited</ion-label>
              <ion-note slot="end">orders</ion-note>
            </ion-item>
          </ion-card> 
        </div>

        <div class="open-orders">
          <ion-card>
            <ion-item>
              <ion-label>Open orders</ion-label>
              <ion-label>
                400
                <p>Total</p> 
              </ion-label>   
              <ion-label>
                400
                <p>Without promise date</p>  
              </ion-label> 
             </ion-item>

             <ion-item>
               <ion-label>
                 <p>Pre orders</p>
               </ion-label>
               <ion-label>
                <p>400</p>
               </ion-label>
               <ion-label>
                 <p>400</p>
               </ion-label>
             </ion-item>

             <ion-item>
               <ion-label>
                 <p>Back orders</p>
               </ion-label>
               <ion-label>
                 <p>400</p>
               </ion-label>
               <ion-label>
                 <p>400</p>
               </ion-label>
             </ion-item>

             <ion-item>
               <ion-label>
                 <p>Unfillable</p>
               </ion-label>
               <ion-label>
                 <p>400</p>
               </ion-label>
               <ion-label>
                 <p>400</p>
              </ion-label>
             </ion-item>
          </ion-card>
        </div>
          </div>
      </section>

      <section class="segments">
        <ion-segment scrollable @ionChange="segmentChanged($event)" v-model="segment">
          <ion-segment-button value="locations" layout="icon-start">
            <ion-icon :icon="locationOutline" />  
            <ion-label>Locations</ion-label>
          </ion-segment-button>
          <ion-segment-button value="purchase-orders" layout="icon-start">
            <ion-icon :icon="calendarOutline" />  
            <ion-label>Purchase orders</ion-label>
          </ion-segment-button>
          <ion-segment-button value="fulfillment" layout="icon-start">
            <ion-icon :icon="sendOutline" />  
            <ion-label>Fulfillment</ion-label>
          </ion-segment-button>
          <ion-segment-button value="logs" layout="icon-start">
            <ion-icon :icon="listOutline" />  
            <ion-label>Logs</ion-label>
          </ion-segment-button>
        </ion-segment> 

        <div v-if="segment == 'locations'">
          <ion-searchbar class="mobile-only" />  
          <div class="actions">
            <div class="action-chips">
               <ion-chip>
                   <ion-icon :icon="checkmarkOutline" />
                 <ion-label>All</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Retail</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Warehouses</ion-label>   
                </ion-chip>  
            </div>
            <div class="action-buttons desktop-only">
              <ion-button fill="outline" color="medium">Edit ordered stock</ion-button>
              <ion-button fill="outline" color="medium">Edit qoh</ion-button>
            </div>
          </div>  

          <hr />

          <div class="list-item locations">   
            <ion-item lines="none">
              <ion-icon :icon="globeOutline" slot="start" />
              <ion-label>30 locations</ion-label>
            </ion-item>

            <ion-label>
              600
              <p>orders</p>
            </ion-label>

            <ion-label>
              400
              <p>purchase order ATP</p>
            </ion-label>

            <ion-label>
              400
              <p>QOH</p>
            </ion-label>

            <ion-label>
              400
              <p>safety stock</p>
            </ion-label>

            <ion-label>
              400
              <p>ATP</p>
            </ion-label>

            <ion-checkbox />

            <ion-button fill="clear" color="medium" @click="openLocationPopover">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>

          <hr />

          <div class="list-item locations">   
            <ion-item lines="none">
              <ion-icon :icon="storefrontOutline" slot="start" />
              <ion-label>
                <p>Retail</p>
                Store 1 name
                <p>Pickup and shipping</p> 
              </ion-label>
            </ion-item>

            <ion-label>
              600
              <p>orders</p>
            </ion-label>

            <ion-label>
              400
              <p>purchase order ATP</p>
            </ion-label>

            <ion-label>
              400
              <p>QOH</p>
            </ion-label>

            <ion-label>
              400
              <p>safety stock</p>
            </ion-label>

            <ion-label>
              400
              <p>ATP</p>
            </ion-label>

            <ion-checkbox />

            <ion-button fill="clear" color="medium" @click="openLocationPopover">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>

          <hr />
          
          <div class="list-item locations">   
            <ion-item lines="none">
              <ion-icon :icon="businessOutline" slot="start" />
              <ion-label>
                <p>Warehouse</p>
                Warehouse 1 name
                <p>Shipping</p> 
              </ion-label>
            </ion-item>

            <ion-label>
              600
              <p>orders</p>
            </ion-label>

            <ion-label>
              400
              <p>purchase order ATP</p>
            </ion-label>

            <ion-label>
              400
              <p>QOH</p>
            </ion-label>

            <ion-label>
              400
              <p>safety stock</p>
            </ion-label>

            <ion-label>
              400
              <p>ATP</p>
            </ion-label>

            <ion-checkbox />

            <ion-button fill="clear" color="medium" @click="openLocationPopover">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>
          
          <hr />  
       </div>

       <div v-if="segment == 'purchase-orders'">
         <div class="actions">
            <div class="action-chips">
               <ion-chip>
                   <ion-icon :icon="checkmarkOutline" />
                 <ion-label>All</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Upcoming</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Past date</ion-label>   
                </ion-chip>  
            </div>
            <div class="action-buttons desktop-only">
              <ion-button fill="outline" color="medium" @click="editQuantity()">Edit ordered qty</ion-button>
              <ion-button fill="outline" color="medium">Edit arrival date</ion-button>
            </div>
          </div>  

          <hr /> 

         <div class="list-item purchase-orders">   
           <ion-item lines="none">
             <ion-label>PO ID</ion-label>
           </ion-item>

           <ion-label>
             600
             <p>orders</p>
           </ion-label>

           <ion-label>
             400
             <p>ATP</p>
           </ion-label>

           <ion-label>
             400
             <p>received</p>
           </ion-label>

           <ion-label>
             6th Dec 2021
             <p>arrival date</p>
           </ion-label>

           <ion-checkbox />

           <ion-button fill="clear" color="medium" @click="openPopover">
             <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
           </ion-button>
         </div>     

         <hr />
       </div>

       <div v-if="segment == 'fulfillment'">
         <div class="actions">
            <div class="action-chips">
               <ion-chip>
                 <ion-icon :icon="checkmarkOutline" />   
                 <ion-label>All</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Upcoming</ion-label>   
                </ion-chip> 
                <ion-chip>
                 <ion-label>Past date</ion-label>   
                </ion-chip>  
            </div>
            <div class="action-buttons desktop-only">
              <ion-button fill="outline" color="medium">Edit safety stock</ion-button>
              <ion-button fill="outline" color="medium">Edit threshold</ion-button>
            </div>
          </div>  

          <hr />   
         <div class="list-item fulfillment">   
           <ion-item lines="none">
             <ion-icon :icon="globeOutline" slot="start" />
               <ion-label>2 locations</ion-label>
           </ion-item>

           <ion-label>
             8
             <p>safety stock</p>
           </ion-label>

           <ion-label>
             19 / 20
             <p>threshold consumed</p>
           </ion-label>

           <ion-chip outline>
             <ion-label>93 ATP</ion-label>
             <ion-icon :icon="shareOutline" />
           </ion-chip>

           <ion-label class="tablet">
             <ion-toggle />
             <p>pickup</p>
           </ion-label>

           <ion-label class="tablet">
             <ion-toggle />
             <p>delivery</p>
           </ion-label>

           <ion-checkbox />

           <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
             <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
           </ion-button>
         </div>

         <hr />

         <div class="list-item fulfillment">   
           <ion-item lines="none">
             <ion-icon :icon="storefrontOutline" slot="start" />
             <ion-label>
               <p>Retail</p>  
               Brooklyn
             </ion-label>
           </ion-item>

           <ion-label>
             8
             <p>safety stock</p>
           </ion-label>

           <ion-label>
             19 / 20
             <p>threshold consumed</p>
           </ion-label>

           <ion-chip outline>
             <ion-label>93 ATP</ion-label>
             <ion-icon :icon="shareOutline" />
           </ion-chip>

           <ion-label class="tablet">
             <ion-toggle />
             <p>pickup</p>
           </ion-label>

           <ion-label class="tablet">
             <ion-toggle />
             <p>delivery</p>
           </ion-label>

           <ion-checkbox />

           <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
             <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
           </ion-button>
         </div>

         <hr />

         <div class="list-item fulfillment">   
           <ion-item lines="none">
             <ion-icon :icon="businessOutline" slot="start" />
             <ion-label>
               <p>Warehouse</p>  
               Hoboken
             </ion-label>
           </ion-item>

           <ion-label>
             8
             <p>safety stock</p>
           </ion-label>

           <ion-label>
             19 / 20
             <p>threshold consumed</p>
           </ion-label>

           <ion-chip outline>
             <ion-label>93 ATP</ion-label>
             <ion-icon :icon="shareOutline" />
           </ion-chip>

           <ion-label class="tablet">
             <ion-toggle />
             <p>pickup</p>
           </ion-label>

           <ion-label class="tablet">
             <ion-toggle />
             <p>delivery</p>
           </ion-label>

           <ion-checkbox />

           <ion-button fill="clear" color="medium" @click="openFulfillmentSettings">
             <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
           </ion-button>
         </div>
            <hr />
          </div>

          <div v-if="segment == 'logs'"></div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, modalController, popoverController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkmarkOutline, syncOutline, globeOutline, shirtOutline , locationOutline, calendarOutline, sendOutline, listOutline, ellipsisVerticalOutline, storefrontOutline, businessOutline, ticketOutline, shareOutline} from 'ionicons/icons'
import Image from '@/components/Image.vue'
import EditQuantityModal from '@/components/EditQuantityModal.vue'
import LocationPopover from '@/components/LocationPopover.vue'
import PurchaseOrderPopover from '@/components/PurchaseOrderPopover.vue'
import FulfillmentSettingsPopover from '@/components/FulfillmentSettingsPopover.vue'

export default defineComponent({
  name: 'ProductInventoryDetail',
  components: {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
    Image
  },
  methods: {
        segmentChanged(ev: CustomEvent) {
      this.segment = ev.detail.value;
    },
    async editQuantity() {
      const editmodal = await modalController.create({
        component: EditQuantityModal 
      });
      return editmodal.present();
    },
    async openLocationPopover(ev: Event) {
      const popover = await popoverController.create({
        component: LocationPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: PurchaseOrderPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async openFulfillmentSettings(ev: Event) {
      const popover = await popoverController.create({
        component: FulfillmentSettingsPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    },
  setup() {
    const router = useRouter();
    const segment = ref("locations");

    return {
      router,
      segment,
      syncOutline,
      shirtOutline,
      globeOutline,
      locationOutline,
      calendarOutline,
      sendOutline,
      listOutline,
      ellipsisVerticalOutline,
      storefrontOutline,
      businessOutline,
      checkmarkOutline,
      ticketOutline,
      shareOutline
    }
  }
});
</script>

<style scoped>
.product {
    display: grid;
    grid-template-columns: 254px auto;
    justify-items: start;
    align-items: center;
}

.product-info, .variant-info {
    width: 343px;
}

.variant, .actions {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: space-between;
    align-items: center;
}

.segments {
    height: 400px;
}

ion-segment {
    justify-content: start;
}

.purchase-orders {
   --columns-desktop: 7;
}

.spacer {
    margin: 0 auto;
}

@media (min-width: 991px) {
    .orders {
    display: grid;
    grid-template-columns: 343px 570px;
}
}
</style>