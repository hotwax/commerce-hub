<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/" />
        <ion-title>{{ $t("Purchase order detail") }}</ion-title>
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
              <h1>External Purchase Order ID</h1>
              <ion-badge slot="end">{{ status }}</ion-badge>
              <ion-select :value="status" @ionChange="changeStatus($event)" slot="end">
                <ion-select-option value="Approved">Approved</ion-select-option>
                <ion-select-option value="Completed">Completed</ion-select-option>
                <ion-select-option value="Shipped">Shipped</ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <div class="timeline">
            <ion-item lines="none" detail>
              <ion-icon slot="start" :icon="timeOutline" class="mobile-only" />
              <h2>{{ $t("Timeline") }}</h2>
              <ion-note slot="end">1:07pm 6th Dec 2021</ion-note>
            </ion-item>
            
            <ion-list class="desktop-only">
              <ion-item v-for="item in 3" :key="item">
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
                <ion-card-title>Facility name</ion-card-title>
              </ion-card-header>
              <ion-item lines="none">
                <ion-icon :icon="locationOutline" slot="start" />
                <ion-label>
                  Address1
                  <p>Address2</p>
                  <p>City, Zipcode</p>
                  <p>State, Country</p>
                </ion-label>
              </ion-item>
            </ion-card>
          
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("Allocations") }}</ion-card-title>
              </ion-card-header>
              <ion-item>
                <ion-label>{{ $t("All orders") }}</ion-label>
                <ion-button color="dark" fill="outline">
                  40 {{ $t("orders") }}
                  <ion-icon slot="end" :icon="downloadOutline" />
                </ion-button>
              </ion-item>
              <ion-item>
                <ion-label>{{ $t("Pre orders") }}</ion-label>
                <ion-button color="dark" fill="outline">
                  30 {{ $t("orders") }}
                  <ion-icon slot="end" :icon="downloadOutline" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-label>{{ $t("Back orders") }}</ion-label>
                <ion-button color="dark" fill="outline">
                  10 {{ $t("orders") }}
                  <ion-icon slot="end" :icon="downloadOutline" />
                </ion-button>
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
              {{ $t("Add item to order") }}
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
                  <ion-label>
                    <p class="overline">Brand</p>
                    Parent product
                  </ion-label>
                </ion-item>

                <ion-chip outline class="tablet">
                  <ion-label>External ID</ion-label>
                </ion-chip>

                <ion-label class="tablet">
                  600
                  <p>{{ $t("ordered") }}</p>
                </ion-label>

                <ion-label>
                  400
                  <p>{{ $t("ATP") }}</p>
                </ion-label>

                <ion-label class="tablet">
                  400
                  <p>{{ $t("received") }}</p>
                </ion-label>

                <div></div>

                <ion-checkbox />

                <ion-button fill="clear" color="medium" @click="openProductPopover">
                  <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
                </ion-button>
              </div>

              <ion-list class="desktop-only">
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

                  <ion-chip outline>
                    <ion-label>External ID</ion-label>
                  </ion-chip>

                  <ion-label>
                    600
                    <p>{{ $t("ordered") }}</p>
                  </ion-label>

                  <ion-label>
                    400
                    <p>{{ $t("ATP") }}</p>
                  </ion-label>

                  <ion-label>
                    400
                    <p>{{ $t("received") }}</p>
                  </ion-label>

                  <ion-label>
                    6th Dec 2021
                    <p>{{ $t("arrival date") }}</p>
                  </ion-label>

                  <ion-checkbox />

                  <ion-button fill="clear" color="medium" @click="openProductPopover">
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

                  <ion-chip outline>
                    <ion-label>External ID</ion-label>
                  </ion-chip>

                  <ion-label>
                    600
                    <p>{{ $t("ordered") }}</p>
                  </ion-label>

                  <ion-label>
                    400
                    <p>{{ $t("ATP") }}</p>
                  </ion-label>

                  <ion-label>
                    400
                    <p>{{ $t("received") }}</p>
                  </ion-label>

                  <ion-label>
                    6th Dec 2021
                    <p>{{ $t("arrival date") }}</p>
                  </ion-label>

                  <ion-checkbox />

                  <ion-button fill="clear" color="medium" @click="openProductPopover">
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
  downloadOutline,
  ellipsisVerticalOutline,
  informationCircleOutline,
  locationOutline,
  shirtOutline,
  syncOutline,
  ticketOutline,
  timeOutline
} from 'ionicons/icons';
import Image from '@/components/Image.vue';
import ProductPopover from '@/components/ProductPopover.vue';

export default defineComponent({
  name: 'PurchaseOrder',
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
      status: "Approved" // default value
    }
  },
  methods: {
    changeStatus (ev: any) {
      this.status = ev['detail'].value
    },
    async openProductPopover(ev: Event) {
      const popover = await popoverController.create({
        component: ProductPopover,
        event: ev,
        showBackdrop: false,
        translucent: true,
      });
      return popover.present();
    },
  },
  setup() {
    return {
      addOutline,
      addCircleOutline,
      businessOutline,
      downloadOutline,
      ellipsisVerticalOutline,
      informationCircleOutline,
      locationOutline,
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

@media (min-width: 991px) {
  .product {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacer-lg);
    align-items: start;
  }
}
</style>
