<template>
    <ion-page>
       <ion-content>
           <ion-grid class="container">
               <menu-badge></menu-badge>
               <ion-row>
                   <ion-col>
                       <ion-avatar>
                           <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                       </ion-avatar>
                   </ion-col>
               </ion-row>
               <ion-row>
                   <ion-col>
                       <p>Camilo</p>
                       <p>Parra</p>
                   </ion-col>
               </ion-row>
               <ion-row>
                   <ion-col>
                       <div v-for="category in categories" :key="category.id">
                           <category-badge :activityType="category.name" :id="category.id" @remove-item="removeItem"/>
                       </div>
                   </ion-col>
               </ion-row>
               <ion-row>
                   <ion-col class="add-button-col">
                       <add-button @click.prevent="addItem"></add-button>
                   </ion-col>
               </ion-row>
           </ion-grid>
       </ion-content>
    </ion-page>
   </template>
   
   <script setup lang="ts">
   import router from "../router";
   import { useRoute } from 'vue-router';
   import { IonAvatar, IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
   import CategoryBadge from '../components/CategoryBadge.vue';
   import AddButton from '../components/AddButton.vue';
   import MenuBadge from "@/components/MenuBadge.vue";
   import { useHistories } from "@/stores/histories";
   import { onMounted, ref } from 'vue';
   import { deleteAlert, successAlert } from "../helpers/alerts";
   
   const categories = ref(<any>[]);
   const handlerMessage = ref('');
   const histories = useHistories();
   let data: any;
   
   onMounted(async()=> {
       const route = useRoute();
       const id = <string>route.params.id;
       await histories.getHistoriesByItemId(id);
       categories.value = histories.getHistories;
   });
   
   const addItem = () => {
       router.push('/histories/new');
   }
   
   const removeItem = async (id: string) => {
       try {
           await deleteAlert(handlerMessage, histories);
           if(handlerMessage.value == 'confirm') {
               data = await histories.removeHistory(id);
               await successAlert(data.message); 
           }    
       } catch (error) {
           throw `Error during removing with ${error}`;
       }
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
   
   ion-avatar {
       align-self: center;
       margin: 0 auto;
   }
   
   ion-col p {
       font-size: 30px;
       margin: 0;
   }
   
   ion-col p:first-child {
       color: var(--ion-color-primary);
       font-weight: 600;
       margin-top: 30px;
   }
   
   ion-col p:last-child {
       color: var(--ion-color-medium);
       font-weight: 400;
       line-height: 1;
       margin-bottom: 30px;
   }
   
   ion-col button {
       background: none;
   }
   
   ion-icon {
       margin-top: 30px;
   }
   
   </style>