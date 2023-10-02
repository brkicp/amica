<template>
  <ion-page>
    <ion-content>
      <div class="flex flex-col pt-10 p-8 gap-4 h-screen justify-center">
        <ion-text>
          <h1 class="text-5xl font-700 mb-4">Sign in</h1>
        </ion-text>
        <form class="flex flex-col gap-4" @submit.prevent="loginRequest()">
          <ion-input
            class="custom"
            tabindex="1"
            v-model="form.email"
            required
            label="Email"
            label-placement="floating"
            shape="round"
            type="email"
            placeholder="Enter your email"
          ></ion-input>
          <ion-input
            class="custom"
            tabindex="2"
            v-model="form.password"
            required
            label="Password"
            label-placement="floating"
            shape="round"
            type="password"
            placeholder="Enter password"
          ></ion-input>
          <SharedFormButton :loading="status === 'pending'">
            Sign in
          </SharedFormButton>
        </form>
        <div class="flex items-center justify-center">
          <ion-text>
            <p>Don't have an account?</p>
          </ion-text>
          <ion-button
            fill="clear"
            router-link="/sign-up"
            router-direction="root"
          >
            <span class="text-white underline">Sign up</span>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const { execute: loginRequest, status } = useApi("/auth/login", {
  method: "POST",
  body: form,
  immediate: false,
  watch: false,
  onResponse: async (e) => {
    if (e.response.status === 200) {
      const { token } = await e.response._data;
      localStorage.setItem("token", token);
      router.push("/");
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

ion-input.custom {
  --background: #327155;
  --border-radius: 12px;
  --padding-start: 12px;
  --border-color: white;
  --border-style: solid;
  --border-width: 2px;
}
</style>
