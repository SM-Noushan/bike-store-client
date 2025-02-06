import { CLOUDINARY_CONFIG } from "@/constants/Constant";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  formData.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Failed to upload image");

    const data = await response.json();
    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
