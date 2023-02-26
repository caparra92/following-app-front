<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style>
.title {
    font-family: 'Outfit', sans-serif;
    color: var(--ion-color-primary);
    font-size: 30px;
    font-weight: 400;
  }

ion-button {
    font-family: 'Outfit', sans-serif;
    text-transform: capitalize;
    width: 100%;
    height: 4em;
    margin: 1.2em 1.2em 0 1.2em;
    font-size: 1em;
    border-radius: 7px;
  }
</style>
