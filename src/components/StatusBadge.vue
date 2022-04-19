<template>
  <ion-badge :color="color(statusDesc) || color('default')">{{ statusDesc }}</ion-badge>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonBadge } from "@ionic/vue"

export default defineComponent({
  name: "StatusBadge",
  components: {
    IonBadge
  },
  props: ["statusDesc"],
  data() {
    return {
      color: (desc: string) => ({
        'Approved': 'primary',
        'Created': 'medium',
        'Held': 'warning',
        'Completed': 'success',
        'Cancelled': 'danger',
        'Unfillable': 'warning',
        'default': 'medium'
      } as any)[desc]
    }
  }
});
</script>
