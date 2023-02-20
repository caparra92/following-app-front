<template>
    <ion-row>
      <ion-col size="auto">
        <button>
          <ion-icon size = "large" :icon="addOutline"></ion-icon>
        </button>
      </ion-col>
      <ion-col>
        <p>{{ activityType }}</p>
      </ion-col>
      <ion-col size="auto">
        <button>
          <ion-icon size = "large" :icon="chevronForwardOutline"></ion-icon>
        </button>
      </ion-col>
    </ion-row>
</template>

<script setup>
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from '@ionic/vue';
import { addOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineProps } from 'vue';


const props = defineProps({
  activityType: {
    type: String,
    default: "Activity type"
  }
});

</script>

<style scoped>

ion-row {
  margin: 1em 1.2em;
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
  font-size: 1.5em;
  margin: 0 auto;
}

ion-icon{
  color: var(--ion-color-dark);
}
</style>