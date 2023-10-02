import { UseFetchOptions } from "nuxt/app";
import { alertController } from "@ionic/vue";
import { BASE_URL } from "~/hono-server/api/auth/constants";

export const useApi = <T>(
  url: string | ComputedRef<string>,
  options: UseFetchOptions<T> = {}
) => {
  if (!options.baseURL) options.baseURL = BASE_URL;

  if (!options.headers) {
    options.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "" + localStorage.getItem("token"),
    };
  }

  if (!options.onResponseError) {
    options.onResponseError = async (e) => {
      const { error } = e.response._data;

      alertController
        .create({
          animated: true,
          header: "Alert",
          subHeader: "Error message",
          message: error,
          buttons: [{ text: "OK" }],
        })
        .then((alert) => alert.present());
    };
  }

  return useFetch(url, options);
};
