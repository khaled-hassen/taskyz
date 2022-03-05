import { useRef } from "react";
import { IConfigFunctions } from "../../types/style.types";
import { getDefaultBgImage, getDefaultColors } from "../../utils/style.utils";
import { useMutation } from "@apollo/client";
import { SaveUserConfigMutation } from "../../graphql/user.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";

export function useDefaultConfig(config: IConfigFunctions) {
  const defaultColors = useRef(getDefaultColors());
  const defaultImage = useRef(getDefaultBgImage());

  const [saveConfig, {}] = useMutation(SaveUserConfigMutation, {
    fetchPolicy: "no-cache",
    onCompleted: () => toast.success("Config reset to default"),
    onError: (error) => toast.error(getApolloError(error)),
  });

  function resetConfig(save = true) {
    config.changeBgImage(defaultImage.current);
    config.changeBgColor(defaultColors.current.bgColor);
    config.changeCardBgColor(defaultColors.current.cardBgColor);
    config.changeTextColor(defaultColors.current.textColor);
    config.changePrimaryColor(defaultColors.current.primaryColor);
    config.changeSuccessColor(defaultColors.current.successColor);
    config.changeWarningColor(defaultColors.current.warningColor);
    config.changeDangerColor(defaultColors.current.dangerColor);
    config.changeOpacity(defaultColors.current.bgOpacity);
    config.changeBlurIntensity(defaultColors.current.blur);

    if (!save) return;
    saveConfig({
      variables: {
        config: {
          bgImage: defaultImage.current,
          colors: defaultColors.current,
        },
      },
    }).catch(() => {});
  }

  return { resetConfig };
}
