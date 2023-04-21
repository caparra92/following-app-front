import { ref } from 'vue';
import { useVirtualList } from '@vueuse/core';
import { useActivityTypes } from '@/stores/activityTypes';
import { deleteAlert, successAlert } from '../helpers/alerts';


const getActivityTypes = () => {

    const categories = ref(<any>[]);
    const activityTypes = useActivityTypes();
    const handlerMessage = ref('');
    let data: any;

    const { list, containerProps, wrapperProps } = useVirtualList(categories, {
        itemHeight: 96
    });

    const initActivityTypes = async () => {
        await activityTypes.getCategories();
        categories.value = activityTypes.getActivityTypes;
        console.log(categories.value);
    }

    const removeItem = async (id: string) => {
        try {
            await deleteAlert(handlerMessage, activityTypes);
            if (handlerMessage.value == 'confirm') {
                data = await activityTypes.removeActivityType(id);
                await successAlert(data.message);
            }
        } catch (error) {
            throw `Error during removing with ${error}`;
        }
    }

    initActivityTypes();

    return {
        categories,
        activityTypes,
        data,
        handlerMessage,
        list,
        containerProps,
        wrapperProps,
        removeItem
    }

};

export default getActivityTypes