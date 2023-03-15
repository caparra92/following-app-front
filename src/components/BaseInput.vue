<template>
  <ion-row>
    <ion-col>
      <ion-item class="container">
        <input
          v-bind="$attrs"
          :placeholder="label"
          :value="modelValue"
          class="field"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </ion-item>
    </ion-col>
  </ion-row>
</template>
<script setup lang="ts">
import { IonRow, IonCol, IonItem, IonIcon } from '@ionic/vue';

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  }
});
</script>
<style scoped>
.container {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
