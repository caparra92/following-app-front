<template>
    <ion-row>
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

<script setup>
import router from "../router";
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from '@ionic/vue';
import { addOutline, chevronForwardOutline, trashBinOutline } from 'ionicons/icons';
import { defineProps, h, ref } from 'vue';
import { useActivityTypes } from '../stores/activityTypes';
import { useActivities } from '../stores/activities';
import { useHistories } from '../stores/histories';

const activityTypes = useActivityTypes();
const activities = useActivities();
const histories = useHistories();

const props = defineProps({
  id: {
    type: [String, Number], 
  },
  activityType: {
    type: String,
    default: "Activity type"
  },
  view: {
    type: String,
    default: 'View'
  }
});

let data;

const viewItems = async() => {
  switch (props.view) {
    case 'activities':
      data = await activityTypes.getActivitiesById(props.id);
      router.push(`/dashboard/${props.id}/activities`);
      break;
    case 'items':
      data = await activities.getItemsById(props.id);
      router.push(`/activities/${props.id}/items`);
      break;
    case 'histories':
      data = await histories.getHistoriesByItemId(props.id);
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
</style>