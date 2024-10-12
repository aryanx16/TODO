import { clsx } from "clsx";  // Only import clsx
import { twMerge } from "tailwind-merge";  // Import twMerge

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
