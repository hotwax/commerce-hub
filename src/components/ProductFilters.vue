<template>
  <ion-list>
    <ion-list-header>{{ $t("Catalog") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Categories") }}</ion-label>
      <ion-select :value="appliedFilters.productCategoryId" @ionChange.prevent="updateFilters($event['detail'].value, 'productCategoryId')" interface="popover">
        <ion-select-option v-for="category in categories" :key="category" :value="category.productCategoryId">{{ category.categoryName }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>

    <ion-item>
      <ion-label>{{ $t("Size") }}</ion-label>
      <ion-select value="any" interface="popover">
        <ion-select-option value="any">all</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Color") }}</ion-label>
      <ion-select value="any" interface="popover">
        <ion-select-option value="any">all</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>
  </ion-list>

  <ion-list>
    <ion-list-header>{{ $t("Order") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("order created") }}</ion-label>
      <ion-checkbox />
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("order created") }}</ion-label>
      <ion-checkbox />
    </ion-item>

    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Purchase date") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>
  </ion-list>

  <ion-list>
    <ion-list-header>{{ $t("Location") }}</ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Product Store") }}</ion-label>
      <ion-select value="any" interface="popover">
        <ion-select-option value="any">Australia</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Facility") }}</ion-label>
      <ion-select value="any" interface="popover">
        <ion-select-option value="any">California Warehouse</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import { close } from "ionicons/icons";
import { mapGetters, useStore } from 'vuex';

export default defineComponent({
  name: 'ProductFilters',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
  },
  computed: {
    ...mapGetters({
      appliedFilters: 'product/getcurrentProductFilters',
      categories: 'product/getCategories'
    })
  },
  methods: {
    async updateFilters(value: string, filterName: string) {
      await this.store.dispatch('product/updateProductFilters', { value, filterName }).then(() => {
        console.log("filter changed");
      })
    }
  },
  setup() {
    const store = useStore();

    return {
      close,
      store
    }
  }
})
</script>