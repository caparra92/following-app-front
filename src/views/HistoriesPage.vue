<template>
    <ion-page>
       <ion-content>
           <ion-grid class="container" v-if="loaded">
               <menu-badge></menu-badge>
               <avatar-badge></avatar-badge>
                <div v-bind="containerProps">
                    <ion-accordion-group v-bind="wrapperProps">
                        <div
                            v-for="{ index, data } in list"
                            :key="index"
                        >
                        <history-badge :date="data.date" :value="data.value" :id="data.id" @remove-item="removeItem"></history-badge>
                        </div>
                    </ion-accordion-group>
                </div>
                <ion-infinite-scroll @ionInfinite="ionInfinite">
                    <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
               <ion-row>
                   <ion-col class="add-button-col add-button">
                       <add-button @click.prevent="addItem"></add-button>
                   </ion-col>
               </ion-row>
           </ion-grid>
           <loader-spinner v-else></loader-spinner>
       </ion-content>
    </ion-page>
   </template>
   
   <script setup lang="ts">
   import router from "../router";
   import { useRoute } from 'vue-router';
   import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonAccordionGroup, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue';
   import { useVirtualList } from '@vueuse/core';
   import HistoryBadge from '../components/HistoryBadge.vue';
   import AddButton from '../components/AddButton.vue';
   import MenuBadge from "@/components/MenuBadge.vue";
   import LoaderSpinner from '@/components/LoaderSpinner.vue';
   import AvatarBadge from '@/components/AvatarBadge.vue';
   import { useHistories } from "@/stores/histories";
   import { onMounted, ref } from 'vue';
   import { deleteAlert, successAlert } from "../helpers/alerts";
   
   const categories = ref(<any>[]);
   const loaded = ref(false);
   const { list, containerProps, wrapperProps } = useVirtualList(categories, {
    itemHeight: 99
   });
   const handlerMessage = ref('');
   const histories = useHistories();
   let currentPage = 0;
   let data: any;
   
   onMounted(async()=> {
       const route = useRoute();
       histories.itemId = <string>route.params.id;
       data = await histories.getHistoriesByItemId(histories.getItemId, currentPage);
       categories.value = histories.getHistoriesById;
       loaded.value = true;
  });

  const ionInfinite = async(ev: InfiniteScrollCustomEvent) => {
       if(data.histories.length === 0 || data.histories.length < currentPage) {
        ev.target.disabled = true;
        return;
       } else {
           currentPage += 9;
           data = await histories.getHistoriesByItemId(histories.getItemId, currentPage);
           categories.value.push(...data.histories);
           setTimeout(() => ev.target.complete(), 500);
       }
       console.log(currentPage)
       console.log(data.histories.length)
   };
   
   const addItem = () => {
       router.push(`/${histories.getItemId}/histories/new`);
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
   
   ion-col button {
       background: none;
   }
   
   ion-icon {
       margin-top: 30px;
   }

   .add-button {
    position: fixed;
    right: 1em;
    bottom: 1em;
   }

   .accordion-container {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #ccc;
   }
   
   </style>