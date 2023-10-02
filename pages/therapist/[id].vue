<template>
  <ion-page>
    <div
      class="bg-black w-screen fixed h-screen z-20001 opacity-30"
      v-if="modal"
      @click="modal = false"
    ></div>
    <div
      class="fixed bottom-0 w-screen h-0 overflow-hidden rounded-t-3xl bg-white z-20002 transition-all px-4 flex flex-col text-dark"
      :class="{
        'h-80vh py-4': modal,
      }"
    >
      <div
        class="flex justify-between items-center pb-1 border-b-solid border-b-[0.5px] border-primary mb-4"
      >
        <ion-button fill="clear" class="text-dark" @click="modal = false"
          >Cancel</ion-button
        >
        <ion-button
          fill="clear"
          class="text-dark"
          @click="
            schedule();
            modal = false;
          "
          >Schedule</ion-button
        >
      </div>

      <div class="text-lg flex flex-col gap-4">
        <ion-text>
          <p class="mt-0">Select date:</p>
          <div class="flex">
            <ion-datetime-button datetime="datetime" />
          </div>
        </ion-text>

        <div class="flex gap-2 justify-between">
          <ion-text>
            <p class="mt-0">Select time range:</p>
            <div class="flex gap-4 items-center">
              <ion-datetime-button datetime="time" />
              <div><ion-icon :icon="ioniconsArrowForward" /></div>
              <ion-datetime-button datetime="time2" />
            </div>
          </ion-text>
        </div>

        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            presentation="date"
            prefer-wheel
            :min="new Date().toISOString()"
            v-model="dates.date"
            id="datetime"
          />
        </ion-modal>

        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            presentation="time"
            prefer-wheel
            v-model="dates.startDateTime"
            id="time"
          />
        </ion-modal>

        <ion-modal :keep-contents-mounted="true">
          <ion-datetime
            presentation="time"
            prefer-wheel
            v-model="dates.endDateTime"
            id="time2"
          />
        </ion-modal>

        <ion-textarea
          label="Additional notes"
          label-placement="floating"
          placeholder="Write down any additional notes for the therapist"
          class="custom"
          v-model="form.notes"
        ></ion-textarea>
      </div>
    </div>
    <ion-content>
      <div class="px-6 flex flex-col pt-8 justify-between pb-8">
        <div class="flex flex-col">
          <ion-button
            class="custom mb-10"
            @click="$router.go(-1)"
            router-direction="backward"
          >
            <ion-icon slot="start" :icon="arrowBack"></ion-icon>
            Back
          </ion-button>
          <div class="w-full h-320px rounded-2xl overflow-hidden">
            <img
              v-if="psychologist?.image"
              class="w-full h-full object-cover"
              :src="psychologist?.image"
              alt=""
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <ion-spinner />
            </div>
          </div>
          <div class="flex flex-col mt-6">
            <h2 class="text-2xl font-500 m-0">{{ psychologist?.name }}</h2>
            <p class="text-lg m-0 font-400 mb-4">
              {{ psychologist?.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="flex items-center rounded-2xl bg-#327155 p-4">
                Age: {{ psychologist?.age }}
              </div>
              <div class="flex items-center rounded-2xl bg-#327155 p-4">
                Years of experience: {{ psychologist?.years_of_expirence }}
              </div>
              <div class="flex items-center rounded-2xl bg-#327155 p-4">
                Degree: {{ psychologist?.degree }}
              </div>

              <div class="flex items-center rounded-2xl bg-#327155 p-4">
                Qualification: {{ psychologist?.qualification }}
              </div>
            </div>
          </div>
        </div>
        <ion-button
          @click="modal = true"
          color="btnPrimary"
          size="large"
          expand="block"
          >Schedule an appointment
          <ion-spinner v-if="status === 'pending'" class="ml-2" />
        </ion-button>
      </div> </ion-content
  ></ion-page>
</template>

<script setup lang="ts">
import { arrowBack } from "ionicons/icons";
import { SelectTable } from "~/hono-server/api/config/types/supabase-helpers";

const router = useRouter();

const { scheduleAlert } = useAlert();

const { data: psychologist } = useApi<SelectTable<"psychologist">>(
  `/psychologist?id=${router.currentRoute.value.params.id}`
);

const modal = ref(false);

const now = new Date();
now.setHours(now.getHours() + 2);

const d = new Date(now).toJSON();
const d2 = new Date(now);
d2.setHours(d2.getHours() + 1);

const dates = ref({
  date: d,
  startDateTime: d,
  endDateTime: d2.toJSON(),
});

const form = reactive({
  notes: "",
});

function getDates() {
  const [date] = dates.value.date.split("T");
  const [_, startTime] = dates.value.startDateTime.split("T");
  const [startHour, startMinute] = startTime.split(":");

  const [__, endTime] = dates.value.endDateTime.split("T");
  const [endHour, endMinute] = endTime.split(":");

  const startDateTime = new Date(date);
  startDateTime.setHours(Number(startHour));
  startDateTime.setMinutes(Number(startMinute));

  const endDateTime = new Date(date);
  endDateTime.setHours(Number(endHour));
  endDateTime.setMinutes(Number(endMinute));

  return { startDateTime, endDateTime };
}

const body = computed(() => ({
  ...getDates(),
  psychologistId: router.currentRoute.value.params.id,
  notes: form.notes,
}));

const { execute: schedule, status } = useApi("/appointments/schedule", {
  immediate: false,
  watch: false,
  method: "POST",
  body,
  onResponse: (res) => {
    if (res.response.status === 200) {
      scheduleAlert();
    }
  },
});
</script>

<style scoped>
ion-button.custom {
  --background: #327155;
  width: max-content;
  --background-activated: #327155;
}

ion-content {
  --background: #2a6049;
  --color: #fff;
  overflow-y: auto;
}

ion-textarea.custom {
  --background: #eeeeee;
  --padding-start: 12px;
  --border-radius: 12px;
}
</style>
