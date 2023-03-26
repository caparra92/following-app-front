<template>
    <ion-page>
       <ion-content>
           <ion-grid class="container">
               <menu-badge></menu-badge>
               <ion-row>
                    <ion-col><p class="title">{{ itemObj.name }}</p></ion-col>
                </ion-row>
                <bar-chart v-if="loaded" :chart-data="chartData" :options="options"></bar-chart>
                {{ chartData.datasets.data }}
           </ion-grid>
       </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { onMounted, ref  } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import MenuBadge from "@/components/MenuBadge.vue";
import { useHistories } from '@/stores/histories';
import { useItems } from '@/stores/items';

const histories = useHistories();
const items = useItems();
const currentPage = 0;
let loaded = false;
const categories = ref(<any[]>[]);
const itemObj = ref(<any>{});
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

onMounted(async()=> {
       const route = useRoute();
       const id = <string>route.params.id;
       const { item } = await items.getItem(id);
       itemObj.value = item;
       await histories.getHistoriesByItemId(id, currentPage);
       categories.value = histories.getHistories;
       loaded = true;
       chartData.value.labels = getDayValue(categories.value).dayValue;
       chartData.value.datasets[0].data = getDayValue(categories.value).value;
  });

const getMonths = (objData: any[]) => {
    return objData.map(data => months[new Date(data.date).getMonth()].substring(0,3));
}

const getDayValue = (objData: any[]) => {
    return {
        dayWeek: objData.map(data => days[new Date(data.date).getDay()].substring(0,3)),
        dayValue: objData.map(data => [new Date(data.date).getDate(), days[new Date(data.date).getDay()].substring(0,3)]),
        value: objData.map(data => data.value)
    };
}

Chart.register(...registerables);

const chartData: any = ref({
      labels: [['mon','03'],'mon\n 04','mon\n 05'],
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
</style>