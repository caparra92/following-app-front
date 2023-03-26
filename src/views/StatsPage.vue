<template>
    <ion-page>
       <ion-content>
           <ion-grid class="container">
               <menu-badge></menu-badge>
               <ion-row>
                    <ion-col><p class="title">Stats</p></ion-col>
                </ion-row>
                <bar-chart :chart-data="testData" :options="options"></bar-chart>
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

const histories = useHistories();
const currentPage = 0;
const categories = ref(<any>[]);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

onMounted(async()=> {
       const route = useRoute();
       const id = <string>route.params.id;
       await histories.getHistoriesByItemId(id, currentPage);
       categories.value = histories.getHistories;
       console.log(categories.value)
       console.log(getMonths(categories.value))
       console.log(getDays(categories.value))
       console.log(getValues(categories.value))
  });

const getMonths = (objData: any[]): string[] => {
    return objData.map(data => months[new Date(data.date).getMonth()]);
}

const getDays = (objData: any[]): string[] => {
    return objData.map(data => days[new Date(data.date).getDay()]);
}

const getValues = (objData: any[]): string[] => {
    return objData.map(data => String(data.value));
}

const daysW = getDays(categories.value);

Chart.register(...registerables);

const testData = {
      labels: ['Wednesday', 'Thursday', 'Wednesday', 'Friday', 'Thursday', 'Thursday', 'Thursday', 'Wednesday', 'Wednesday'],
      datasets: [
        {
          data: ['30', '40', '38', '15', '45', '37', '30', '40', '41'],
          backgroundColor: ['#FCDB00'],
          borderRadius: 50,
          borderSkipped: false
        },
      ],
    };

const options = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
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