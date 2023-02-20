<template>
  <ion-page>
    <ion-content>
        <ion-grid class="container">
          <ion-row>
            <ion-col>
              <div class="multi-button">
                    <button class="multi-button_button toggle" disabled>Login</button>
                    <button class="multi-button_button toggle" @click="changeView">Register</button>
                  </div>
            </ion-col>
          </ion-row>
          <ion-row>
              <ion-col><p class="title">Login</p></ion-col>
            </ion-row>
            <form action="">
              <ion-list>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input class="has-focus" v-model="email">
                      <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
                    </ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input type="password" v-model="password">
                      <ion-icon size="large" :icon="lockClosedOutline"></ion-icon>
                    </ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-button @click="login">Enter</ion-button>
                  </ion-item>
                </ion-col>
              </ion-row>
              </ion-list>
            </form>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '../router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonIcon, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { lockClosedOutline, personCircleOutline } from 'ionicons/icons';
import { useStore } from '../stores/store';

const store = useStore();
const email = null;
const password = null;

console.log(`Email: ${email}, password: ${password}`)

const changeView = () => {
  router.push("Register");
};

const login = async() => {
  await store.login(email, password);
}

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

.multi-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 1.2em;
  }
  
  .toggle {
    margin: 2em 0;
    width:5em;
    height: 2.3em;
    align-self: center;
    font-family: 'Outfit', sans-serif;
    text-transform: capitalize;
    width: 100%;
    height: 4em;
    margin: 1.2em 1.2em 0 1.2em;
    font-size: 1em;
    border-radius: 7px;
  }

  .toggle:first-child {
    border-radius: 7px 0 0 7px !important;
    margin-right: 0;
    background: rgba(var(--ion-color-primary-rgb), .6);
    color: var(--ion-color-light);
  }

  .toggle:last-child {
    border-radius: 0 7px 7px 0 !important;
    margin-left: 0;
    background: rgba(var(--ion-color-primary-rgb), 1);
    color: var(--ion-color-light);
  }

.title {
  font-family: 'Outfit', sans-serif;
  color: var(--ion-color-primary);
  font-size: 30px;
  font-weight: 400;
}

ion-input {
  background: var(--ion-color-secondary);
  color: var(--ion-color-primary);
  height: 4em;
  border-radius: 7px;
  outline: none;
  margin: 1.2em;
  transition: all 0.30s ease-in-out;
}

ion-input:focus {
  box-shadow: 0 0 5px rgba(var(--ion-color-primary-rgb), 1);
  padding: 3px 0px 3px 3px;
  margin: 5px 1px 3px 0px;
  border: 1px solid rgba(var(--ion-color-primary-rgb), 1);
}

ion-icon {
  position: absolute;
  right: 0;
  padding: .4em;
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