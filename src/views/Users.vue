<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ $t("Users") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="find">
        <section class="search">
          <ion-searchbar :placeholder="$t('Search users')" />
        </section>

        <aside class="filters">
          <ion-list>
            <ion-item lines="none">
              <ion-icon :icon="globeOutline" slot="start" />
              <ion-label>{{ $t("Shop") }}</ion-label>
              <ion-select value="a">
                <ion-select-option value="a">Product store</ion-select-option>
                <ion-select-option value="b">Product store</ion-select-option>
                <ion-select-option value="c">Product store</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="idCardOutline" slot="start" />
              <ion-label>{{ $t("Role") }}</ion-label>
              <ion-select value="fulfillment">
                <ion-select-option value="fulfillment">Fulfillment manager</ion-select-option>
                <ion-select-option value="merchendiser">Merchendiser</ion-select-option>
                <ion-select-option value="administrator">Administrator</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="toggleOutline" slot="start" />
              <ion-label>{{ $t("Status") }}</ion-label>
              <ion-select value="active">
                <ion-select-option value="active">Active</ion-select-option>
                <ion-select-option value="away">Away</ion-select-option>
                <ion-select-option value="dnd">Do Not Disturb</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </aside>

        <main>
          <div class="list-item">
            <ion-item lines="none">
              <ion-icon :icon="globeOutline" slot="start" />
              <ion-label>
                Fullname
                <p>username</p>
                <p>email</p>
              </ion-label>
            </ion-item>

            <ion-label class="tablet">
              14 Jan 2021
              <p>{{ $t("created") }}</p>
            </ion-label>

            <ion-chip outline @click="editLocation()">
              <ion-label>4 {{ $t("locations") }}</ion-label>
            </ion-chip>

            <ion-item lines="none" class="desktop-only">
            <ion-select value="fulfillment">
              <ion-select-option value="fulfillment">Fulfillment manager</ion-select-option>
              <ion-select-option value="merchendiser">Merchendiser</ion-select-option>
              <ion-select-option value="administrator">Administrator</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none" class="mobile-only">
              <ion-note slot="end">Fulfillment manager</ion-note>
            </ion-item>

            <ion-button
              fill="clear"
              color="medium"
              @click="openUserPopover"
            >
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>

          <hr />
        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonTitle,
  modalController,
  popoverController
} from "@ionic/vue";
import { defineComponent } from "vue";
import { ellipsisVerticalOutline, globeOutline, idCardOutline, toggleOutline } from "ionicons/icons";
import UserPopover from '@/components/UserPopover.vue';
import LocationModal from '@/components/LocationModal.vue';

export default defineComponent({
  name: "Users",
  components: {
    IonButton,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonPage,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonTitle,
  },
  methods: {
    async openUserPopover(ev: Event) {
      const popover = await popoverController.create({
        component: UserPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async editLocation() {
      const editmodal = await modalController.create({
        component: LocationModal
      });
      return editmodal.present();
    },
  },
  setup() {
    return {
      ellipsisVerticalOutline,
      globeOutline,
      idCardOutline,
      toggleOutline
    }
   }  
 })
</script>

<style scoped>

.list-item {
    --columns-mobile: 3;
    --columns-desktop: 6;
}
</style>
