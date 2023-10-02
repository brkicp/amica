<template>
  <ion-page>
    <ion-content>
      <div class="flex flex-col pt-10 p-8 gap-4 min-h-screen">
        <ion-button class="custom" router-link="/" router-direction="forward">
          <ion-icon slot="start" :icon="arrowBack"></ion-icon>
          Back
        </ion-button>
        <ion-text>
          <h1 class="text-5xl font-700 mb-4 mt-0">Edit profile</h1>
        </ion-text>
        <form @submit.prevent="updateUser()" class="flex flex-col gap-4">
          <div
            @click="takePhoto"
            class="h-60 w-full rounded-2xl overflow-hidden"
          >
            <img
              v-if="userPhotoUrl"
              :src="userPhotoUrl"
              class="object-cover w-full h-full"
              alt=""
            />
            <div
              v-else
              class="bg-#327155 w-full h-full flex items-center justify-center"
            >
              <ion-icon size="large" :icon="ioniconsCloudUpload" />
            </div>
          </div>

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
            :autocomplete="false"
            placeholder="Enter your email"
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

          <ion-button
            fill="clear"
            router-link="/change-password"
            router-direction="forward"
          >
            <span class="text-white underline">Change password</span>
          </ion-button>

          <SharedFormButton :loading="status === 'pending'">
            Save changes
          </SharedFormButton>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { arrowBack } from "ionicons/icons";
import { SelectTable } from "~/hono-server/api/config/types/supabase-helpers";

useHead({
  script: [
    {
      async: true,
      crossorigin: "anonymous",
      type: "module",
      src: "https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js",
    },
    {
      async: true,
      crossorigin: "anonymous",
      type: "module",
      src: "https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js",
    },
  ],
});

const form = reactive({
  name: "",
  day: "",
  month: "",
  year: "",
  email: "",
  gender: "M",
});

const { data: currentUser } = useApi<SelectTable<"users">>("/users/me", {
  onResponse: (res) => {
    const u = { ...res.response._data } as Partial<SelectTable<"users">>;
    delete u.profilePhoto;

    Object.assign(form, u);
  },
});

const { takePhoto, photos } = usePhotoGallery();

const router = useRouter();

const userPhotoUrl = computed(() => {
  return photos.value?.base64String || currentUser?.value?.profilePhoto;
});

const { execute: updateUser, status } = useApi("/users/update", {
  method: "PUT",
  body: form,
  immediate: false,
  watch: false,
  onResponse: async (e) => {
    if (e.response.status === 200) {
      await router.replace("/");
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
