<template>
    <ion-row>
    <ion-col>
      <ion-item class="container">
        <select
          v-bind="$attrs"
          class="field field-select"
          @select="$emit('update:modelValue', $event.target.value)"
        >
        <option value="">Select an option...</option>
        <option :value="option.id" v-for="option in modelValue" :key="option.id">{{ option.name }}</option>
        </select>
      </ion-item>
    </ion-col>
  </ion-row>
</template>
<script setup>
import { onMounted } from 'vue';
import { IonRow, IonCol, IonItem, IonIcon } from '@ionic/vue';
onMounted(() => {
  const selectedValue = props.modelValue[0];
});

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Object, Array, String, Number],
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