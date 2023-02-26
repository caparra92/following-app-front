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
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input
                    class="has-focus"
                    v-model="form.email"
                    placeholder="email@domain.com"
                    @ionInput="validate"
                  >
                    <ion-icon
                      size="large"
                      :icon="personCircleOutline"
                    ></ion-icon>
                  </ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <p class="input-invalid" v-if="!form.isValid">
              <span>Invalid email</span>
            </p>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input type="password" v-model="form.password">
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
import router from "../router";
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

const form = ref({
  email: null,
  password: null,
  isValid: true,
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
    ? (form.value.isValid = true)
    : (form.value.isValid = false);
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
    const { response } = data;
    if (response) {
      const error = response.data.error;
      presentAlert(error);
      }
    //console.log(data);
    router.push('Dashboard');
  } catch (error) {
    form.value.message = error;
    throw `Login failed with error ${error}`;
  }
};
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
  width: 5em;
  height: 2.3em;
  align-self: center;
  font-family: "Outfit", sans-serif;
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
  font-family: "Outfit", sans-serif;
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
  transition: all 0.3s ease-in-out;
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
  padding: 0.4em;
}

ion-button {
  font-family: "Outfit", sans-serif;
  text-transform: capitalize;
  width: 100%;
  height: 4em;
  margin: 1.2em 1.2em 0 1.2em;
  font-size: 1em;
  border-radius: 7px;
}

.input-invalid {
  color: var(--ion-color-danger);
  text-align: left;
  margin: 0 auto;
  padding-bottom: 2px;
  width: 78%;
  border-bottom: 1px solid var(--ion-color-danger);
  font-size: 0.7em;
}
</style>