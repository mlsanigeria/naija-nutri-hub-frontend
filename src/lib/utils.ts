import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskEmail = (email: string = "") => {
  const [user, domain] = email.split("@");
  const maskedEmail = `***${user.slice(
    Math.max(0, user.length - 3),
    user.length,
  )}@${domain}`;

  return maskedEmail;
};


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskEmail = (email: string = "") => {
  const [user, domain] = email.split("@");
  const maskedEmail = `***${user.slice(
    Math.max(0, user.length - 3),
    user.length,
  )}@${domain}`;

  return maskedEmail;
};

/**
 * Creates a FormData object for a food classification request.
 * @param imageFile The image file to be uploaded.
 * @param fieldName The name of the form field for the image. Defaults to 'image'.
 * @returns A FormData object containing the image file.
 */
export const createFoodClassificationFormData = (imageFile: File, fieldName: string = 'image'): FormData => {
  const formData = new FormData();
  formData.append(fieldName, imageFile, imageFile.name);
  return formData;
};

/**
 * Compresses an image file by resizing it and reducing its JPEG quality.
 * This function aims to optimize images for upload by reducing file size
 * while maintaining reasonable visual quality.
 *
 * @param imageFile The original image File object.
 * @returns A Promise that resolves with the compressed File object (as JPEG),
 *          or rejects with an error if compression fails.
 */
export const compressImage = (imageFile: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error('Failed to read file: FileReader result is null.'));
      }

      const img = new Image();
      img.onload = () => {
        const MAX_DIMENSION = 1024; // Max width or height for the compressed image
        const JPEG_QUALITY = 0.7;   // JPEG quality (0.0 to 1.0)

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions to fit within MAX_DIMENSION while preserving aspect ratio
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          } else {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Failed to get 2D rendering context for canvas.'));
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas content to a Blob as a JPEG image
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new File object from the Blob.
              // Replace the original extension with .jpeg as we are converting to JPEG format.
              const newFileName = imageFile.name.replace(/\.[^/.]+$/, "") + ".jpeg";
              const newFile = new File([blob], newFileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(newFile);
            } else {
              reject(new Error('Failed to compress image: Canvas to Blob conversion failed.'));
            }
          },
          'image/jpeg',
          JPEG_QUALITY
        );
      };
      img.onerror = (error) => reject(new Error(`Failed to load image for compression: ${error}`));
      img.src = event.target.result as string;
    };
    reader.onerror = (error) => reject(new Error(`Failed to read file for compression: ${error}`));
    reader.readAsDataURL(imageFile);
  });
};