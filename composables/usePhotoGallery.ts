import { ref } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { usePhotoUploader } from "./usePhotoUploader";

export type UserPhoto = {
  filepath: string;
  base64String?: string;
};

export const usePhotoGallery = () => {
  const photos = ref<UserPhoto>();
  const { uploadImage } = usePhotoUploader();

  watch(photos, () => {
    if (photos.value?.base64String) uploadImage(photos.value.base64String);
  });

  const takePhoto = async () => {
    const result = await Camera.checkPermissions();

    if (!result.camera || !result.photos) {
      const res = await Camera.requestPermissions({
        permissions: ["camera", "photos"],
      });

      if (!res.camera || !res.photos) {
        return;
      }
    }

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      quality: 20,
      allowEditing: true,
      presentationStyle: "fullscreen",
      promptLabelHeader: "Take a photo",
      saveToGallery: true,
      width: 720,
      height: 1280,
    });

    const fileName = Date.now() + ".jpeg";
    const savedFileImage = {
      filepath: fileName,
      base64String: "data:image/jpeg;base64," + photo.base64String + "",
    };

    photos.value = savedFileImage;
  };

  return {
    takePhoto,
    photos,
  };
};
