import { BASE_URL } from "~/hono-server/api/auth/constants";

export const usePhotoUploader = () => {
  // function to upload image
  const uploadImage = async (profilePhoto: string) => {
    const response = await $fetch("/users/update", {
      method: "PUT",
      body: { profilePhoto },
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "" + localStorage.getItem("token"),
      },
    });

    return response;
  };

  return { uploadImage };
};
