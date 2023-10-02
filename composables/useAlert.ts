import { alertController } from "@ionic/vue";

export const useAlert = () => {
  const router = useRouter();

  function logoutAlert() {
    alertController
      .create({
        animated: true,
        header: "Logout?",
        subHeader: "",
        message: "Are you sure you want to logout?",
        buttons: [
          {
            text: "OK",
            cssClass: "text-red! font-bold!",
            handler: async () => {
              localStorage.removeItem("token");
              await router.replace("/sign-in");
              router.go(0);
            },
          },
          { text: "Cancel" },
        ],
      })
      .then((alert) => alert.present());
  }

  function passwordUpdate() {
    alertController
      .create({
        animated: true,
        header: "Password update",
        subHeader: "Password updated successfully.",
        message: "Now you can login with your new password.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              router.replace("/");
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  function scheduleAlert() {
    alertController
      .create({
        animated: true,
        header: "Scheduled appointment 🎉🎉",
        subHeader: "Appointment scheduled successfully",
        message: "Now you can view your appointment in your history.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              router.replace("/");
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  function deleteAppointmentAlert(appointment: string, handler: () => void) {
    alertController
      .create({
        animated: true,
        header: "Delete appointment?",
        subHeader: "This will delete your appointment from history.",
        message: `Are you sure you want to delete this appointment ${appointment}?`,
        buttons: [
          {
            text: "OK",
            cssClass: "text-red! font-bold!",
            handler,
          },
          { text: "Cancel" },
        ],
      })
      .then((alert) => alert.present());
  }

  return { logoutAlert, passwordUpdate, deleteAppointmentAlert, scheduleAlert };
};
