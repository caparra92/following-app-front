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
                            <div v-for="{index, data} in list" :key="index" >
                                <category-badge :activityType="data.name" view="items" :id="data.id" @remove-item="removeItem"/>
                            </div>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="add-button-col">
                    <add-button @click="addActivity"></add-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
 </ion-page>
</template>

<script setup lang="ts">
import router from "../router";
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import {  useVirtualList  } from '@vueuse/core';
import AvatarBadge from "@/components/AvatarBadge.vue";
import CategoryBadge from '@/components/CategoryBadge.vue';
import AddButton from '@/components/AddButton.vue';
import MenuBadge from "@/components/MenuBadge.vue";
import { useActivities } from "../stores/activities";
import { onMounted, ref } from 'vue';
import { deleteAlert, successAlert } from "../helpers/alerts";

const categories = ref(<any>[]);
const { list, containerProps, wrapperProps } = useVirtualList(categories, {
itemHeight: 96
});
const handlerMessage = ref('');

const activities = useActivities();
let data: any;

onMounted(async() => {
    const route = useRoute();
    const id = <string>route.params.id;
    await activities.getActivitiesByTypeId(id);
    categories.value = activities.getAllActivities;
});

const addActivity = () => {
    router.push('/activities/new');
}

const removeItem = async (id: string) => {
    try {
        await deleteAlert(handlerMessage, activities);
        if(handlerMessage.value == 'confirm') {
            data = await activities.removeActivity(id);
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