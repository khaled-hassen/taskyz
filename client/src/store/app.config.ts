import { createContext } from "react";
import { IAppConfig } from "../types/style.types";

export const AppConfig = createContext<IAppConfig>({
  bgImage: {
    url: "",
    alt: "",
    sourceUrl: "",
    creatorName: "",
    creatorUrl: "",
  },
  colors: {
    bgColor: { h: 0, s: 0, l: 0 },
    cardBgColor: { h: 0, s: 0, l: 0 },
    textColor: { h: 0, s: 0, l: 0 },
    primaryColor: { h: 0, s: 0, l: 0 },
    successColor: { h: 0, s: 0, l: 0 },
    warningColor: { h: 0, s: 0, l: 0 },
    dangerColor: { h: 0, s: 0, l: 0 },
    bgOpacity: 1,
    blur: 0,
  },
  changeBgImage() {},
  changeBgColor() {},
  changeCardBgColor() {},
  changeTextColor() {},
  changePrimaryColor() {},
  changeSuccessColor() {},
  changeWarningColor() {},
  changeDangerColor() {},
  changeOpacity() {},
  changeBlurIntensity() {},
  resetConfig() {},
});
