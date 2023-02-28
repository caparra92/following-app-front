<template>
 <ion-page>
    <ion-content>
        <ion-grid class="container">
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
            <ion-row class="power-off">
                <ion-col>
                    <button @click="logout">
                        <ion-icon size = "large" :icon="powerOutline"></ion-icon>
                    </button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="add-button-col">
                    <add-button></add-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
 </ion-page>
</template>

<script setup>
import router from "../router";
import { IonAvatar, IonPage, IonContent, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { powerOutline } from 'ionicons/icons'
import CategoryBadge from '../components/CategoryBadge.vue';
import AddButton from '../components/AddButton.vue';
import { useStore } from '../stores/store';
import { useActivityTypes } from '../stores/activityTypes';
import { onMounted, ref } from 'vue';

const categories = ref([])

const store = useStore();
const activityTypes = useActivityTypes();

onMounted(async()=> {
 categories.value = await activityTypes.getCategories();
});

const logout = async() => {
    const data = await store.logout();
    router.push('/login');
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