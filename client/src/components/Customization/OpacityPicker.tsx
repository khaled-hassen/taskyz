import React, { useState } from "react";
import { HSLColor } from "react-color";
import Slider from "../Slider/Slider";
import Row from "../styles/Row";
import { P } from "../styles/Text";

interface IProps {
  preview?: boolean;
  color?: HSLColor;
  opacity: number;
  onChange?(opacity: number): void;
}

const OpacityPicker: React.FC<IProps> = (props) => {
  const [opacity, setOpacity] = useState(props.opacity);

  function handleChange(value: number) {
    setOpacity(value);
    props.onChange?.(value);
  }

  return (
    <Row centerItems between wrapItems>
      <Row centerItems between wrapItems expand>
        <P className="flex-1">Background Opacity:</P>
        <P className="w-20 h-7 text-center">{opacity}</P>
      </Row>
      {!props.preview && props.color && (
        <div className="xs:mt-0 mt-3">
          <Slider value={opacity} range={[0, 1]} onChange={handleChange} />
        </div>
      )}
    </Row>
  );
};

export default OpacityPicker;
