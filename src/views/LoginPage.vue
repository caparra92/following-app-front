<template>
  <ion-page>
    <ion-content>
        <ion-grid class="container">
          <ion-toggle color="primary" @ion-change="changeView"></ion-toggle> 
          <ion-row>
              <ion-col><p class="title">Login</p></ion-col>
            </ion-row>
            <form action="">
              <ion-list>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-input class="has-focus">
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
import router from '../router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonToggle } from '@ionic/vue';
import { lockClosedOutline, personCircleOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
  IonPage, IonContent, IonList, IonItem, IonInput, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonToggle
  },
  model: {
    toggle: true
  },
  setup() {
    function changeView():void {
        
        router.push('Register');
    }
    return {lockClosedOutline, personCircleOutline, changeView}
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

ion-toggle {
    margin-top: 2em;
    width:5em;
    height: 2.3em;
    align-self: center;
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