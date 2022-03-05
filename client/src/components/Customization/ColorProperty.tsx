import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { IColorPicker } from "../../types/style.types";
import Row from "../styles/Row";
import Modal from "../Modal/Modal";
import {
  convertHSLToString,
  getColorPickerPresetColors,
} from "../../utils/style.utils";
import { ColorPickerContainer } from "../styles/ModalStyles";
import { P } from "../styles/Text";

interface IProps extends IColorPicker {
  preview?: boolean;
}

const ColorProperty: React.FC<IProps> = (props) => {
  const [color, setColor] = useState(props.color);
  const [show, setShow] = useState(false);

  function handleChange({ hsl }: ColorResult) {
    const value = { ...hsl, a: 1 };
    setColor(value);
    props.onChange?.(value);
  }

  return (
    <Row centerItems between>
      <P className="flex-1">{props.title}:</P>
      <div
        className={
          "ml-10 w-20 h-7 rounded-full /relative " +
          (!props.preview ? "cursor-pointer" : "")
        }
        style={{ backgroundColor: `hsl(${convertHSLToString(color)})` }}
        onClick={() => setShow(true)}
      />
      {!props.preview && (
        <Modal show={show} onClose={() => setShow(false)}>
          <ColorPickerContainer onMouseDown={(e) => e.stopPropagation()}>
            <SketchPicker
              disableAlpha
              presetColors={getColorPickerPresetColors()}
              color={color}
              onChange={handleChange}
            />
          </ColorPickerContainer>
        </Modal>
      )}
    </Row>
  );
};
export default ColorProperty;
