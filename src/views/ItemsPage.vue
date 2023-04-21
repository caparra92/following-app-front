<template>
 <ion-page>
    <ion-content>
        <ion-grid class="container" v-if="loaded">
            <menu-badge></menu-badge>
            <avatar-badge></avatar-badge>
            <ion-row>
                <ion-col>
                    <div v-bind="containerProps">
                        <ion-accordion-group v-bind="wrapperProps">
                            <div v-for="{index, data} in list" :key="index">
                                <category-badge :activityType="data.name" view="histories" :id="data.id" @remove-item="removeItem" :accordion="true"/>
                            </div>
                        </ion-accordion-group>
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="add-button-col">
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
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonAccordionGroup } from '@ionic/vue';
import {  useVirtualList  } from '@vueuse/core';
import AvatarBadge from "@/components/AvatarBadge.vue";
import CategoryBadge from '../components/CategoryBadge.vue';
import AddButton from '../components/AddButton.vue';
import MenuBadge from "@/components/MenuBadge.vue";
import LoaderSpinner from '@/components/LoaderSpinner.vue';
import { useItems } from "@/stores/items";
import { useHistories } from '../stores/histories';
import { onMounted, ref } from 'vue';
import { deleteAlert, successAlert } from "../helpers/alerts";

const categories = ref(<any>[]);
const loaded = ref(false);
const { list, containerProps, wrapperProps } = useVirtualList(categories, {
itemHeight: 96
});
const handlerMessage = ref('');
const items = useItems();
const histories = useHistories();
let data: any;

onMounted(async()=> {
    const route = useRoute();
    const id = <string>route.params.id;
    await items.getItemsByActivityId(id);
    categories.value = items.getItems;
    loaded.value = true;
    histories.activityId = id;
});

const addItem = () => {
    router.push('/items/new');
}

const removeItem = async (id: string) => {
    try {
        await deleteAlert(handlerMessage, items);
        if(handlerMessage.value == 'confirm') {
            data = await items.removeItem(id);
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