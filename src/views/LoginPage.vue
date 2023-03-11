<template>
  <ion-page>
    <ion-content>
      <ion-grid class="container">
        <ion-row>
          <ion-col>
            <div class="multi-button">
              <button class="multi-button_button toggle" disabled>Login</button>
              <button class="multi-button_button toggle" @click="changeView">
                Register
              </button>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col><p class="title">Login</p></ion-col>
        </ion-row>
        <form>
          <ion-list>
            <base-input type="email" label="Email" v-model="form.email" @input="validate"></base-input>
            <ion-item><span class="validation" v-if="!formInvalid">{{ form.message }}</span></ion-item>
            <base-input type="password" label="Password" v-model="form.password"></base-input>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-button @click="login" class="single-button">Enter</ion-button>
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
import BaseInput from '../components/BaseInput.vue';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import { useStore } from '../stores/store';
import { errorAlert } from '../helpers/alerts';
import { ref } from 'vue';

const store = useStore();
const formInvalid = ref(true);
const form = ref({
  email: '',
  password: '',
  message: '',
});

const changeView = () => {
  router.push("Register");
};

const validateEmail = (email: string) => {
  if (form.value.email) {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  }
};

const validate = (ev: any) => {
  const value = ev.target.value;

  if (value === "") return;

  if(validateEmail(value)) {
    formInvalid.value = true;
  } else {
    formInvalid.value = false;
    form.value.message = `Invalid email`
  }
};

const login = async () => {
  try {
    if (form.value.email === '' || form.value.password === '') {
      await errorAlert(`Email and password are required`);
      return;
    }
    if (!validateEmail(form.value.email)) {
      await errorAlert(`Invalid email`);
      return;
    }

    const data = await store.login(form.value.email, form.value.password);
    if (data.user != null) {
      router.push('/dashboard');
    }

    const { response } = data;
    if (response) {
      const error = response.data.error;
      await errorAlert(error);
      clearForm();
    }
  } catch (error: any) {
    form.value.message = error;
    throw `Login failed with error ${error}`;
  }
};

const clearForm = () => {
  form.value.email = '';
  form.value.password = '';
}
</script>

<style scoped>
.container {
  font-size: 30px;
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
  background: rgba(var(--ion-color-primary-rgb), 0.6);
  color: var(--ion-color-light);
}

.toggle:last-child {
  border-radius: 0 7px 7px 0 !important;
  margin-left: 0;
  background: rgba(var(--ion-color-primary-rgb), 1);
  color: var(--ion-color-light);
}

.title {
  color: var(--ion-color-primary);
  font-size: 1em;
  font-weight: 400;
}

.validation {
    display: inline-block;
    margin: 0 1.2em;
    padding-top: 0;
    text-align: left;
    width: 100%;
    color: var(--ion-color-danger);
    font-size: .5em;
    border-top: 1px solid;
  }
</style>