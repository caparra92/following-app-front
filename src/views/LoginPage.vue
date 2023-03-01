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
              <span class="validation" v-if="!emailInvalid">Invalid email</span>
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

<script setup>
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
  IonCol,
  alertController,
} from "@ionic/vue";
import { lockClosedOutline, personCircleOutline } from "ionicons/icons";
import { useStore } from "../stores/store";
import { ref } from "vue";

const store = useStore();
const emailInvalid = ref(true);

const form = ref({
  email: null,
  password: null,
  message: null,
});

const changeView = () => {
  router.push("Register");
};

const validateEmail = (email) => {
  if (form.value.email) {
    return form.value.email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  }
};

const validate = (ev) => {
  const value = ev.target.value;

  if (value === "") return;

  validateEmail(value)
    ? (emailInvalid.value = true)
    : (emailInvalid.value = false);
};

const presentAlert = async (message) => {
  const alert = await alertController.create({
    header: "Error",
    message: message,
    buttons: ["Try again"],
  });

  await alert.present();
};

const login = async () => {
  try {
    if (form.value.email === null || form.value.password === null) return;
    if (!validateEmail(form.value.email)) return;

    const data = await store.login(form.value.email, form.value.password);
    if (data.user != null) {
      router.push('/dashboard');
    }
    console.log(data.user != null) 
    const { response } = data;
    if (response) {
      const error = response.data.error;
      presentAlert(error);
      clearForm();
    }
  } catch (error) {
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
    margin: 0 1em;
    padding-top: 0;
    text-align: left;
    width: 75%;
    color: var(--ion-color-danger);
    font-size: .6em;
    border-top: 1px solid;
  }
</style>