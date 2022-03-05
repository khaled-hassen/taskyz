import { CSSVariable, IColors, IImage } from "../types/style.types";
import { HSLColor } from "react-color";
import { PresetColor } from "react-color/lib/components/sketch/Sketch";
import { getBackdropSupport } from "./browser.utils";

export function getDefaultBgImage(): IImage {
  return {
    url:
      "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDE3MzR8MHwxfHNlYXJjaHwzMXx8bm90ZXN8ZW58MHwwfHx8MTYyODM0NDAwMg&ixlib=rb-1.2.1&q=80&w=1080",
    alt:
      "yellow sticky notes beside white apple magic mouse and white apple keyboard",
    sourceUrl: "https://unsplash.com/photos/-nz-GTuvyBw",
    creatorName: "Kelly Sikkema",
    creatorUrl: "https://unsplash.com/@kellysikkema",
  };
}

export function setBgImage(url: string) {
  const body = document.getElementById("body");
  if (!body) return;
  body.style.backgroundImage = `url("${url}")`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
  body.style.backgroundSize = "cover";
}

export function getDefaultColors(): IColors {
  const style = getComputedStyle(document.body);
  const textColor = style.getPropertyValue("--default-text-color");
  const primaryColor = style.getPropertyValue("--default-primary-color");
  const successColor = style.getPropertyValue("--default-success-color");
  const warningColor = style.getPropertyValue("--default-warning-color");
  const dangerColor = style.getPropertyValue("--default-danger-color");
  const bgColor = style.getPropertyValue("--default-bg-color");
  const cardBgColor = style.getPropertyValue("--default-card-bg-color");
  const bgOpacity = style.getPropertyValue("--default-bg-opacity");
  const blur = style.getPropertyValue("--default-blur");

  return {
    textColor: getColorHSL(textColor),
    primaryColor: getColorHSL(primaryColor),
    successColor: getColorHSL(successColor),
    warningColor: getColorHSL(warningColor),
    dangerColor: getColorHSL(dangerColor),
    bgColor: getColorHSL(bgColor),
    cardBgColor: getColorHSL(cardBgColor),
    bgOpacity: getBackdropSupport() ? parseFloat(bgOpacity) : 0.95,
    blur: parseFloat(blur.slice(0, -3)),
  };
}

export function getColors(): IColors {
  const style = getComputedStyle(document.body);
  const textColor = style.getPropertyValue("--text-color");
  const primaryColor = style.getPropertyValue("--primary-color");
  const successColor = style.getPropertyValue("--success-color");
  const warningColor = style.getPropertyValue("--warning-color");
  const dangerColor = style.getPropertyValue("--danger-color");
  const bgColor = style.getPropertyValue("--bg-color");
  const cardBgColor = style.getPropertyValue("--card-bg-color");
  const bgOpacity = style.getPropertyValue("--bg-opacity");
  const blur = style.getPropertyValue("--blur");

  return {
    textColor: getColorHSL(textColor),
    primaryColor: getColorHSL(primaryColor),
    successColor: getColorHSL(successColor),
    warningColor: getColorHSL(warningColor),
    dangerColor: getColorHSL(dangerColor),
    bgColor: getColorHSL(bgColor),
    cardBgColor: getColorHSL(cardBgColor),
    bgOpacity: parseFloat(bgOpacity),
    blur: parseFloat(blur.slice(0, -3)),
  };
}

export function getColorHSL(color: string): HSLColor {
  //  color format h, s, l
  const hsl = color.split(",").map((c) => parseInt(c.trim()));
  return { h: hsl[0], s: hsl[1] / 100, l: hsl[2] / 100, a: 1 };
}

export function getColorPickerPresetColors(): PresetColor[] {
  const colors = getDefaultColors();
  const presetColors: PresetColor[] = [];

  for (const color of Object.keys(colors)) {
    if (typeof (colors as any)[color] === "number") continue;
    const hex = convertHSLToHex((colors as any)[color] as HSLColor);
    presetColors.push({ title: hex, color: hex });
  }

  return presetColors;
}

export function convertHSLToHex({ h, s, l }: HSLColor) {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function convertHSLToString(color: HSLColor) {
  // return format h, s, l
  return `${color.h}, ${color.s * 100}%, ${color.l * 100}%`;
}

export function setCssVariable(variable: CSSVariable, value: string) {
  document.documentElement.style.setProperty(variable, value);
}
