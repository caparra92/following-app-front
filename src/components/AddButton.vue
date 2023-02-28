<template>
    <button class="add-button">
        <ion-icon :icon="addOutline" size="large"></ion-icon>
    </button>
</template>
<script setup>
import { IonIcon } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
</script>
<style scoped>
.add-button {
    position: absolute;
    right: 2.5em;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5em;
    height: 5em;
    color: var(--ion-color-light);
    background: var(--ion-color-primary);
    border-radius: 50%;
    transition: all 0.30s ease-in-out;
}

.add-button:active {
    background: var(--ion-color-primary-shade);
    width: 5.2em;
    height: 5.2em;
}
</style>