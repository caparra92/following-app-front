<template>
  <ion-row>
    <ion-col>
      <ion-item class="container">
        <input
          v-bind="$attrs"
          :placeholder="label"
          :value="modelValue"
          class="field"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <ion-icon
          :icon="icon"
          size="large"
        ></ion-icon>
      </ion-item>
    </ion-col>
  </ion-row>
</template>
<script setup>
import { IonRow, IonCol, IonItem, IonIcon } from '@ionic/vue';
import { lockClosedOutline, personCircleOutline } from "ionicons/icons";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  icon: {
    type: String,
    default: personCircleOutline
  }
});
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .8em 1.2em;
}

 .field {
    width: 100%;
    background-color: var(--ion-color-secondary);
    color: var(--ion-color-primary);
    height: 4em;
    border: 1px solid rgba(var(--ion-color-primary-rgb), 1);
    border-radius: 7px 0 0 7px;
    outline: none;
    border-right: none;
    transition: all 0.30s ease-in-out;
  }

  .field:focus {
    box-shadow: 0 0 3px rgba(var(--ion-color-primary-rgb), 1);
    border: 2px solid rgba(var(--ion-color-primary-rgb), 1);
    border-right: none;
  }
  
  .field:focus + ion-icon {
    border-left: none;
  }

  ion-icon {
    color: rgba(var(--ion-color-primary-rgb), 1);
    background: var(--ion-color-secondary);;
    margin: 0;
    padding-right: 8px;
    margin-right: .2em;
    height: 1.93em;
    padding: 0;
    border: 1px solid rgba(var(--ion-color-primary-rgb), 1);
    border-left: none;
    border-radius: 0 7px 7px 0;
    transition: all 0.30s ease-in-out;
  }
</style>
