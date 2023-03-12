<template>
    <ion-page>
        <ion-content>
            <ion-grid class="container">
            <menu-badge></menu-badge>
                <ion-row>
                <ion-col><p class="title">New History</p></ion-col>
                </ion-row>
                <form>
                <ion-list>
                    <base-input type="date" label="date" v-model="form.date"></base-input>
                    {{ form.itemId }}
                    <base-input type="number" label="value" v-model="form.value"></base-input>
                    {{ form.activityId }}
                <ion-row>
                    <ion-col>
                    <ion-item>
                        <ion-button class="single-button" @click="addHistory">Enter</ion-button>
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
import router from '@/router';
import { ref } from 'vue';
import BaseInput from '../components/BaseInput.vue';
import MenuBadge from "@/components/MenuBadge.vue";
import { useHistories } from '../stores/histories';
import { errorAlert, successAlert } from '../helpers/alerts';
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

const histories = useHistories();

const form = ref({
    date: '',
    value: 0,
    itemId: histories.itemId,
    activityId: histories.activityId,
    message: ''
});

const addHistory = async() => {
    try {

    if(form.value.date === ''  || form.value.value === null || form.value.itemId === '' || form.value.activityId === '') {
        errorAlert(`Some value(s) missing`);
        return;
    }
    const data = await histories.addHistory(form.value.date, form.value.value, form.value.itemId, form.value.activityId);
    successAlert( `History value created`);
    histories.histories.push(data.history);
    clearForm();
    router.go(-1);
    } catch (error: any) {
    form.value.message = error;
    throw `Register failed with error ${error}`;
    }
    
}

const clearForm = () => {
    form.value.date = '';
    form.value.value = 0;
    form.value.itemId = '',
    form.value.activityId = ''
}
</script>
<style scoped>

</style>