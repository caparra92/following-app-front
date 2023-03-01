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
                    <div v-for="{ id, name } in categories" :key="id">
                        <category-badge :activityType="name" view="activities" :id="id"/>
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
import { IonAvatar, IonPage, IonContent, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue';
import CategoryBadge from '../components/CategoryBadge.vue';
import AddButton from '../components/AddButton.vue';
import MenuBadge from '../components/MenuBadge.vue';
import { useStore } from '../stores/store';
import { useActivityTypes } from '../stores/activityTypes';
import { onMounted, ref } from 'vue';
import router from '@/router';

const categories = ref([])
const activityTypes = useActivityTypes();

onMounted(async()=> {
 categories.value = await activityTypes.getCategories();
});

const addCategory = () => {
    router.push('/activityTypes/new');
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