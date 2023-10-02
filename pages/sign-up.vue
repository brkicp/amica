<template>
  <ion-page>
    <ion-content>
      <div class="flex flex-col pt-10 p-8 gap-4">
        <ion-text>
          <h1 class="text-5xl font-700 mb-4">Sign up</h1>
        </ion-text>

        <form @submit.prevent="signUpRequest()" class="flex flex-col gap-4">
          <ion-input
            v-model="form.name"
            class="custom"
            required
            tabindex="1"
            label="Name"
            label-placement="floating"
            shape="round"
            placeholder="Enter your name"
          ></ion-input>
          <ion-input
            v-model="form.day"
            class="custom"
            required
            tabindex="2"
            label="Day"
            label-placement="floating"
            shape="round"
            type="number"
            placeholder="Enter your birth day"
          ></ion-input>
          <ion-input
            v-model="form.month"
            class="custom"
            required
            tabindex="3"
            label="Month"
            label-placement="floating"
            shape="round"
            type="number"
            placeholder="Enter your birth month"
          ></ion-input>
          <ion-input
            v-model="form.year"
            class="custom"
            required
            tabindex="4"
            label="Year"
            label-placement="floating"
            shape="round"
            type="number"
            placeholder="Enter your birth year"
          ></ion-input>

          <ion-input
            v-model="form.email"
            class="custom"
            required
            tabindex="5"
            label="Email"
            label-placement="floating"
            shape="round"
            type="email"
            placeholder="Enter your email"
          ></ion-input>
          <ion-input
            v-model="form.password"
            class="custom"
            required
            tabindex="6"
            label="Password"
            label-placement="floating"
            shape="round"
            type="password"
            placeholder="Enter password"
          ></ion-input>

          <div class="flex gap-3">
            <ion-button
              @click.stop.prevent="form.gender = 'M'"
              :class="{
                'bg-bsecondary border-bsecondary': form.gender === 'M',
              }"
              fill="clear"
              class="text-white border border-1px border-solid rounded-2xl"
            >
              <ion-icon :icon="ioniconsMale" />
            </ion-button>
            <ion-button
              @click.stop.prevent="form.gender = 'F'"
              fill="clear"
              :class="{
                'bg-bsecondary border-bsecondary': form.gender === 'F',
              }"
              class="text-white border border-1px border-solid rounded-2xl"
            >
              <ion-icon :icon="ioniconsFemale" />
            </ion-button>
          </div>

          <SharedFormButton :loading="status === 'pending'">
            Sign up
          </SharedFormButton>
        </form>

        <div class="flex items-center justify-center">
          <ion-text>
            <p>Already have an account?</p>
          </ion-text>
          <ion-button
            fill="clear"
            router-link="/sign-in"
            router-direction="root"
          >
            <span class="text-white underline">Sign in</span>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const form = reactive({
  name: "",
  day: "",
  month: "",
  year: "",
  email: "",
  password: "",
  gender: "M",
});

const router = useRouter();

const { execute: signUpRequest, status } = useApi("/auth/sign-up", {
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
