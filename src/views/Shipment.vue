<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>{{ $t("Shipment detail") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="desktop-only">{{ $t("Receive") }}</ion-button>
          <ion-button fill="clear">
            <ion-icon :icon="syncOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <section class="header">
          <div class="id">
            <ion-item lines="none">
              <ion-icon slot="start" :icon="ticketOutline" />
              <h1>External Shipment ID</h1>
              <ion-badge slot="end">{{ status }}</ion-badge>
              <ion-select :value="status" @ionChange="changeStatus($event)" slot="end">
                <ion-select-option value="Approved">Approved</ion-select-option>
                <ion-select-option value="Completed">Completed</ion-select-option>
                <ion-select-option value="Shipped">Shipped</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-chip outline>
                <ion-icon :icon="openOutline" />
                <ion-label>{{ $t("PO") }}: PO External ID</ion-label>
              </ion-chip>
            </ion-item>
          </div>

          <div class="timeline">
            <ion-item lines="none" class="desktop-only">
              <h2>{{ $t("Timeline") }}</h2>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>
            <ion-item lines="none" @click="() => router.push('/timeline')" detail class="mobile-only">
              <ion-icon slot="start" :icon="timeOutline" />
              <h2>{{ $t("Timeline") }}</h2>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>
          
            <ion-list class="desktop-only">
              <ion-item  v-for="item in 3" :key="item">
                <ion-icon slot="start" :icon="ticketOutline" />
                <ion-label>
                  <p class="overline">+ 10 minutes</p>
                  Imported from ERP
                </ion-label>
                <ion-icon :icon="informationCircleOutline" />
              </ion-item>
            </ion-list>
          </div>

          <div class="info">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Ship from Facility name") }}</ion-card-title>
              </ion-card-header>
              <ion-item lines="none">
                <ion-icon :icon="locationOutline" slot="start" />
                <ion-label class="ion-text-wrap">
                  Address1
                  <p>Address2</p>
                  <p>City, Zipcode</p>
                  <p>State, Country</p>
                </ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-icon :icon=" calendarOutline" slot="start" />
                <ion-label class="ion-text-wrap">12th December 2021</ion-label>
                <ion-badge slot="end" color="success">Shipped</ion-badge>
              </ion-item>
            </ion-card>
      
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Ship to Facility name") }}</ion-card-title>
              </ion-card-header>
              <ion-item lines="none"> 
                <ion-icon :icon="locationOutline" slot="start" />
                <ion-label class="ion-text-wrap">
                  Address1
                  <p>Address2</p>
                  <p>City, Zipcode</p>
                  <p>State, Country</p>
                </ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-icon :icon=" calendarOutline" slot="start" />
                <ion-label class="ion-text-wrap">14th December 2021</ion-label>
                <ion-badge slot="end" color="medium">ETA</ion-badge>
              </ion-item>
            </ion-card>
          </div>
        </section>

        <section class="products">       
          <ion-item lines="none">
            <ion-icon slot="start" :icon="shirtOutline" />
            <h1>{{ $t("Products") }}</h1>

            <ion-button slot="end" fill="outline" color="medium" class="desktop-only">
              <ion-icon :icon="addOutline" slot="start" />
              {{ $t("Add item to shipment") }}
            </ion-button>
            <ion-button slot="end" fill="clear" class="mobile-only">
              {{ $t("Add") }}
              <ion-icon :icon="addCircleOutline" slot="end"/>
            </ion-button>
          </ion-item>                 

          <div class="product">
            <div class="product-image desktop-only">
              <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137"/>
            </div>

            <div>
              <hr />

              <div class="list-item">
                <ion-item lines="none">
                  <ion-thumbnail slot="start" class="mobile-only">
                    <Image src="https://cdn.shopify.com/s/files/1/0069/7384/9727/products/test-track.jpg?v=1626255137" />
                  </ion-thumbnail>
                  <ion-label class="ion-text-wrap">
                    <p class="overline">Brand</p>
                    Parent product
                  </ion-label>
                </ion-item>

                <ion-label class="mobile">
                  600
                  <p>{{ $t("shipped") }}</p>
                </ion-label>

                <ion-label class="mobile">
                  200
                  <p>{{ $t("received") }}</p>
                </ion-label>

                <ion-checkbox />

                <ion-button fill="clear" color="medium" @click="openShippedPopover">
                  <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
                </ion-button>
              </div>

              <ion-list>
                <ion-list-header>
                  {{ $t("Items") }}
                  <hr />
                </ion-list-header>

                <div class="list-item">
                  <ion-item lines="none">
                    <ion-label>
                      SKU
                      <p>{{ $t("Color") }}: Color</p>
                      <p>{{ $t("Size") }}: Size</p>
                    </ion-label>
                  </ion-item>

                  <ion-chip class="mobile" outline>
                    <ion-icon :icon="sendOutline" />
                    <ion-label>300</ion-label>
                  </ion-chip>

                  <ion-chip class="mobile" outline>
                    <ion-icon :icon="checkmarkDoneOutline" />
                    <ion-label>200</ion-label>
                  </ion-chip>

                  <ion-checkbox />

                  <ion-button fill="clear" color="medium" @click="openShippedPopover">
                    <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline"/>
                  </ion-button>
                </div>

                <hr />

                <div class="list-item">
                  <ion-item lines="none">
                    <ion-label>
                      SKU
                      <p>{{ $t("Color") }}: Color</p>
                      <p>{{ $t("Size") }}: Size</p>
                    </ion-label>
                  </ion-item>

                  <ion-chip class="mobile" outline>
                    <ion-icon :icon="sendOutline" />
                    <ion-label>300</ion-label>
                  </ion-chip>

                  <ion-item class="mobile" lines="none">
                    <ion-icon :icon="timeOutline" />
                  </ion-item>

                  <ion-checkbox />

                  <ion-button fill="clear" color="medium" @click="openShippedPopover">
                    <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline"/>
                  </ion-button>
                </div>
              </ion-list>

              <hr />
            </div>
          </div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  popoverController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  addOutline,
  addCircleOutline,
  businessOutline,
  calendarOutline,
  checkmarkDoneOutline,
  downloadOutline,
  ellipsisVerticalOutline,
  informationCircleOutline,
  locationOutline,
  openOutline,
  sendOutline,
  shirtOutline,
  syncOutline,
  ticketOutline,
  timeOutline
} from 'ionicons/icons';
import Image from '@/components/Image.vue';
import EditShippedQuantityPopover from '@/components/EditShippedQuantityPopover.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Shipment',
  components: {
    IonBackButton,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    Image
  },
  data() {
    return {
      status: "Shipped" // default value
    }
  },
  methods: {
    changeStatus (ev: any) {
      this.status = ev['detail'].value
    },
    async openShippedPopover(ev: Event) {
      const popover = await popoverController.create({
        component: EditShippedQuantityPopover,
        event: ev,
        showBackdrop: false,
        translucent: true,
      });
      return popover.present();
    },
  },
  setup() {
    const router = useRouter();

    return {
      addOutline,
      addCircleOutline,
      businessOutline,
      checkmarkDoneOutline,
      calendarOutline,
      downloadOutline,
      ellipsisVerticalOutline,
      informationCircleOutline,
      locationOutline,
      openOutline,
      router,
      sendOutline,
      shirtOutline,
      syncOutline,
      ticketOutline,
      timeOutline
    }
  }
});
</script>

<style scoped>
/* To hide selected text which appear after selecting any option*/
ion-select::part(text) {
  display: none;
}
/* To remove margin between badge and ion-select */
ion-select {
  margin-inline-start: 0;
}

.list-item {
  --columns-mobile: 4;
  --columns-desktop: 5;
}

.mobile {
  display: unset;
}

@media (min-width: 991px) {
  .product {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacer-lg);
    align-items: start;
  }
}
</style>