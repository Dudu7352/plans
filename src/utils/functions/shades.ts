import { time } from "console";
import { SHADE_DOWN, SHADE_UP } from "../consts";
import { clamp } from "./clamp";

export function shade(color_str: string, shade: number): string {
  const color = parseInt(color_str.substring(1), 16);
  console.log(shade);
  let r = color >> 16;
  let g = (color >> 8) % 256;
  let b = color % 256;
  console.log(color_str, r, g, b);
  r = clamp(r * shade, 0, 255);
  g = clamp(g * shade, 0, 255);
  b = clamp(b * shade, 0, 255);
  r -= r%1;
  g -= g%1;
  b -= b%1;
  console.log(color_str, r, g, b);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

export let shadeDown = (color_str: string, times: number = 1) =>
  shade(color_str, Math.pow(SHADE_DOWN, times));
export let shadeUp = (color_str: string, times: number = 1) =>
  shade(color_str, Math.pow(SHADE_UP, times));
