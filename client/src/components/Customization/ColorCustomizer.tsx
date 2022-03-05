import React, { useContext } from "react";
import _omit from "lodash.omit";
import { FullParentContainer } from "../styles/ModalStyles";
import { H1 } from "../styles/Text";
import { IColorPicker } from "../../types/style.types";
import OpacityPicker from "./OpacityPicker";
import BlurIntensityPicker from "./BlurIntensityPicker";
import ColorProperty from "./ColorProperty";
import { AppConfig } from "../../store/app.config";
import Row from "../styles/Row";
import { IconButton, SuccessButton } from "../styles/Button";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { useMutation } from "@apollo/client";
import { SaveUserConfigMutation } from "../../graphql/user.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";

interface IProps {
  onClose(): void;
}

const ColorCustomizer: React.FC<IProps> = (props) => {
  const config = useContext(AppConfig);
  const colorPickers: IColorPicker[] = [
    {
      title: "Background Color",
      color: config.colors.bgColor,
      onChange: config.changeBgColor,
    },
    {
      title: "Card Background Color",
      color: config.colors.cardBgColor,
      onChange: config.changeCardBgColor,
    },
    {
      title: "Text Color",
      color: config.colors.textColor,
      onChange: config.changeTextColor,
    },
    {
      title: "Primary Color",
      color: config.colors.primaryColor,
      onChange: config.changePrimaryColor,
    },
    {
      title: "Success Color",
      color: config.colors.successColor,
      onChange: config.changeSuccessColor,
    },
    {
      title: "Warning Color",
      color: config.colors.warningColor,
      onChange: config.changeWarningColor,
    },
    {
      title: "Danger Color",
      color: config.colors.dangerColor,
      onChange: config.changeDangerColor,
    },
  ];
  const [saveConfig, {}] = useMutation(SaveUserConfigMutation, {
    fetchPolicy: "no-cache",
    onCompleted: () => toast.success("Config saved"),
    onError: (error) => toast.error(getApolloError(error)),
  });

  function saveColors() {
    saveConfig({
      variables: {
        config: {
          colors: {
            textColor: _omit(config.colors.textColor, ["__typename"]),
            primaryColor: _omit(config.colors.primaryColor, ["__typename"]),
            successColor: _omit(config.colors.successColor, ["__typename"]),
            warningColor: _omit(config.colors.warningColor, ["__typename"]),
            dangerColor: _omit(config.colors.dangerColor, ["__typename"]),
            bgColor: _omit(config.colors.bgColor, ["__typename"]),
            cardBgColor: _omit(config.colors.cardBgColor, ["__typename"]),
            bgOpacity: config.colors.bgOpacity,
            blur: config.colors.blur,
          },
        },
      },
    }).catch(() => {});
  }

  return (
    <FullParentContainer>
      <div className="h-full overflow-auto">
        <Row between>
          <Row centerItems className="mb-6">
            <IconButton
              className="mr-3 transform -translate-x-2"
              onClick={props.onClose}
            >
              <LeftArrowIcon size={30} />
            </IconButton>
            <H1>Customize Colors</H1>
          </Row>
          <div className="w-24">
            <SuccessButton className="py-1" onClick={saveColors}>
              Save
            </SuccessButton>
          </div>
        </Row>
        <div className="grid gap-3">
          {colorPickers.map((item, idx) => (
            <ColorProperty key={idx} {...item} />
          ))}
          <OpacityPicker
            color={config.colors.bgColor}
            opacity={config.colors.bgOpacity}
            onChange={config.changeOpacity}
          />
          <BlurIntensityPicker
            blur={config.colors.blur}
            onChange={config.changeBlurIntensity}
          />
        </div>
      </div>
    </FullParentContainer>
  );
};

export default ColorCustomizer;
