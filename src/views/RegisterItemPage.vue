<template>
    <ion-page>
          <ion-content>
              <ion-grid class="container" v-if="loaded">
                <menu-badge></menu-badge>
                  <ion-row>
                    <ion-col><p class="title">New Item</p></ion-col>
                  </ion-row>
                  <form>
                    <ion-list>
                      <base-input type="text" label="Name" v-model="form.name"></base-input>
                      <base-text-area placeholder="Description" v-model="form.description" col="5" row="15"></base-text-area>
                      <base-select v-model="categories" @input = "selected" :selectedValue="categories[0]"></base-select>
                    <ion-row>
                      <ion-col>
                        <ion-item>
                          <ion-button class="single-button" @click="addItem">Enter</ion-button>
                        </ion-item>
                      </ion-col>
                    </ion-row>
                    </ion-list>
                  </form>
              </ion-grid>
              <loader-spinner v-else></loader-spinner>
          </ion-content>
        </ion-page>
    </template>
    
    <script setup lang="ts">
    import router from '@/router';
    import { onMounted, ref } from 'vue';
    import BaseInput from '../components/BaseInput.vue';
    import MenuBadge from "@/components/MenuBadge.vue";
    import LoaderSpinner from '@/components/LoaderSpinner.vue';
    import BaseSelect from '@/components/BaseSelect.vue';
    import BaseTextArea from '@/components/BaseTextArea.vue';
    import { useActivities } from '@/stores/activities';
    import { useItems } from '@/stores/items';
    import { errorAlert, successAlert } from "../helpers/alerts";
    import {
      IonPage,
      IonContent,
      IonList,
      IonItem,
      IonButton,
      IonGrid,
      IonRow,
      IonCol
      } from "@ionic/vue";

    const categories = ref(<any>[]);
    const loaded = ref(false);


    onMounted(async() => {
      categories.value = await activities.getActivities();
      loaded.value = true;
      // console.log(categories.value[0].name)
    });
    
    const activities = useActivities();
    const items = useItems();

    const selected = (event: any) => {
      form.value.activityId = event.target.value;
    }
  
    const form = ref({
      name: '',
      description: '',
      activityId: '',
      message: ''
    });
    
    const addItem = async() => {
      try {

        if(form.value.name === ''  || form.value.description === '' || form.value.activityId === '') {
          errorAlert(`name, description and activity are required`);
          return;
        }

        const data = await items.addItem(form.value.name, form.value.description, form.value.activityId);
        successAlert( `Item ${data.item.name} created`);
        items.items.push(data.item);
        clearForm();
        router.go(-1);
      } catch (error: any) {
        form.value.message = error;
        throw `Register failed with error ${error}`;
      }
      
    }
    
    const clearForm = () => {
      form.value.name = '';
      form.value.description = '';
    }
    </script>
    
    <style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100vh;
        text-align: center;
      }
    
      .multi-button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 0 1.2em;
      }
      
      .toggle {
        margin: 1em 0;
        width: 6em;
        height: 2.3em;
        align-self: center;
        font-family: "Outfit", sans-serif;
        text-transform: capitalize;
        width: 100%;
        height: 4em;
        margin: 1em 0 0 0;
        font-size: .6em;
        border-radius: 7px;
      }
    
      .toggle:first-child {
        border-radius: 7px 0 0 7px !important;
        margin-right: 0;
        background: rgba(var(--ion-color-primary-rgb), 1);
        color: var(--ion-color-light);
      }
    
      .toggle:last-child {
        border-radius: 0 7px 7px 0 !important;
        margin-left: 0;
        background: rgba(var(--ion-color-primary-rgb), .6);
        color: var(--ion-color-light);
      }
    
      .validation {
        display: inline-block;
        margin: 0 1.2em;
        text-align: left;
        width: 77%;
        color: var(--ion-color-danger);
        font-family: 'Outfit', sans-serif;
        border-top: 1px solid;
        font-size: .6em;
      }
    </style>