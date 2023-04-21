<template>
    <ion-page>
       <ion-content>
           <ion-grid class="container">
               <menu-badge></menu-badge>
               <ion-row>
                    <ion-col><p class="title">{{ itemObj.name }}</p></ion-col>
               </ion-row>
                <ion-row>
                    <swiper :modules="modules" class="btn-month-group" :scrollbar="false" :slides-per-view="4">
                        <swiper-slide  v-for="({month, idx}, i) in uniqueMonthId" :key="i">
                            <button @click="selectItem(i, idx)" :class="{ active: i === activeIndex }">{{ month }}</button>
                        </swiper-slide>
                    </swiper>
                </ion-row>
                <bar-chart v-if="loaded" :chart-data="chartData" :options="options"></bar-chart>
           </ion-grid>
       </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { BarChart } from 'vue-chart-3';
import MenuBadge from "@/components/MenuBadge.vue";
import getHistories from '@/composables/getHistories';

const { modules, itemObj, uniqueMonthId, selectItem, activeIndex, loaded, chartData, options } = getHistories();
// console.log(loaded.value)

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

button {
    width: 5.2em;
    height: 1.4em;
    font-size: .4em;
    border-radius: 5px;
    cursor: pointer;
    margin: .2em .3em;
    color: var(--ion-color-medium);
}

.btn-month-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1em .5em 1em;
}

.active {
    background-color: #FCDB00;
    color: var(--ion-color-primary);
}
</style>