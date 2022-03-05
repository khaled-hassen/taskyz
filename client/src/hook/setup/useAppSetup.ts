import { useAppConfig } from "./useAppConfig";
import { IConfig } from "../../types/style.types";
import { setBgImage } from "../../utils/style.utils";
import { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IGetConfigQuery } from "../../types/graphql.types";
import {
  GetConfigQuery,
  SaveUserConfigMutation,
} from "../../graphql/user.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";
import { useDefaultConfig } from "./useDefaultConfig";

export function useAppSetup(onFinish: () => void) {
  const appConfig = useAppConfig(); // has default config
  const { resetConfig } = useDefaultConfig(appConfig);
  const hasRun = useRef(false);

  const [getConfig, {}] = useLazyQuery<IGetConfigQuery>(GetConfigQuery, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ config }) => setupAppConfig(config),
  });
  const [saveConfig, {}] = useMutation(SaveUserConfigMutation, {
    fetchPolicy: "no-cache",
    onCompleted: () => toast.success("Config saved"),
    onError: (error) => toast.error(getApolloError(error)),
  });

  async function setupAppConfig(config: IConfig | null) {
    if (!config) {
      await saveConfig({
        variables: {
          config: { bgImage: appConfig.bgImage, colors: appConfig.colors },
        },
      }).catch(() => {});
    } else {
      appConfig.changeBgImage(config.bgImage);
      appConfig.changeBgColor(config.colors.bgColor);
      appConfig.changeCardBgColor(config.colors.cardBgColor);
      appConfig.changeTextColor(config.colors.textColor);
      appConfig.changePrimaryColor(config.colors.primaryColor);
      appConfig.changeSuccessColor(config.colors.successColor);
      appConfig.changeWarningColor(config.colors.warningColor);
      appConfig.changeDangerColor(config.colors.dangerColor);
      appConfig.changeOpacity(config.colors.bgOpacity);
      appConfig.changeBlurIntensity(config.colors.blur);
    }

    onFinish();
  }

  useEffect(() => {
    if (!hasRun.current && document.getElementById("body")) {
      setBgImage(appConfig.bgImage.url);
      hasRun.current = true;
    }
  }, [document.getElementById("body")]);

  return { config: appConfig, getConfig, resetConfig };
}
