<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Following App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ul class="menu-list">
        <li><ion-icon :icon="listOutline" size="large"></ion-icon>Categories</li>
        <li><ion-icon :icon="personAddOutline" size="large"></ion-icon>Register</li>
        <li><ion-icon :icon="powerOutline" size="large"></ion-icon>Logout</li>
      </ul>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>

<script setup lang="ts"> 
  import {
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonPage,
    IonIcon
  } from '@ionic/vue';
  import { listOutline, personAddOutline, powerOutline } from 'ionicons/icons'
  
</script>
<style scoped>
.menu-list {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: none;
}

.menu-list > li {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4em;
  list-style: none;
  padding: 8px;
  line-height: 3;
}

li > ion-icon {
  padding-top: 8px;
}
</style>