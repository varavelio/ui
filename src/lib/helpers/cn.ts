import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines class names using clsx and tailwind-merge.
 * It takes any number of class name inputs and returns a single string of class names, with duplicates removed and Tailwind CSS classes merged appropriately.
 *
 * @param inputs - An array of class name inputs, which can be strings, arrays, or objects.
 * @returns A single string of class names with duplicates removed and Tailwind CSS classes merged.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
