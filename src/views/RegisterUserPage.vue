<template>
<ion-page>
      <ion-content>
          <ion-grid class="container">
            <menu-badge></menu-badge>
              <ion-row>
                <ion-col>
                  <!-- <div class="multi-button" v-if="!isLogged">
                    <button class="multi-button_button toggle" @click="changeView">Login</button>
                    <button class="multi-button_button toggle" disabled>Register</button>
                  </div> -->
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col><p class="title">Register</p></ion-col>
              </ion-row>
              <form>
                <ion-list>
                  <base-input type="text" label="Name" v-model="form.name" ref="name"></base-input>
                  <base-input type="email" label="Email" v-model="form.email" @input="validate"></base-input>
                  <ion-item><span class="validation" v-if="!emailInvalid">Invalid email</span></ion-item>
                  <base-input type="password" label="Password" v-model="form.password"></base-input>
                  <base-input type="password" label="Password confirmation" v-model="form.passwordConfirmation"></base-input>
                  <ion-item><span class="validation" v-if="!passwordInvalid">Passwords did not match</span></ion-item>
                <ion-row>
                  <ion-col>
                    <ion-item>
                      <ion-button class="single-button" @click="createUser">Enter</ion-button>
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
import router from "../router";
import { ref } from 'vue';
import BaseInput from '../components/BaseInput.vue';
import MenuBadge from "@/components/MenuBadge.vue";
import { successAlert, errorAlert } from "../helpers/alerts";
import { useStore } from '../stores/store';
import { useUsers } from '../stores/users';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  alertController
} from "@ionic/vue";

const store = useStore();
const usersStore = useUsers();
const isLogged = ref(store.loggedIn);
const passwordInvalid = ref(true);
const emailInvalid = ref(true);
const name = ref(null);


const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  message: ''
});

const changeView = () => {
  router.push("Login");
};

const validateEmail = (email: string) => {
  if (email) {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  }
};

const validate = (ev: any) => {
  const value = ev.target.value;

  if (value === "") return;

  validateEmail(value)
    ? (emailInvalid.value = true)
    : (emailInvalid.value = false);
};

const createUser = async() => {
  try {

    if(form.value.name === '' || form.value.email === '' || form.value.password === '') {
      errorAlert(`Name, email and password are required`);
      return;
    }

    if (!validateEmail(form.value.email)) {
      await errorAlert(`Invalid email`);
      return;
    }

    if(form.value.password != form.value.passwordConfirmation) {
      passwordInvalid.value = false;
      return;
    }
    const data = await usersStore.createUser(form.value.name, form.value.email, form.value.password);
    if(data.user != null) {
      successAlert( `User ${data.user.email} created`);
      clearForm();
    }
    const { response } = data;
    if (response) {
      const error = response.data.msg;
      errorAlert(error);
    }
  } catch (error: any) {
    form.value.message = error;
    throw `Register failed with error ${error}`;
  }
  
}

const clearForm = () => {
  form.value.name = '';
  form.value.email = '';
  form.value.password = '';
  form.value.passwordConfirmation = '';
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
    margin: 1em 0;
    width: 6em;
    height: 2.3em;
    align-self: center;
    font-family: "Outfit", sans-serif;
    text-transform: capitalize;
    width: 100%;
    height: 4em;
    margin: 1em 0 0 0;
    font-size: .6em;
    border-radius: 7px;
  }

  .toggle:first-child {
    border-radius: 7px 0 0 7px !important;
    margin-right: 0;
    background: rgba(var(--ion-color-primary-rgb), 1);
    color: var(--ion-color-light);
  }

  .toggle:last-child {
    border-radius: 0 7px 7px 0 !important;
    margin-left: 0;
    background: rgba(var(--ion-color-primary-rgb), .6);
    color: var(--ion-color-light);
  }

  .validation {
    display: inline-block;
    margin: 0 1.2em;
    text-align: left;
    width: 100%;
    color: var(--ion-color-danger);
    font-family: 'Outfit', sans-serif;
    border-top: 1px solid;
    font-size: .5em;
  }
</style>