<template>
     <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start"></ion-back-button>
        <ion-title>Orders</ion-title>
      <ion-text color="secondary" slot="end">
        <!-- DOWNLOAD ORDERS -->
      </ion-text>  
      </ion-toolbar>
    </ion-header>
    <ion-searchbar/>
    <hr/>
    <div class="order">
      <div class="order-header">
        <div class="oreder-id">
        <ion-item lines="none">
          <ion-label>
            <h1>Order ID</h1>
            <p>Customer Name</p>
          </ion-label>
        </ion-item>
        </div>
        <div class="order-tags">
          <ion-chip>
            <ion-icon/>
            <ion-label>
              Shopify-Id
            </ion-label>
          </ion-chip>
           <ion-chip>
            <ion-icon/>
            <ion-label>
             Customer Loyalty Status
            </ion-label>
          </ion-chip>

        </div>
        <div class="order-metatags">
          <ion-note>Ordered on 7 Jan 2021</ion-note>
          <ion-badge color="primary">Approved</ion-badge>
        </div>

      </div>
      <div class="order-items">
        <ion-card>
          <ion-item>
            <ion-thumbnail>
              <Image/>
            </ion-thumbnail>
            <ion-label>
              <h2>Brand</h2>
              <h1>Virtual Name</h1>
              <p>Color: color</p>
              <p>Size: size</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Promise date
            </ion-label>
            <ion-text slot="end">
              14 Jan 2021
            </ion-text>
          </ion-item>
            <ion-item>
            <ion-label>
              Promise date
            </ion-label>
            <ion-text slot="end">
              14 Jan 2021
            </ion-text>
          </ion-item>
            <ion-item>
            <ion-label>
              Promise date
            </ion-label>
            <ion-text slot="end">
              14 Jan 2021
            </ion-text>
          </ion-item>
        </ion-card>
      </div>
    </div>
    </ion-page>
</template>

<script>
import Image from "../components/Image.vue"
export default {
    name:'Order',
    components:{Image}
}
</script>
<style scoped>
.order-id{
  grid-area: id;
}
.order-tags{
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.order-metadata{
  grid-area: metadata;
  /* max-width: min-content; */
  justify-self: end;
  padding-right: 10px;
}
.order-header{
  display: grid;
  grid:"id tags metadata" / max-content 1fr minmax(min-content, max-content);
   align-items: center;
 
  
}
</style>
