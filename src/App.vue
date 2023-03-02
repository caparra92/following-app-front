<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style>
* {
  font-family: "Outfit", sans-serif;
  text-transform: capitalize;
  font-size: 30px;
}

.title {
    color: var(--ion-color-primary);
    font-weight: 400;
  }

ion-button {
    width: 100%;
    height: 4em;
    margin: 1.2em 1.2em 0 1.2em;
    font-size: 1em;
    border-radius: 7px;
}

.add-button-col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.single-button {
    width: 100%;
    height: 3em;
    margin: 1em;
    font-size: .8em;
    border-radius: 7px;
  }

  .field {
    width: 100%;
    font-size: .6em;
    text-transform: lowercase;
    background-color: var(--ion-color-secondary);
    color: var(--ion-color-primary);
    height: 4em;
    border: 1px solid rgba(var(--ion-color-primary-rgb), 1);
    border-radius: 7px;
    outline: none;
    margin: 1em;
    transition: all 0.30s ease-in-out;
  }

  .field:focus {
    box-shadow: 0 0 3px rgba(var(--ion-color-primary-rgb), 1);
    border: 2px solid rgba(var(--ion-color-primary-rgb), 1);
  }
</style>
