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
                        <history-badge :date="data.date" :value="data.value" :id="data.id" @view-item="openModal($event, 'view')" @update-item="openModal($event, 'update')" @remove-item="removeItem"></history-badge>
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
           <base-modal 
                v-if="isOpen"
                @on:close="closeModal"
            >
                <template v-slot:header>
                    <p class="title">{{mode}} history</p></template>
                <template v-slot:body>
                    <ion-grid v-if="loaded">
                        <form>
                            <ion-list v-if="mode==='update'">
                                <base-input type="date" label="date" v-model="singleHistory.date"></base-input>
                                <base-input type="number" label="value" v-model="singleHistory.value"></base-input>
                                <ion-row>
                                    <ion-col>
                                        <ion-item>
                                            <ion-button class="single-button-update" @click.prevent="updateItem">Update</ion-button>
                                        </ion-item>
                                    </ion-col>
                                </ion-row>
                            </ion-list>
                            <ion-list v-if="mode==='view'">
                                <base-input type="text" label="date" v-model="singleHistory.date" readonly disabled></base-input>
                                <base-input type="number" label="value" v-model="singleHistory.value" readonly disabled></base-input>
                            </ion-list>
                        </form>
                    </ion-grid>
                </template>
           </base-modal>
       </ion-content>
    </ion-page>
   </template>
   
   <script setup lang="ts">
   import router from "../router";
   import { useRoute } from 'vue-router';
   import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonButton, IonAccordionGroup, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/vue';
   import { useVirtualList } from '@vueuse/core';
   import HistoryBadge from '../components/HistoryBadge.vue';
   import AddButton from '../components/AddButton.vue';
   import MenuBadge from "@/components/MenuBadge.vue";
   import LoaderSpinner from '@/components/LoaderSpinner.vue';
   import AvatarBadge from '@/components/AvatarBadge.vue';
   import BaseInput from "@/components/BaseInput.vue";
   import BaseModal from "@/components/BaseModal.vue";
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
   const singleHistory = ref({
    id: '',
    date: '',
    value: 0
   });
   const isOpen = ref(false);
   const mode = ref('');
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
   };
   
   const addItem = () => {
       router.push(`/${histories.getItemId}/histories/new`);
   }

    const openModal = async (id: string, m: string) => {
        m === 'update' ? mode.value = 'update' : mode.value = 'view';
        isOpen.value = true;
        try {
            const { history } = await histories.getHistory(id);
            singleHistory.value.id = history.id;
            singleHistory.value.date = history.date;
            singleHistory.value.value = history.value;
        } catch (error) {
            throw `Error during viewing with ${error}`;
        }
    }

    const closeModal = () => {
        isOpen.value = false;
    }

   const updateItem = async(id: string) => {
    try {
        data = await histories.updateHistory(singleHistory.value.id, singleHistory.value.date, singleHistory.value.value);
        await successAlert(data.message);
        closeModal();
    } catch (error) {
        throw `Error during updating with ${error}`;
    }
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

   .title {
    text-align: center;
    font-size: .6em;
   }

   .single-button-update {
    --background: var(--ion-color-warning);
   }
   
   </style>