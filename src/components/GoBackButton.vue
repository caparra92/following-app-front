<template>
    <div>
        <button @click="$router.go(-1)">
          <ion-icon size = "large" :icon="chevronBackOutline"></ion-icon>
        </button>
    </div>
</template>
<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
</script>
<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 44px;
  border-radius: 5px;
}

ion-icon{
  color: var(--ion-color-dark);
}

</style>