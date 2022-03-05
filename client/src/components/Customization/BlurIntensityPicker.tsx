import React, { useState } from "react";
import Slider from "../Slider/Slider";
import Row from "../styles/Row";
import { IconButton } from "../styles/Button";
import WarningIcon from "../icons/WarningIcon";
import BackdropSupportModal from "../Modal/BackdropSupportModal";
import { getBackdropSupport } from "../../utils/browser.utils";
import { P } from "../styles/Text";

interface IProps {
  blur: number;
  preview?: boolean;
  onChange?(blur: number): void;
}

const BlurIntensityPicker: React.FC<IProps> = (props) => {
  const [blur, setBlur] = useState(props.blur);
  const [show, setShow] = useState(false);
  const disabled = !getBackdropSupport();

  function handleChange(value: number) {
    setBlur(value);
    props.onChange?.(value);
  }

  return (
    <>
      <Row centerItems between wrapItems>
        <Row centerItems between wrapItems expand>
          <P className="flex-1">Blur Intensity:</P>
          <Row centerItems between>
            {disabled && (
              <IconButton onClick={() => setShow(true)}>
                <WarningIcon />
              </IconButton>
            )}
            <P
              className={
                "w-20 h-7 text-center " + (disabled ? "opacity-40" : "")
              }
            >
              {blur}
            </P>
          </Row>
        </Row>
        {!props.preview && (
          <div className="xs:mt-0 mt-3">
            <Slider
              disabled={disabled}
              value={blur}
              range={[0, 3]}
              onChange={handleChange}
            />
          </div>
        )}
      </Row>

      <BackdropSupportModal show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default BlurIntensityPicker;
