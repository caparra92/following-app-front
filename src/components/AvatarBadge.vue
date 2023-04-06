<template>
    <div class="avatar-container">
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
    </div>
</template>
<script setup lang="ts">
import { IonRow, IonCol, IonAvatar } from '@ionic/vue'
</script>
<style scoped>
.avatar-container {
    display: flex;
    flex-direction: column;
}
ion-avatar {
    align-self: center;
    margin: 0 auto;
}

ion-col p:first-child {
    color: var(--ion-color-primary);
    font-weight: 600;
    margin-top: 20px;
}

ion-col p {
    font-size: 20px;
    margin: 0;
}

ion-col p:last-child {
    color: var(--ion-color-medium);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 20px;
}
</style>