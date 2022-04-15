<template>
  <ion-list>
    <ion-list-header><h3>{{ $t("Catalog") }}</h3></ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Categories") }}</ion-label>
      <ion-select :value="appliedFilters.category" @ionChange.prevent="updateFilters($event['detail'].value, 'category')" interface="popover">
        <ion-select-option v-for="category in categories" :key="category" :value="category.productCategoryId">{{ category.categoryName }}</ion-select-option>
      </ion-select>
    </ion-item>

    <!-- TODO: handle the functionality to filter the product based on child categories -->
    <!-- <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Child categories") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card> -->

    <ion-item>
      <ion-label>{{ $t("Size") }}</ion-label>
      <ion-select :value="appliedFilters.size" @ionChange.prevent="updateFilters($event['detail'].value, 'size')" interface="popover">
        <ion-select-option v-for="size in sizes" :key="size" :value="size.productFeatureId">{{ size.description }}</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Color") }}</ion-label>
      <ion-select :value="appliedFilters.color" @ionChange.prevent="updateFilters($event['detail'].value, 'color')" interface="popover">
        <ion-select-option v-for="color in colors" :key="color" :value="color.productFeatureId">{{ color.description }}</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Tags") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip @click="updateFilters(tag, 'tags')" v-for="tag in tags" :key="tag" :outline="!appliedFilters.tags.includes(tag)">
          <ion-label>{{ tag }}</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card>
  </ion-list>

  <ion-list>
    <ion-list-header><h3>{{ $t("Order") }}</h3></ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Pre-order") }}</ion-label>
      <ion-checkbox v-model="appliedFilters.preOrder" @ionChange="updateFilters($event['detail'].checked, 'preOrder')" />
    </ion-item>
    <ion-item>
      <ion-label>{{ $t("Back-order") }}</ion-label>
      <ion-checkbox v-model="appliedFilters.backOrder" @ionChange="updateFilters($event['detail'].checked, 'backOrder')" />
    </ion-item>

    <!-- TODO: handle functionality to filter products on the basis of PO ids -->
    <!-- <ion-card>
      <ion-card-header>
        <ion-card-title>{{ $t("Purchase orders") }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-chip>
          <ion-label>PO #1</ion-label>
        </ion-chip>
        <ion-chip>
          <ion-label>PO #2</ion-label>
        </ion-chip>
      </ion-card-content>
    </ion-card> -->
  </ion-list>

  <!-- TODO: handle the functionality to filter products on the basis of product store and facility -->
  <ion-list>
    <ion-list-header><h3>{{ $t("Location") }}</h3></ion-list-header>
    <ion-item>
      <ion-label>{{ $t("Product Store") }}</ion-label>
      <ion-select :value="currentProductStore ? currentProductStore : 'any'" interface="popover" @ionChange="currentProductStore = $event['detail'].value; updateFilters($event['detail'].value, 'productStore')">
        <ion-select-option :value="store.productStoreId" v-for="store in productStores.concat({'productStoreId': 'any', 'storeName': 'any'})" :key="store.productStoreId">{{ store.storeName }}</ion-select-option>
      </ion-select>
    </ion-item>
    <!-- <ion-item>
      <ion-label>{{ $t("Facility") }}</ion-label>
      <ion-select value="any" interface="popover">
        <ion-select-option value="any">California Warehouse</ion-select-option>
      </ion-select>
    </ion-item> -->
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
import emitter from '@/event-bus';

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
      productStores: 'util/getProductStores'
    })
  },
  data() {
    return {
      currentProductStore: (this as any).appliedFilters?.productStore
    }
  },
  props: ["categories", "colors", "sizes", "tags"],
  methods: {
    async updateFilters(value: string, filterName: string) {
      await this.store.dispatch('product/updateProductFilters', { value, filterName })
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