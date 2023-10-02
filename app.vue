<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts" setup>
useHead({ title: "Amica", link: [{ rel: "icon", href: "icon.png" }] });
</script>

<style>
:root {
  --ion-color-btnPrimary: #fd844d;
}

.ion-color-btnPrimary {
  --ion-color-base: var(--ion-color-btnPrimary);
}
</style>
