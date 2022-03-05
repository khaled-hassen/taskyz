import { HSLColor } from "react-color";

export interface IColorPicker {
  color: HSLColor;
  title: string;
  onChange?(color: HSLColor): void;
}

export interface IImage {
  url: string;
  alt: string;
  sourceUrl: string;
  creatorName: string;
  creatorUrl: string;
}

export interface IConfig {
  bgImage: IImage;
  colors: IColors;
}

export interface IConfigFunctions extends IConfig {
  changeBgImage(image: IImage): void;
  changeBgColor(color: HSLColor): void;
  changeCardBgColor(color: HSLColor): void;
  changeTextColor(color: HSLColor): void;
  changePrimaryColor(color: HSLColor): void;
  changeSuccessColor(color: HSLColor): void;
  changeWarningColor(color: HSLColor): void;
  changeDangerColor(color: HSLColor): void;
  changeOpacity(opacity: number): void;
  changeBlurIntensity(blur: number): void;
}

export interface IAppConfig extends IConfigFunctions {
  resetConfig(): void;
}

export interface IColors {
  textColor: HSLColor;
  primaryColor: HSLColor;
  successColor: HSLColor;
  warningColor: HSLColor;
  dangerColor: HSLColor;
  bgColor: HSLColor;
  cardBgColor: HSLColor;
  bgOpacity: number;
  blur: number;
}
export type CSSVariable =
  | "--card-bg-color"
  | "--bg-color"
  | "--text-color"
  | "--primary-color-hs"
  | "--primary-color-l"
  | "--success-color-hs"
  | "--success-color-l"
  | "--warning-color"
  | "--danger-color-hs"
  | "--danger-color-l"
  | "--bg-opacity"
  | "--blur";
