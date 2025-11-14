import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ErrorDetailField } from "./types";

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

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const parseErrorMessage = (detail?: ErrorDetailField) => {
  if (
    Array.isArray(detail) &&
    detail.every((item) => "type" in item && "msg" in item)
  ) {
    console.log("It's an array of ErrorResponseDetailShape");
    const { loc, msg } = detail[0];
    const location = loc[1] ?? loc[0] ?? "input";
    const message = `${capitalizeText(location)}: ${msg}`;

    return message;
  } else if (typeof detail === "string") {
    return detail;
  } else {
    return "An unknown error occurred.";
  }
};
