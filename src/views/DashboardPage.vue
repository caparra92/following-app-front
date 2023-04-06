<template>
 <ion-page>
    <ion-content>
        <ion-grid class="container">
            <menu-badge></menu-badge>
            <avatar-badge></avatar-badge>
            <ion-row>
                <ion-col>
                    <div v-bind="containerProps">
                        <div v-bind="wrapperProps">
                            <div v-for="{index, data} in list" :key="index">
                                <category-badge :activityType="data.name" view="activities" :id="data.id" @remove-item="removeItem"/>
                            </div>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="add-button-col">
                    <add-button @click="addCategory"></add-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
 </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { useVirtualList } from '@vueuse/core';
import AvatarBadge  from '@/components/AvatarBadge.vue';
import CategoryBadge from '../components/CategoryBadge.vue';
import AddButton from '../components/AddButton.vue';
import MenuBadge from '../components/MenuBadge.vue';
import { useActivityTypes } from '../stores/activityTypes';
import { deleteAlert, successAlert } from '../helpers/alerts';
import { onMounted, ref } from 'vue';
import router from '@/router';

const categories = ref(<any>[]);
const { list, containerProps, wrapperProps } = useVirtualList(categories, {
itemHeight: 96
});
const activityTypes = useActivityTypes();
const handlerMessage = ref('');
let data: any;

onMounted(async()=> {
 await activityTypes.getCategories();
 categories.value = activityTypes.getActivityTypes;
});

const addCategory = () => {
    router.push('/activityTypes/new');
}

const removeItem = async (id: string) => {
    try {
        await deleteAlert(handlerMessage, activityTypes);
        if(handlerMessage.value == 'confirm') {
            data = await activityTypes.removeActivityType(id);
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
    font-size: 1em;
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

</style>