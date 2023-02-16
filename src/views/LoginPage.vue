<template>
  <ion-page>
    <ion-content>
        <ion-grid class="container">
            <ion-row>
              <ion-col><p class="title">Login</p></ion-col>
            </ion-row>
            <form action="">
              <ion-list>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input>
                      <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
                    </ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input type="password">
                      <ion-icon size="large" :icon="lockClosedOutline"></ion-icon>
                    </ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-button>Enter</ion-button>
                  </ion-item>
                </ion-col>
              </ion-row>
              </ion-list>
            </form>
        </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonInput, IonIcon, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { lockClosedOutline, personCircleOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
  IonPage, IonContent, IonList, IonItem, IonInput, IonIcon, IonButton, IonGrid, IonRow, IonCol
  },
  setup() {
    return {lockClosedOutline, personCircleOutline}
  }
});
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

.title {
  font-family: 'Outfit', sans-serif;
  color: var(--ion-color-primary);
  font-size: 30px;
  font-weight: 400;
}

ion-input {
  height: 4em;
  background-color: var(--ion-color-secondary);
  color: var(--ion-color-primary);
  border-radius: 7px;
  border-color: var(--ion-color-primary);
  border: 1px solid;
  --padding-start: 8px;
  padding-left: 8px;
  margin: 1.2em;
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