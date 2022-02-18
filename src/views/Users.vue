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
              <ion-label>Shop</ion-label>
              <ion-select>
                <ion-select-option value="f">Product store</ion-select-option>
                <ion-select-option value="f">Product store</ion-select-option>
                <ion-select-option value="f">Product store</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="idCardOutline" slot="start" />
              <ion-label>Role</ion-label>
              <ion-select>
                <ion-select-option value="f">Fulfillment manager</ion-select-option>
                <ion-select-option value="f">Fulfillment manager</ion-select-option>
                <ion-select-option value="f">Fulfillment manager</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="toggleOutline" slot="start" />
              <ion-label>Status</ion-label>
              <ion-select>
                <ion-select-option value="f">Active</ion-select-option>
                <ion-select-option value="f">Active</ion-select-option>
                <ion-select-option value="f">Active</ion-select-option>
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

            <ion-chip outline>
              <ion-label>4 locations</ion-label>
            </ion-chip>

            <ion-item lines="none">
            <ion-select value="f">
              <ion-select-option value="f">Fulfillment manager</ion-select-option>
              <ion-select-option value="f">Fulfillment manager</ion-select-option>
              <ion-select-option value="f">Fulfillment manager</ion-select-option>
            </ion-select>
            </ion-item>

            <ion-button
              fill="clear"
              color="medium"
              @click="openLocationPopover"
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
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSearchbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { ellipsisVerticalOutline, globeOutline, idCardOutline, toggleOutline } from "ionicons/icons";

export default defineComponent({
  name: "Users",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonSearchbar,
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
    --columns-desktop: 5;
}
</style>
