<template>
  <ion-menu content-id="main-content" size="large" class="menu-container">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title><ion-icon :icon="statsChartOutline" class="icon"></ion-icon></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ul class="menu-list">
        <router-link to="/dashboard"><li><ion-icon :icon="listOutline" size="large"></ion-icon>Categories</li></router-link>
        <router-link to="/register"><li><ion-icon :icon="personAddOutline" size="large"></ion-icon>Register</li></router-link>
        <li @click="logout"><ion-icon :icon="powerOutline" size="large"></ion-icon>Logout</li>
      </ul>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <template v-if="$route.name != 'dashboard'">
          <go-back-button class="back-button"></go-back-button>
        </template>
      </ion-toolbar>
    </ion-header>
  </ion-page>
</template>

<script setup lang="ts"> 
  import router from "../router";
  import { useStore } from "@/stores/store";
  import GoBackButton from "./GoBackButton.vue";
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
  import { listOutline, personAddOutline, powerOutline, statsChartOutline } from 'ionicons/icons';
  
  const store = useStore();
  
  const logout = async() => {
    const data = await store.logout();
    router.push('/login');
}
</script>
<style scoped>

.menu-container {
  position: fixed;
  overflow: scroll;
  z-index: 9999;
}
.menu-list {
  font-size: 30px;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: none;
}

.menu-list li {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  list-style: none;
  padding: 8px;
  line-height: 1.2;
  cursor: pointer;
}

.menu-list a {
  text-decoration: none;
  font-size: .8em;
}

li ion-icon {
  padding-top: 8px;
}

.icon {
  padding-top: 10px;
}

.back-button {
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>