<template>
  <ion-button
    type="submit"
    :disabled="loading"
    color="btnPrimary"
    size="large"
    class="w-full"
  >
    <slot />
    <ion-spinner v-if="loading" class="ml-2" />
  </ion-button>
</template>

<script setup lang="ts">
defineProps<{ loading?: boolean }>();
</script>

<style scoped></style>
