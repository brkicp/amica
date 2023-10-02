<template>
  <ion-page>
    <ion-content>
      <div class="p-4 h-100vh flex flex-col items-center justify-center">
        <ion-text>
          <h1 class="text-6xl font-700 text-center">Welcome to Amica</h1>
        </ion-text>
        <img src="../assets/images/Amica-app-logo.png" class="w-50 my-15" />
        <ion-button
          router-link="/sign-up"
          router-direction="forward"
          color="btnPrimary"
          size="large"
          class="w-60"
          >Get started</ion-button
        >
        <div class="flex items-center">
          <ion-text>
            <p>Already have an account?</p>
          </ion-text>
          <ion-button
            fill="clear"
            router-link="/sign-in"
            router-direction="forward"
          >
            <span class="text-white underline">Sign in</span>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
</script>

<style scoped>
ion-content {
  --background: #2a6049;
  --color: #fff;
  --overflow: hidden;
}
</style>
