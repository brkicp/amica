// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxtjs/ionic"],

  ionic: {
    config: {
      mode: "ios",
    },
  },
});
