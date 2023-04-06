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
                            <button @click="selectItem(i, idx)" :class="{ active: i === activeItem }">{{ month }}</button>
                        </swiper-slide>
                    </swiper>
                </ion-row>
                <bar-chart v-if="loaded" :chart-data="chartData" :options="options"></bar-chart>
           </ion-grid>
       </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import 'swiper/css';
import { onMounted, ref  } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import MenuBadge from "@/components/MenuBadge.vue";
import { months, days } from '../helpers/daysAndMonths';
import { NewSet } from '../helpers/dataStructures';
import { useHistories } from '@/stores/histories';
import { useItems } from '@/stores/items';

const route = useRoute();
const id = <string>route.params.id;
const histories = useHistories();
const items = useItems();
let loaded = false;
const activeItem = ref(null);
const modules = [Scrollbar];
const categories = ref(<any[]>[]);
const availableMonths = ref(<any[]>[]);
const itemObj = ref(<any>{});
const currentMonth = new Date().getUTCMonth() + 1;
const uniqueMonths = new NewSet();
const uniqueIds = new NewSet();
const uniqueMonthId: any[] = [];


onMounted(async()=> {
    const { item } = await items.getItem(id);
    itemObj.value = item;
    await histories.getHistoriesByMonth(id, currentMonth);
    await histories.getHistoriesByItemId(id);
    categories.value = histories.getHistories;
    availableMonths.value = histories.getHistoriesById;
    loaded = true;
    selectItem(0,currentMonth);
    getMonths(availableMonths.value).month.forEach((month) => uniqueMonths.add(month));
    getMonths(availableMonths.value).id.forEach((id) => uniqueIds.add(id));
    const sortedIds = uniqueIds.values().sort((a: any,b: any)=> b - a );
    for(let i = 0; i < sortedIds.length; i++) {
        uniqueMonthId.push({
            month: uniqueMonths.values()[i],
            idx: sortedIds[i]
        });
    }
    chartData.value.labels = getDayValue(categories.value).dayValue;
    chartData.value.datasets[0].data = getDayValue(categories.value).value;
  });

const getMonths = (objData: any[]) => {
    return {
        month: objData.map(data => months[new Date(data.date).getUTCMonth()].name.substring(0,3)),
        id: objData.map(data => months[new Date(data.date).getUTCMonth()].id)
    }
}

const getDayValue = (objData: any[]) => {
    const sortDays = objData.sort((a,b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
    return {
        dayWeek: sortDays.map(data => days[new Date(data.date).getUTCDay()].substring(0,3)),
        dayValue: sortDays.sort((a,b) => a - b).map(data => [new Date(data.date).getUTCDate(), days[new Date(data.date).getUTCDay()].substring(0,3)]),
        value: sortDays.map(data => data.value)
    };
}

const selectItem = async(item: any, monthNumber: any) => {
    if(activeItem.value !== item) {
        activeItem.value = item;
        await histories.getHistoriesByMonth(id, monthNumber);
        categories.value = histories.getHistories;
        chartData.value.labels = getDayValue(categories.value).dayValue;
        chartData.value.datasets[0].data = getDayValue(categories.value).value;
    } else {
        return;
    }
}

Chart.register(...registerables);

const chartData: any = ref({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['#FCDB00'],
          borderRadius: 50,
          borderSkipped: false
        },
      ],
    });

const options = ref({
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            border: {
                display: false
            }
        },
        y: {
            display: false
        }
    }
});

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