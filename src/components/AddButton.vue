<template>
    <button class="add-button">
        <ion-icon :icon="addOutline" size="large"></ion-icon>
    </button>
</template>
<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
</script>
<style scoped>
.add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 4em;
    height: 4em;
    color: var(--ion-color-light);
    background: var(--ion-color-primary);
    border-radius: 50%;
    transition: all 0.30s ease-in-out;
}

.add-button:active {
    background: var(--ion-color-primary-shade);
    width: 4.2em;
    height: 4.2em;
}
</style>