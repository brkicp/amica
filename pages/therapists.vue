<template>
  <ion-page>
    <div
      class="px-6 flex flex-col pt-8 bg-primary min-h-screen text-white overflow-y-auto pb-10 overflow-x-hidden"
    >
      <ion-button
        class="custom mb-10"
        router-link="/"
        router-direction="forward"
      >
        <ion-icon slot="start" :icon="arrowBack"></ion-icon>
        Back
      </ion-button>
      <ion-text>
        <h1 class="text-4xl font-700 m-0 mb-2">
          <ion-spinner class="inline-block" v-if="status === 'pending'" />
          {{ psychologist?.length }}
          results
        </h1>
        <p class="text-md font-400 m-0">Find your therapist</p>
      </ion-text>
      <swiper
        v-if="psychologist?.length"
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
        class="mySwiper mt-10"
        v-model="slide"
        @slideChange="updateId"
      >
        <swiper-slide v-for="p in psychologist" :key="p.id">
          <img
            class="w-full h-full object-cover"
            v-if="p.image"
            :src="p.image"
            alt=""
          />
        </swiper-slide>
      </swiper>
      <div class="flex flex-col mt-6" v-if="psychologist?.[slide]">
        <h2 class="text-2xl font-500 m-0">{{ psychologist[slide].name }}</h2>
        <p class="text-lg m-0 font-400 mb-8">
          {{ psychologist[slide].qualification }}
        </p>
        <ion-button
          :disabled="status === 'pending'"
          :router-link="`/therapist/${psychologist[slide].id}`"
          router-direction="forward"
          color="btnPrimary"
          size="large"
          expand="block"
        >
          View details
        </ion-button>
      </div>
      <div v-else-if="status === 'pending'" class="flex justify-center mt-16">
        <ion-spinner />
      </div>
      <div v-else class="text-center opacity-50 mt-16">No data...</div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { arrowBack } from "ionicons/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./style.css";
import { SelectTable } from "~/hono-server/api/config/types/supabase-helpers";

const modules = [EffectCards];
const slide = ref(0);

const router = useRouter();

const searchUrl = computed(() => {
  const url = new URLSearchParams();
  Object.entries(router.currentRoute.value.query).forEach(([key, value]) => {
    if (value) {
      url.set(key, value.toString());
    }
  });

  return "/psychologist?" + url.toString();
});

const {
  execute: fetch,
  data: psychologist,
  status,
} = useApi<SelectTable<"psychologist">[]>(searchUrl, {
  watch: false,
  immediate: false,
});

onIonViewWillEnter(() => {
  fetch();
});

function updateId(s: { activeIndex: number }) {
  slide.value = s.activeIndex;
}
</script>

<style scoped>
ion-button.custom {
  --background: #327155;
  width: max-content;
  --background-activated: #327155;
}
</style>
