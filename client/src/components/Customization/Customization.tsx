import React, { useContext, useState } from "react";
import { H1, H2 } from "../styles/Text";
import LinkButton from "../styles/LinkButton";
import Image from "../Image/Image";
import ImageViewer from "../Image/ImageViewer";

import {
  CustomizationMenuContainer,
  FullParentContainer,
} from "../styles/ModalStyles";
import { IColorPicker, IImage } from "../../types/style.types";
import OpacityPicker from "./OpacityPicker";
import BlurIntensityPicker from "./BlurIntensityPicker";
import ColorProperty from "./ColorProperty";
import Row from "../styles/Row";
import { AppConfig } from "../../store/app.config";
import { DangerButton, IconButton } from "../styles/Button";
import ResetConfigWarning from "./ResetConfigWarning";
import CancelIcon from "../icons/CancelIcon";

interface IProps {
  image: IImage | null;
  showImage: boolean;
  onSearch(): void;
  onChangeColors(): void;
  openImage(image: IImage): void;
  closeImage(): void;
  onClose(): void;
}

const Customization: React.FC<IProps> = (props) => {
  const [showWarning, setShowWarning] = useState(false);
  const { colors, bgImage } = useContext(AppConfig);
  const { resetConfig } = useContext(AppConfig);

  const colorPickers: IColorPicker[] = [
    { title: "Background Color", color: colors.bgColor },
    { title: "Card Background Color", color: colors.cardBgColor },
    { title: "Text Color", color: colors.textColor },
    { title: "Primary Color", color: colors.primaryColor },
    { title: "Success Color", color: colors.successColor },
    { title: "Warning Color", color: colors.warningColor },
    { title: "Danger Color", color: colors.dangerColor },
  ];

  return (
    <FullParentContainer>
      {!props.showImage && (
        <div className="overflow-auto">
          <Row between centerItems className="mb-4">
            <Row centerItems>
              <IconButton className="mr-5" onClick={props.onClose}>
                <CancelIcon size={24} />
              </IconButton>
              <H1>Customize</H1>
            </Row>
            <div className="w-24">
              <DangerButton
                className="py-1"
                onClick={() => setShowWarning(true)}
              >
                Reset
              </DangerButton>
            </div>
          </Row>
          <CustomizationMenuContainer>
            <div>
              <Row between centerItems className="mb-6">
                <H2>App Colors</H2>
                <LinkButton onClick={props.onChangeColors}>Change</LinkButton>
              </Row>
              <div className="grid gap-3">
                {colorPickers.map((item, idx) => (
                  <ColorProperty key={idx} preview {...item} />
                ))}
                <OpacityPicker preview opacity={colors.bgOpacity} />
                <BlurIntensityPicker preview blur={colors.blur} />
              </div>
            </div>
            <div>
              <Row between centerItems className="mb-6">
                <H2>Background Image</H2>
                <LinkButton onClick={props.onSearch}>Change</LinkButton>
              </Row>
              <Image image={bgImage} onClick={() => props.openImage(bgImage)} />
            </div>
          </CustomizationMenuContainer>
        </div>
      )}
      {props.showImage && props.image && (
        <ImageViewer image={props.image!} onClose={props.closeImage} />
      )}

      <ResetConfigWarning
        show={showWarning}
        onReset={resetConfig}
        onClose={() => setShowWarning(false)}
      />
    </FullParentContainer>
  );
};

export default Customization;
