import { useState } from "react";
import {
  convertHSLToString,
  getColors,
  getDefaultBgImage,
  setBgImage,
  setCssVariable,
} from "../../utils/style.utils";
import { HSLColor } from "react-color";
import { IConfigFunctions, IImage } from "../../types/style.types";

export function useAppConfig(): IConfigFunctions {
  const [colors, setColors] = useState(getColors());
  const [image, setImage] = useState(getDefaultBgImage());

  function changeBgImage(image: IImage) {
    setBgImage(image.url);
    setImage(image);
  }

  function changeBgColor(color: HSLColor) {
    setCssVariable("--bg-color", convertHSLToString(color));
    setColors((val) => ({ ...val, bgColor: color }));
  }

  function changeTextColor(color: HSLColor) {
    setCssVariable("--text-color", convertHSLToString(color));
    setColors((val) => ({ ...val, textColor: color }));
  }

  function changePrimaryColor(color: HSLColor) {
    const values = convertHSLToString(color).split(", ");
    setCssVariable("--primary-color-hs", `${values[0]}, ${values[1]}`);
    setCssVariable("--primary-color-l", `${values[2]}`);
    setColors((val) => ({ ...val, primaryColor: color }));
  }

  function changeSuccessColor(color: HSLColor) {
    const values = convertHSLToString(color).split(", ");
    setCssVariable("--success-color-hs", `${values[0]}, ${values[1]}`);
    setCssVariable("--success-color-l", `${values[2]}`);
    setColors((val) => ({ ...val, successColor: color }));
  }

  function changeWarningColor(color: HSLColor) {
    setCssVariable("--warning-color", convertHSLToString(color));
    setColors((val) => ({ ...val, warningColor: color }));
  }

  function changeDangerColor(color: HSLColor) {
    const values = convertHSLToString(color).split(", ");
    setCssVariable("--danger-color-hs", `${values[0]}, ${values[1]}`);
    setCssVariable("--danger-color-l", `${values[2]}`);
    setColors((val) => ({ ...val, dangerColor: color }));
  }

  function changeCardBgColor(color: HSLColor) {
    setCssVariable("--card-bg-color", convertHSLToString(color));
    setColors((val) => ({ ...val, cardBgColor: color }));
  }

  function changeOpacity(opacity: number) {
    setCssVariable("--bg-opacity", `${opacity}`);
    setColors((val) => ({ ...val, bgOpacity: opacity }));
  }

  function changeBlurIntensity(blur: number) {
    setCssVariable("--blur", `${blur}rem`);
    setColors((val) => ({ ...val, blur }));
  }

  return {
    bgImage: image,
    colors,
    changeBgImage,
    changeBgColor,
    changeCardBgColor,
    changeTextColor,
    changePrimaryColor,
    changeSuccessColor,
    changeWarningColor,
    changeDangerColor,
    changeOpacity,
    changeBlurIntensity,
  };
}
