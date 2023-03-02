<template>
    <ion-page>
          <ion-content>
              <ion-grid class="container">
                <menu-badge></menu-badge>
                  <ion-row>
                    <ion-col><p class="title">New Item</p></ion-col>
                  </ion-row>
                  <form>
                    <ion-list>
                      <base-input type="text" label="Name" v-model="form.name"></base-input>
                      <base-text-area placeholder="Description" v-model="form.description" col="5" row="15"></base-text-area>
                      <base-select v-model="categories[0]" @input = "selected"></base-select>
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
          </ion-content>
        </ion-page>
    </template>
    
    <script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import BaseInput from '../components/BaseInput.vue';
    import MenuBadge from "@/components/MenuBadge.vue";
    import BaseSelect from '@/components/BaseSelect.vue';
    import BaseTextArea from '@/components/BaseTextArea.vue';
    import { useActivities } from '@/stores/activities';
    import { useItems } from '@/stores/items';
    import {
      IonPage,
      IonContent,
      IonList,
      IonItem,
      IonButton,
      IonGrid,
      IonRow,
      IonCol,
      alertController
    } from "@ionic/vue";

    const categories = ref(<any>[]);


    onMounted(async() => {
      const data = await activities.getActivities();
      categories.value.push(data);
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

    const successAlert = async (message: string) => {
      const alert = await alertController.create({
        header: "Success",
        message: message,
        buttons: ["Ok"],
      });
    
      await alert.present();
    };
    
    const addItem = async() => {
      try {
        const data = await items.addItem(form.value.name, form.value.description, form.value.activityId);
        successAlert( `Item ${data.item.name} created`);
        clearForm();
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