<template>
    <ion-row>
        <ion-accordion :toggle-icon="ellipsisVerticalOutline">
        <!-- <ion-item slot="header" color="light">
            <ion-label>First Accordion</ion-label>
        </ion-item> -->
        <ion-item slot="header">
            <p>{{date}}</p>
            <p>{{value}}</p>
        </ion-item>
        <div class="ion-padding action-group" slot="content">
            <button class="action-icon" @click.prevent="$emit('viewItem', id)"><ion-icon size = "large" :icon="eyeOutline"></ion-icon></button>
            <button class="action-icon" @click.prevent="$emit('updateItem', id)"><ion-icon size = "large" :icon="createOutline"></ion-icon></button>
            <button class="action-icon" @click.prevent="$emit('removeItem', id)"><ion-icon size = "large" :icon="trashBinOutline"></ion-icon></button>
        </div>
    </ion-accordion>
    </ion-row>
</template>
<script setup lang="ts">
import { IonRow, IonCol, IonIcon, IonAccordion, IonLabel, IonItem } from '@ionic/vue';
import { ellipsisVerticalOutline, trashBinOutline, createOutline, eyeOutline } from 'ionicons/icons';
import { defineProps, h, ref } from 'vue';

const props = defineProps({
  id: {
    type: [String, Number], 
  },
  date: {
    type: String,
    default: "Date"
  },
  value: {
    type: Number,
    default: 0
  }
});

const actions = () => {
    console.log('actions...');
};
</script>
<style scoped>
ion-row {
  margin: 1em 1em;
  border-bottom: 1px solid;
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

p {
  font-family: 'Outfit', sans-serif;
  text-transform: capitalize;
  font-size: .6em;
  margin: 0 auto;
  line-height: 2.3;
}

ion-icon{
  color: var(--ion-color-dark);
}

.action-group {
    display: flex;
    justify-content: space-around;
}
.action-icon {
    display: inline-block;
}
</style>