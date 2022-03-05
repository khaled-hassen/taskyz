import { DefaultToastOptions } from "react-hot-toast/dist/core/types";

export const toasterConfig: DefaultToastOptions = {
  style: {
    backgroundColor: "hsla(var(--card-bg-color), var(--bg-opacity))",
    color: "hsl(var(--text-color))",
    backdropFilter: "blur(var(--blur))",
    borderRadius: "9999px",
  },
};
