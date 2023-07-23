import { SHADE_DOWN } from "../consts";
import { clamp } from "./clamp";

export function shadeDown(color_str: string): string {
  let color = parseInt(color_str.substring(1), 16);
  let r = color >> 16;
  let g = color >> 8 % 256;
  let b = color % 256;
  r = clamp(r * SHADE_DOWN, 0, 255);
  g = clamp(g * SHADE_DOWN, 0, 255);
  b = clamp(b * SHADE_DOWN, 0, 255);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
