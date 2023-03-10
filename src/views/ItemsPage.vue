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
                    <div v-for="category in categories" :key="category.id">
                        <category-badge :activityType="category.name" view="items" :id="category.id" @remove-item="removeItem"/>
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col class="add-button-col">
                    <add-button @click.prevent="addItem"></add-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
 </ion-page>
</template>

<script setup lang="ts">
import router from "../router";
import { useRoute } from 'vue-router';
import { IonAvatar, IonPage, IonContent, IonGrid, IonRow, IonCol, alertController } from '@ionic/vue';
import CategoryBadge from '../components/CategoryBadge.vue';
import AddButton from '../components/AddButton.vue';
import MenuBadge from "@/components/MenuBadge.vue";
import { useActivities } from '../stores/activities';
import { useItems } from "@/stores/items";
import { onMounted, ref } from 'vue';

const categories = ref(<any>[]);
const handlerMessage = ref('');

const activities = useActivities();
const items = useItems();
let data: any;

onMounted(async()=> {
    const route = useRoute();
    const id = <string>route.params.id;
    await items.getItemsByActivityId(id);
    categories.value = items.getItems;
});

const addItem = () => {
    router.push('/items/new');
}

const removeItem = async (id: string) => {
    try {
        await deleteAlert();
        if(handlerMessage.value == 'confirm') {
            data = await items.removeItem(id);
            await successAlert(data.message); 
        }    
    } catch (error) {
        throw `Error during removing with ${error}`;
    }
}

const deleteAlert = async () => {
        const alert = await alertController.create({
          header: 'Do you want to delete?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                handlerMessage.value = 'cancel';
              },
            },
            {
              text: 'Yes',
              role: 'confirm',
              handler: () => {
                handlerMessage.value = 'confirm';
              },
            },
          ],
        });
        await alert.present();  
        const { role }: any = await alert.onDidDismiss();
        handlerMessage.value = role;
};

const successAlert = async (message: string) => {
      const alert = await alertController.create({
        header: "Success",
        message: message,
        buttons: ["Ok"],
      });
    
      await alert.present();
    };

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