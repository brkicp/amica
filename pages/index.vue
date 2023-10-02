<template>
  <ion-page>
    <!-- Dialog -->
    <div
      class="bg-black w-screen fixed h-screen z-20001 opacity-30"
      v-if="modal"
      @click="modal = false"
    ></div>
    <div
      class="fixed bottom-0 w-screen h-0 overflow-hidden rounded-t-3xl bg-white z-20002 transition-all px-4 flex flex-col text-dark"
      :class="{
        'h-60vh py-4': modal,
        'h-80vh py-4': modal && modalType === 'symptom',
      }"
    >
      <div
        class="flex justify-between items-center pb-1 border-b-solid border-b-[0.5px] border-primary mb-4"
      >
        <ion-button fill="clear" class="text-dark" @click="modal = false"
          >Cancel</ion-button
        >
        <ion-button fill="clear" class="text-dark" @click="modal = false"
          >Confirm</ion-button
        >
      </div>
      <div class="text-lg flex flex-col" v-if="modalType === 'appType'">
        <ion-text>
          <p>Select appointment type:</p>
        </ion-text>
        <ion-radio-group v-model="filter.appointmentType" class="flex flex-col">
          <ion-radio value="Online" labelPlacement="start" class="mb-4"
            >Online</ion-radio
          >
          <ion-radio value="In person" labelPlacement="start"
            >In Person</ion-radio
          >
        </ion-radio-group>
      </div>
      <div class="text-lg flex flex-col" v-if="modalType === 'years'">
        <ion-input
          label="Enter your age"
          max="105"
          label-placement="stacked"
          class="custom"
          fill="outline"
          placeholder="Enter here"
          type="number"
          v-model="filter.years"
        ></ion-input>
      </div>
      <div class="text-lg flex flex-col" v-if="modalType === 'gender'">
        <ion-text>
          <p>Select your gender:</p>
        </ion-text>
        <ion-radio-group v-model="filter.gender" class="flex flex-col">
          <ion-radio value="M" labelPlacement="start" class="mb-4"
            >Male</ion-radio
          >
          <ion-radio value="F" labelPlacement="start">Female</ion-radio>
        </ion-radio-group>
      </div>
      <div class="text-lg flex flex-col" v-if="modalType === 'price'">
        <ion-text>
          <p>Enter your budget:</p>
        </ion-text>
        <ion-input
          label="From ($)"
          label-placement="stacked"
          fill="outline"
          type="number"
          class="custom mb-4"
          v-model="filter.fromPrice"
          placeholder="Enter"
        ></ion-input>
        <ion-input
          label="To ($)"
          label-placement="stacked"
          class="custom"
          fill="solid"
          type="number"
          v-model="filter.toPrice"
          placeholder="Enter"
        ></ion-input>
      </div>
      <div class="text-lg flex flex-col" v-if="modalType === 'symptom'">
        <ion-text>
          <p>How do you feel?</p>
        </ion-text>
        <ion-radio-group v-model="filter.symptom" class="flex flex-col gap-4">
          <ion-radio
            v-for="d in diagnoses"
            :key="d.name"
            :value="d.name"
            labelPlacement="start"
          >
            {{ d.name }}
          </ion-radio>
        </ion-radio-group>
      </div>
    </div>
    <ion-content>
      <div
        class="flex flex-col justify-between min-h-screen overflow-y-auto overflow-x-hidden"
      >
        <div class="flex justify-between px-8 py-4 relative">
          <div>
            <div
              @click="openProfilePopover($event)"
              v-if="userPhotoUrl"
              class="w-13 h-13 rounded-2xl overflow-hidden c-shadow mt-1"
            >
              <img
                :src="userPhotoUrl"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <ion-button
              v-else
              color="white"
              class="custom-btn-shadow"
              @click="openProfilePopover($event)"
            >
              <ion-icon
                slot="icon-only"
                :icon="person"
                color="dark"
                size="small"
              ></ion-icon>
            </ion-button>

            <ion-popover
              :is-open="profilePopover"
              :event="popoverEvent"
              @didDismiss="profilePopover = false"
            >
              <div class="flex flex-col">
                <ion-button
                  color="white"
                  class="text-dark popover-btn"
                  @click="
                    takePhoto();
                    profilePopover = false;
                  "
                >
                  <ion-icon
                    slot="start"
                    :icon="camera"
                    color="dark"
                    size="small"
                  ></ion-icon>
                  <span>Upload photo</span>
                </ion-button>
                <ion-button
                  color="white"
                  class="text-dark popover-btn"
                  @click="goToProfile"
                >
                  <ion-icon
                    slot="start"
                    :icon="pencil"
                    color="dark"
                    size="small"
                  ></ion-icon>
                  <span>Edit profile</span>
                </ion-button>
              </div>
            </ion-popover>
          </div>
          <ion-button
            @click="logoutAlert"
            color="danger"
            class="custom-btn-shadow"
          >
            <ion-icon
              slot="icon-only"
              :icon="ioniconsLogOut"
              size="small"
            ></ion-icon>
          </ion-button>
        </div>
        <div class="flex flex-col px-6">
          <ion-text>
            <h1 class="text-4xl font-700 mb-0">Welcome,</h1>
            <span class="text-4xl font-700">{{ currentUser?.name }}</span>
          </ion-text>
        </div>
        <div class="px-6 mt-4" v-if="appointments?.length">
          <ion-accordion-group
            class="border border-2px border-solid rounded-2xl border-#ededed overflow-hidden"
          >
            <ion-accordion value="first">
              <ion-item slot="header" color="white" class="rounded-2xl">
                <ion-badge
                  v-if="numOfNewAppointments"
                  color="btnPrimary text-white"
                  slot="end"
                  >{{ numOfNewAppointments }}</ion-badge
                >
                <ion-label>Scheduled appointments</ion-label>
              </ion-item>
              <div
                v-for="a in appointments"
                :key="a.id"
                class="p-2 px-4 flex justify-between items-center border-b-solid border-b-1px border-#ededed"
                slot="content"
              >
                <div>
                  <div class="opacity-60">
                    <div class="flex gap-1 items-center">
                      <ion-icon :icon="ioniconsCalendar" />
                      <div>{{ formatDate(a.startDateTime) }}</div>
                    </div>
                    <div class="flex gap-1 items-center">
                      <ion-icon :icon="ioniconsTime" />
                      <div>
                        {{ formatTime(a.startDateTime) }} -
                        {{ formatTime(a.endDateTime) }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-1 font-bold flex gap-1 items-center">
                    <ion-icon :icon="ioniconsPerson" />
                    <div>
                      {{ a.psychologist.name }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <ion-button
                    @click="deleteAppointment(a.id, a.startDateTime)"
                    :disabled="statusDelete === 'pending'"
                    v-if="a.done"
                    size="small"
                    color="danger"
                  >
                    <ion-icon :icon="ioniconsTrash" />
                  </ion-button>
                  <ion-checkbox
                    @update:model-value="(e: boolean) => updateDoneAppointment(a.id, e)"
                    v-model="a.done"
                    style="--checkmark-color: white"
                    color="btnPrimary"
                  >
                    Done
                  </ion-checkbox>
                </div>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </div>
        <ion-grid class="mt-4 w-full px-6 custom-grid">
          <ion-row class="gap-4 mb-3">
            <ion-col size="7">
              <ion-button
                size="large"
                fill="outline"
                expand="block"
                class="h-25 custom-grid-btn font-700"
                @click="openModal('appType')"
              >
                {{ filter.appointmentType }}
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button
                size="large"
                fill="outline"
                expand="block"
                class="h-25 font-700 custom-grid-btn"
                @click="openModal('years')"
              >
                <div class="flex flex-col items-center">
                  <span class="text-2xl">{{ filter.years }}</span>
                  <span>Year</span>
                </div>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row class="gap-4 mb-3">
            <ion-col>
              <ion-button
                size="large"
                fill="outline"
                expand="block"
                class="h-25 custom-grid-btn font-700"
                @click="openModal('gender')"
              >
                {{ filter.gender || "Gender" }}
              </ion-button>
            </ion-col>
            <ion-col size="7">
              <ion-button
                size="large"
                fill="outline"
                expand="block"
                class="h-25 font-700 custom-grid-btn"
                @click="openModal('price')"
              >
                ${{ filter.fromPrice }} - ${{ filter.toPrice }}
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button
                size="large"
                fill="outline"
                expand="block"
                class="h-25 custom-grid-btn font-700"
                @click="openModal('symptom')"
              >
                {{ filter.symptom || "How do you feel?" }}
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div
          class="relative flex items-center mx-4 mb-4 rounded-lg bg-[#ededed] pl-4 pr-2 py-2 mt-6"
        >
          <div class="absolute top--6 left-4 flex items-center">
            <div
              v-for="p in psychologists"
              :key="p.id"
              class="w-12 h-12 overflow-hidden rounded-full bg-yellow border-3 border-solid border-white"
            >
              <img
                v-if="p.image"
                class="w-full h-full object-cover"
                :src="p.image"
                alt=""
              />
            </div>
          </div>
          <ion-text>
            <p>Apply filters & find your perfect psychologist.</p>
          </ion-text>

          <ion-button
            color="btnPrimary"
            size="large"
            class="custom-btn-shadow h-20 w-30"
            :router-link="searchUrl"
            router-direction="forward"
          >
            <ion-icon
              slot="icon-only"
              :icon="arrowForward"
              size="large"
            ></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { arrowForward, camera, person, pencil } from "ionicons/icons";
import { usePhotoGallery, UserPhoto } from "@/composables/usePhotoGallery";

import {
  AppointmentWithPsychologist,
  SelectTable,
} from "~/hono-server/api/config/types/supabase-helpers";
import { useAlert } from "~/composables/useAlert";

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

function getAge(date: Date) {
  const diff = Date.now() - date.getTime();
  const age = new Date(diff);

  return Math.abs(age.getUTCFullYear() - 1970);
}

const { data: currentUser, execute: refreshCurrentUser } = useApi<
  SelectTable<"users">
>("/users/me", {
  onResponse: (res) => {
    const u = res.response._data as SelectTable<"users">;

    const birthDate = new Date(u.year, u.month - 1, u.day);

    filter.value.years = getAge(birthDate).toString();
    filter.value.gender = u.gender || "M";
    if (photos.value?.base64String) photos.value.base64String = undefined;
  },
});
const { data: diagnoses } = useApi<SelectTable<"diagnose">[]>("/diagnose");
const { data: psychologists } = useApi<SelectTable<"psychologist">[]>(
  "/psychologist?limit=3"
);

const { data: appointments, execute: refreshAppointments} = useApi<AppointmentWithPsychologist[]>(
  "/appointments/my",
  {
    transform: (res) => res.sort((a, b) => b.id - a.id),
  }
);

const numOfNewAppointments = computed(() => {
  return appointments.value?.filter((a) => !a.done).length;
});

const selectedAppointment = ref<{ id: number; done?: boolean }>();

const { execute: updateDone } = useApi("/appointments/done", {
  immediate: false,
  watch: false,
  method: "PUT",
  body: selectedAppointment,
});

const { execute: executeDelete, status: statusDelete } = useApi(
  "/appointments/delete",
  {
    immediate: false,
    watch: false,
    method: "DELETE",
    body: selectedAppointment,
  }
);

function updateDoneAppointment(id: number, done: boolean) {
  selectedAppointment.value = { id, done };
  updateDone();
}

function deleteAppointment(id: number, startDateTime: string) {
  deleteAppointmentAlert(new Date(startDateTime).toLocaleString(), () => {
    selectedAppointment.value = { id };
    executeDelete();
    if (appointments.value)
      appointments.value = appointments.value.filter((a) => a.id !== id);
  });
}

onIonViewWillEnter(() => {
  refreshCurrentUser();
  refreshAppointments();
});

const userPhotoUrl = computed(() => {
  return photos.value?.base64String || currentUser?.value?.profilePhoto;
});

const { takePhoto, photos } = usePhotoGallery();
const { logoutAlert, deleteAppointmentAlert } = useAlert();

const profilePopover = ref(false);
const popoverEvent = ref();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}

function formatTime(dateStr: string) {
  const [HH, MM] = new Date(dateStr).toLocaleTimeString().split(":");

  return `${HH}:${MM}`;
}

function openProfilePopover(e: Event) {
  profilePopover.value = true;
  popoverEvent.value = e;
}

const modal = ref(false);

type Filter = {
  appointmentType: string;
  years: string;
  gender: string;
  fromPrice: number;
  toPrice: number;
  symptom: string;
};

const modalType = ref("");

const filter = ref<Partial<Filter>>({
  appointmentType: "Online",
  years: undefined,
  gender: "M",
  fromPrice: undefined,
  toPrice: undefined,
  symptom: undefined,
});

const router = useRouter();

onBeforeMount(() => {
  const query = router.currentRoute.value.query;
  if (query) {
    Object.assign(filter.value, query);
  }
});

const searchUrl = computed(() => {
  const url = new URLSearchParams();
  Object.entries(filter.value).forEach(([key, value]) => {
    if (value) {
      url.set(key, value.toString());
    }
  });

  return "/therapysts?" + url.toString();
});

watch(filter, (query) => router.replace({ query }), {
  immediate: true,
  deep: true,
});

function goToProfile() {
  profilePopover.value = false;
  router.push("/profile");
}

const openModal = (modalT: string) => {
  modalType.value = modalT;
  modal.value = true;
};
</script>

<style scoped lang="scss">
ion-button.custom-btn-shadow {
  --box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.19);
}

.c-shadow {
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.19);
}

ion-grid.custom-grid {
  ion-col {
    padding: 0px;
  }
}

ion-content {
  --overflow-y: hidden;
}

ion-button.custom-grid-btn {
  --background-activated: #ededed;
  --background-focused: #ededed;
  --color: #000;
  --color-activated: #000;
  --color-focused: #000;
  --border-color: #ededed;
  --border-width: 2px;
  --border-radius: 12px;
}

ion-button.popover-btn {
  --padding-top: 2px;
  --padding-bottom: 2px;
  --padding-start: 2px;
}

ion-radio {
  --border-radius: 4px;
  --inner-border-radius: 4px;

  --color: #ddd;
  --color-checked: #ff844c;
}

ion-radio.ios::part(container) {
  width: 20px;
  height: 20px;

  border: 2px solid #ddd;
  border-radius: 4px;
}

.radio-checked.ios::part(container) {
  border-color: #ff844c;
}

ion-input.custom {
  --background: #eeeeee;
  --padding-start: 12px;
  --border-radius: 12px;
}
</style>
