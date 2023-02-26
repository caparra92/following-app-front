<template>
  <ion-row>
    <ion-col>
      <ion-item>
        <input
          v-bind="$attrs"
          :placeholder="label"
          :value="modelValue"
          class="field"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </ion-item>
    </ion-col>
  </ion-row>
</template>
<script setup>
import { IonRow, IonCol, IonItem } from '@ionic/vue';

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>
<style scoped>
 .field {
    width: 100%;
    background-color: var(--ion-color-secondary);
    color: var(--ion-color-primary);
    height: 4em;
    border-radius: 7px;
    outline: none;
    margin: .8em 1.2em;
    transition: all 0.30s ease-in-out;
  }
  
  .field:focus {
    box-shadow: 0 0 3px rgba(var(--ion-color-primary-rgb), 1);
    border: 2px solid rgba(var(--ion-color-primary-rgb), 1);
  }
</style>
