<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Locations") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="mobile-only" @click="openLocationFilterMenu()">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-menu content-id="content" type="overlay" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ $t('Filters') }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <LocationFilters :facilityTypes="facilityTypes" :eComStores="eComStores" />
      </ion-content>
    </ion-menu>

    <ion-content id="content">
      <div class="find">
        <section class="search">
          <ion-searchbar @ionFocus="selectSearchBarText($event)" :placeholder="$t('Search locations')" v-model="queryString" @keyup.enter="getFacilities()" />
        </section>

        <aside class="filters">
          <LocationFilters :facilityTypes="facilityTypes" :eComStores="eComStores" />
        </aside>

        <main>
          <div class="list-item" v-for="(facility, index) in facilities" :key="index">
            <ion-item lines="none">
              <ion-icon :icon="storefrontOutline" slot="start" />
              <ion-label>
                <p class="overline">{{ facility.facilityTypeId }}</p>
                {{ facility.facilityName }}
              </ion-label>
            </ion-item>

            <ion-label class="tablet">
              {{ facility.shopifyId ? facility.shopifyId : '-' }}
              <p>{{ $t("Shopify") }}</p>
            </ion-label>

            <ion-label class="tablet">
              {{ facility.netsuiteId ? facility.netsuiteId : '-' }}
              <p>{{ $t("Netsuite") }}</p>
            </ion-label>

            <ion-label class="tablet">
              {{ facility.address1 }}{{ facility.address2 }}
              <p>{{ facility.city }} {{ facility.stateGeoCode }}, {{ facility.postalCode }}</p>
            </ion-label>

            <ion-button fill="clear" color="medium" @click="openFacilityPopover">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </div>

          <hr />
          <ion-infinite-scroll @ionInfinite="loadMoreFacilities($event)" threshold="100px" :disabled="!isScrollable">
            <ion-infinite-scroll-content loading-spinner="crescent" :loading-text="$t('Loading')"/>
          </ion-infinite-scroll>
        </main>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button><ion-icon :icon="storefrontOutline" /></ion-fab-button>
          <ion-fab-button><ion-icon :icon="businessOutline" /></ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonMenu,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonTitle,
  popoverController,
  menuController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  addOutline,
  businessOutline,
  ellipsisVerticalOutline,
  filterOutline,
  storefrontOutline,
} from 'ionicons/icons';
import FacilityPopover from '@/components/FacilityPopover.vue';
import { mapGetters, useStore } from 'vuex';
import { UtilService } from '@/services/UtilService'
import { hasError, showToast } from '@/utils';
import { translate } from '@/i18n';
import LocationFilters from '@/components/LocationFilters.vue'
import emitter from '@/event-bus';

export default defineComponent({
  name: 'Locations',
  components: {
    IonBackButton,  
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonItem,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonLabel,
    IonMenu,
    IonPage,
    IonSearchbar,
    IonToolbar,
    IonTitle,
    LocationFilters
  },
  data() {
    return {
      queryString: "",
      facilityTypes: [{ description: 'All', facilityTypeId: 'All'}],
      eComStores: [{ productStoreId: 'All', storeName: 'All' }]
    }
  },
  computed: {
    ...mapGetters({
      currentFacility: 'user/getCurrentFacility',
      facilities: 'util/getFacilityLocations',
      isScrollable: 'util/isScrollable'
    })
  },
  created() {
    emitter.on('filtersUpdated', this.getFacilities)
  },
  methods: {
    async openLocationFilterMenu() {
      await menuController.open();
    },
    loadMoreFacilities(eve: any) {
      this.getFacilities(
        undefined,
        Math.ceil(this.facilities.length / process.env.VUE_APP_VIEW_SIZE).toString()
      ).then(() => {
        eve.target.complete();
      })
    },
    selectSearchBarText(event: any) {
      event.target.getInputElement().then((element: any) => {
        element.select();
      })
    },
    async openFacilityPopover(ev: Event) {
      const popover = await popoverController.create({
        component: FacilityPopover,
        event: ev,
        translucent: true,
        showBackdrop: false,
      });
      return popover.present();
    },
    async getFacilities(vSize?: any, vIndex?: any) {
      const viewSize = vSize ? vSize : process.env.VUE_APP_VIEW_SIZE;
      const viewIndex = vIndex ? vIndex : '0';

      const payload = {
        "inputFields": {
          "facilityId_value": `%${this.queryString}%`,
          "facilityId_op": "like",
          "facilityId_ic": "Y",
          "facilityId_grp": "1",
          "facilityName_value": `%${this.queryString}%`,
          "facilityName_op": "like",
          "facilityName_ic": "Y",
          "facilityName_grp": "2",
        } as any,
        "fieldList": [],
        viewSize,
        viewIndex,
        "entityName": "ProductStoreFacilityDetail",
        "noConditionFind": "Y",
        "distinct": "Y"
      }

      this.store.dispatch('util/getFacilities', payload);
    },
    async fetchFacilityTypes() {
      let resp;
      try{
        const payload = {
          "inputFields": {
            "parentTypeId": "VIRTUAL_FACILITY",
            "parentTypeId_op": "notEqual",
            "facilityTypeId": "VIRTUAL_FACILITY",
            "facilityTypeId_op": "notEqual",
          },
          "fieldList": ["description", "facilityTypeId"],
          "viewSize": 100,
          "entityName": "FacilityType",
          "noConditionFind": "Y",
          "distinct": "Y"
        }

        resp = await UtilService.fetchFacilityTypes(payload);
        if(resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
          this.facilityTypes = this.facilityTypes.concat(resp.data.docs);
        }
      } catch(error) {
        console.error(error);
        showToast(translate("Something went wrong"));
      }
    },
    async fetchEcomStores() {
      let resp;

      try{
        const payload = {
          "viewSize": 100,
          "fieldList": ["productStoreId", "storeName"],
          "entityName": "ProductStore",
          "distinct": "Y",
          "noConditionFind": "Y"
        }

        resp = await UtilService.fetchEcomStores(payload);
        if(resp.status === 200 && resp.data.docs?.length && resp.data.docs?.length > 0 && !hasError(resp)) {
          this.eComStores = this.eComStores.concat(resp.data.docs);
        }
      } catch(error) {
        console.error(error);
        showToast(translate("Something went wrong"));
      }
    }
  },
  mounted() {
    this.getFacilities()
    .then(() => {
      this.fetchFacilityTypes();
      this.fetchEcomStores();
    })
  },
  setup() {
    const store = useStore();

    return {
      addOutline,
      businessOutline,
      ellipsisVerticalOutline,
      filterOutline,
      store,
      storefrontOutline
    };
  },
});
</script>

<style scoped>
.list-item {
  --columns-desktop: 5;
}
</style>
