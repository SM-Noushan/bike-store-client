export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

export const USER_ROLE = {
  admin: "admin",
  customer: "customer",
} as const;

export const firstPage = {
  key: "page",
  value: "1",
};

export const itemPerDataTable = {
  key: "limit",
  value: "10",
};
