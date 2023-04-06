<template>
  <ion-row v-if="accordion">
    <ion-accordion :toggle-icon="ellipsisVerticalOutline" ref="ionAcc">
        <!-- <ion-item slot="header" color="light">
            <ion-label>First Accordion</ion-label>
        </ion-item> -->
        <ion-item slot="header">
          <p>{{ activityType }}</p>
        </ion-item>
        <div class="ion-padding action-group" slot="content">
            <button class="action-icon" @click="viewItems"><ion-icon size = "large" :icon="eyeOutline"></ion-icon></button>
            <button class="action-icon" @click="viewStats()"><ion-icon size = "large" :icon="statsChartOutline"></ion-icon></button>
            <button class="action-icon" @click.prevent="$emit('removeItem', id)"><ion-icon size = "large" :icon="trashBinOutline"></ion-icon></button>
        </div>
    </ion-accordion>
  </ion-row>
  <ion-row v-else>
    <ion-col size="auto">
      <button @click.prevent="$emit('removeItem', id)">
        <ion-icon size = "large" :icon="trashBinOutline"></ion-icon>
      </button>
    </ion-col>
    <ion-col>
      <p>{{ activityType }}</p>
    </ion-col>
    <ion-col size="auto">
      <button @click="viewItems">
        <ion-icon size = "large" :icon="chevronForwardOutline"></ion-icon>
      </button>
    </ion-col>
  </ion-row>
</template>

<script setup lang="ts">
import router from "../router";
import { IonRow, IonCol, IonIcon, IonAccordion, IonItem } from '@ionic/vue';
import { chevronForwardOutline, trashBinOutline,  ellipsisVerticalOutline, statsChartOutline, eyeOutline} from 'ionicons/icons';
import { defineProps, ref, onMounted } from 'vue';
import { useActivityTypes } from '../stores/activityTypes';
import { useActivities } from '../stores/activities';

const activityTypes = useActivityTypes();
const activities = useActivities();
const ionAcc = ref(null);
let data;

// onMounted(() => {
  
// });

const props = defineProps({
  id: {
    type: [String, Number],
    default: '1'
  },
  activityType: {
    type: String,
    default: "Activity type"
  },
  view: {
    type: String,
    default: 'View'
  },
  accordion: {
    type: Boolean,
    default: false
  }
});

const viewStats = () => {
  router.push(`/items/${props.id}/stats`);
}

const viewItems = async() => {
  switch (props.view) {
    case 'activities':
      data = await activityTypes.getActivitiesById(<string>props.id);
      router.push(`/dashboard/${props.id}/activities`);
      break;
    case 'items':
      data = await activities.getItemsById(<string>props.id);
      router.push(`/activities/${props.id}/items`);
      break;
    case 'histories':
      //data = await histories.getHistoriesByItemId(props.id);
      router.push(`/items/${props.id}/histories`);
      break;
    default:
      break;
  }
  
}

</script>

<style scoped>

ion-row {
  margin: 1em 1em;
}

ion-col button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--ion-color-light);
  width: 44px;
  height: 44px;
  border-radius: 5px;
}

ion-col p {
  font-family: 'Outfit', sans-serif;
  text-transform: capitalize;
  font-size: .6em;
  margin: 0 auto;
  line-height: 2.3;
}

ion-icon{
  color: var(--ion-color-dark);
}

div button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 44px;
  height: 44px;
  border-radius: 5px;
}

.action-group {
    display: flex;
    justify-content: space-around;
}
.action-icon {
    display: inline-block;
}
</style>