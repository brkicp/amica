const UNPROTECTED_ROUTES = ["/get-started", "/sign-in", "/sign-up"];

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return UNPROTECTED_ROUTES.includes(to.path)
      ? undefined
      : navigateTo("/get-started");
  } else {
    return UNPROTECTED_ROUTES.includes(to.path) ? navigateTo("/") : undefined;
  }
});
