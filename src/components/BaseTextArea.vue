<template>
    <ion-row>
      <ion-col>
        <ion-item class="container">
          <textarea
            v-bind="$attrs"
            :placeholder="label"
            :value="modelValue"
            :cols="col"
            :rows="row"
            class="field"
            @input="$emit('update:modelValue', $event.target.value)"
          >
          </textarea>
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
    col: {
      type: String,
      default: "10",
    },
    row: {
      type: String,
      default: "5",
    }
  });
  </script>
  <style scoped>
  .container {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  textarea {
    resize: none;
  }
  </style>
  