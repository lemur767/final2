import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  "bg-[#a816ec] text-[#ff006e] border-[1px] border-[#ff006e]",
  "bg-[#ff006e] text-[#ffbe0b] border-[1px] border-[#ffbe0b]",
  "bg-[#ffbe0b] text-[#fb5607] border-[1px] border-[#fb5607]",
  "bg-[#fb5607] text-[#ff006e] border-[1px] border-[#ff006e]",

];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};