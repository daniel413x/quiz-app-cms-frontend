import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toKebabCase(str: string) {
  return str.split(/\s|(?=[A-Z])/).join("-").toLowerCase();
}

export const errorCatch = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === "object") {
      return error.response.data.message[0];
    }
    return error.response.data.message;
  }
  return error.message;
};

export const makeSlug = (string: string) => {
  const id = string.toLowerCase().split(" ").filter(Boolean).join("-");
  return id;
};

export const createFakeDelay = async (res: Response) => {
  const ms = Math.floor(Math.random() * (150 - 50) + 50);
  const fakeDelay = new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  const results = await Promise.all([res, fakeDelay]);
  return results;
};
