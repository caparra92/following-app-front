import 'swiper/css';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Scrollbar } from 'swiper';
import { Chart, registerables } from "chart.js";
import { NewSet } from '../helpers/dataStructures';
import { months, days } from '../helpers/daysAndMonths';
import { useHistories } from '@/stores/histories';
import { useItems } from '@/stores/items';
import { UniqueMonthId } from '@/interfaces/UniqueMonthId';

const getHistories = () => {

    const route = useRoute();
    const id = <string>route.params.id;
    const histories = useHistories();
    const items = useItems();
    const loaded = ref(false);
    const activeIndex = ref(0);
    const modules = [Scrollbar];
    const categories = ref(<any[]>[]);
    const availableMonths = ref(<any[]>[]);
    const itemObj = ref(<any>{});
    const currentMonth = new Date().getUTCMonth() + 1;
    const uniqueMonths = new NewSet();
    const uniqueIds = new NewSet();
    const uniqueMonthId = <UniqueMonthId[]>[];

    const getItems = async () => {
        const { item } = await items.getItem(id);
        itemObj.value = item;
        await histories.getHistoriesByMonth(id, currentMonth);
        await histories.getHistoriesByItemId(id);
        categories.value = histories.getHistories;
        availableMonths.value = histories.getHistoriesById;
        loaded.value = true;
        getMonths(availableMonths.value).month.forEach((month) => uniqueMonths.add(month));
        getMonths(availableMonths.value).id.forEach((id) => uniqueIds.add(id));
        const sortedIds = <number[]>uniqueIds.values().sort((a: any, b: any) => b - a);
        for (let i = 0; i < sortedIds.length; i++) {
            uniqueMonthId.push({
                month: <string>uniqueMonths.values()[i],
                idx: sortedIds[i]
            });
        }
        activeIndex.value = uniqueMonthId.findIndex((month) => month.idx === currentMonth);
        activeIndex.value === -1 ? selectItem(0, uniqueMonthId[0].idx) : selectItem(activeIndex.value, currentMonth);
        // console.log(activeIndex.value, currentMonth)
        chartData.value.labels = getDayValue(categories.value).dayValue;
        chartData.value.datasets[0].data = getDayValue(categories.value).value;
    }

   getItems();

    const getMonths = (objData: any[]) => {
        return {
            month: objData.map(data => months[new Date(data.date).getUTCMonth()].name.substring(0, 3)),
            id: objData.map(data => months[new Date(data.date).getUTCMonth()].id)
        }
    }

    const getDayValue = (objData: any[]) => {
        const sortDays = objData.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        return {
            dayWeek: sortDays.map(data => days[new Date(data.date).getUTCDay()].substring(0, 3)),
            dayValue: sortDays.sort((a, b) => a - b).map(data => [new Date(data.date).getUTCDate(), days[new Date(data.date).getUTCDay()].substring(0, 3)]),
            value: sortDays.map(data => data.value)
        };
    }

    const selectItem = async (item: any, monthNumber: any) => {
        if (activeIndex.value !== item) {
            activeIndex.value = item;
            await histories.getHistoriesByMonth(id, monthNumber);
            categories.value = histories.getHistories;
            // console.log(categories.value)
            chartData.value.labels = getDayValue(categories.value).dayValue;
            chartData.value.datasets[0].data = getDayValue(categories.value).value;
            // console.log(chartData)
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


    return {
        itemObj,
        modules,
        options,
        chartData,
        uniqueMonthId,
        activeIndex,
        Chart,
        registerables,
        loaded,
        selectItem
    }
}

export default getHistories