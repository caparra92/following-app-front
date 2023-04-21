<template>
    <div id="preloader">
        <div class="loader"></div>
    </div>
</template>
<style scoped>

/* Preloader CSS */

#preloader {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    top: 0;
    left: 0;
    background: var(--ion-color-primary-contrast);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition-duration: 300ms;
}

.loader {
    position: relative;
    z-index: 1;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: loader linear 2s infinite;
    border-top: 2px solid var(--ion-color-secondary);
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
}

@-webkit-keyframes loader {

    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes loader {

    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>