<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-back-button default-href="/" slot="start" />
        <ion-title>{{ $t("Users") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" class="mobile-only">
            <ion-icon slot="icon-only" :icon="filterOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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
              <RolesPopover />
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="toggleOutline" slot="start" />
              <ion-label>{{ $t("Status") }}</ion-label>
              <ion-select value="active">
                <ion-select-option value="active">Active</ion-select-option>
                <ion-select-option value="away">Away</ion-select-option>
                <ion-select-option value="deactivated">Deactivated</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </aside>

        <main>
          <div class="list-item" v-for="user in users" :key="user" >
            <ion-item lines="none" @click="() => router.push('/user')">
              <ion-icon :icon="personCircleOutline" slot="start" />
              <ion-label>
                {{ user.partyTypeId === "PERSON" ? user.firstName : user.groupName}}
                <p>{{user?.userLoginId}}</p>
                <p>{{user.infoString}}</p>
              </ion-label>
            </ion-item>

            <ion-label>
              {{ getDate(user?.createdDate) }}
              <p>{{ $t("created") }}</p>
            </ion-label>

            <ion-chip outline @click="editLocation()">
              <ion-label>4 {{ $t("locations") }}</ion-label>
            </ion-chip>

            <ion-item lines="none" class="desktop-only">
              <RolesPopover />
            </ion-item>

            <div>
              <ion-item lines="none" class="mobile-only">
                <ion-note slot="end">Fulfillment manager</ion-note>
              </ion-item>
              <ion-button fill="clear" color="medium" @click="openUserPopover">
                <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
              </ion-button>
            </div>
          </div>

          <hr />
        </main>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="createUser()">
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
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
  popoverController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  addOutline,
  ellipsisVerticalOutline,
  filterOutline,
  globeOutline,
  idCardOutline,
  personCircleOutline,
  toggleOutline,
} from 'ionicons/icons';
import { mapGetters, useStore } from "vuex";
import moment from 'moment'
import UserPopover from '@/components/UserPopover.vue';
import RolesPopover from '@/components/RolesPopover.vue';
import LocationModal from '@/components/LocationModal.vue';
import CreateUserModal from '@/components/CreateUserModal.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Users',
  components: {
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonFab,
    IonFabButton,
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
    RolesPopover
  },
   computed: {
    ...mapGetters({
      users: 'user/getUsersList'
    })
  },
  methods: {
    getDate(date: any){
      return moment(date).format("D/M/YYYY");
    },
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
        component: LocationModal,
      });
      return editmodal.present();
    },
    async createUser() {
      const createmodal = await modalController.create({
        component: CreateUserModal,
      });
      return createmodal.present();
    },
  },
  mounted(){
    this.store.dispatch('user/getUsersInformation');
    console.log(this.users)
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    return {
      addOutline,
      ellipsisVerticalOutline,
      filterOutline,
      globeOutline,
      idCardOutline,
      personCircleOutline,
      toggleOutline,
      router,
      store
    };
  },
});
</script>

<style scoped>
.list-item {
  --columns-desktop: 5;
}

.list-item > *:last-child {
  display: flex;
  gap: var(--spacer-xs);
}
</style>
