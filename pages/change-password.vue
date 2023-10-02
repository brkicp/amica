<template>
  <ion-page>
    <ion-content>
      <div class="flex flex-col pt-10 p-8 gap-4 h-screen">
        <ion-button
          class="custom"
          router-link="/profile"
          router-direction="forward"
        >
          <ion-icon slot="start" :icon="arrowBack"></ion-icon>
          Back
        </ion-button>
        <ion-text>
          <h1 class="text-5xl font-700 mb-20">Change password</h1>
        </ion-text>
        <form class="flex flex-col gap-4" @submit.prevent="updatePassword()">
          <ion-input
            class="custom"
            tabindex="1"
            v-model="form.oldPassword"
            required
            label="Old password"
            label-placement="floating"
            shape="round"
            type="password"
            placeholder="Enter your old password"
          ></ion-input>
          <ion-input
            class="custom"
            tabindex="2"
            v-model="form.newPassword"
            required
            label="New password"
            label-placement="floating"
            shape="round"
            type="password"
            placeholder="Enter new password"
          ></ion-input>
          <SharedFormButton :loading="status === 'pending'">
            Change password
          </SharedFormButton>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { arrowBack } from "ionicons/icons";
const form = reactive({
  oldPassword: "",
  newPassword: "",
});

const { passwordUpdate } = useAlert();

const { execute: updatePassword, status } = useApi("/users/password", {
  method: "PUT",
  body: form,
  immediate: false,
  watch: false,
  onResponse: async (e) => {
    if (e.response.status === 200) {
      passwordUpdate();
    }
  },
});
</script>

<style scoped>
ion-content {
  --background: #2a6049;
  --color: #fff;
  --overflow-y: hidden;
}

ion-button.custom {
  --background: #327155;
  width: max-content;
  --background-activated: #327155;
}

ion-input.custom {
  --background: #327155;
  --border-radius: 12px;
  --padding-start: 12px;
  --border-color: white;
  --border-style: solid;
  --border-width: 2px;
}
</style>
