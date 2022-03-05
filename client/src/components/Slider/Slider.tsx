import React, { ChangeEvent, useState } from "react";
import { RangeInputContainer, RangeInputProgress } from "../styles/Input";
import { getIsTouchScreen } from "../../utils/browser.utils";

interface IProps {
  disabled?: boolean;
  value: number;
  range: [number, number];
  onChange(value: number): void;
}

const Slider: React.FC<IProps> = (props) => {
  const [progress, setProgress] = useState(calcProgress(props.value));
  const [expand, setExpand] = useState(false);

  function calcProgress(value: number) {
    const min = props.range[0];
    const max = props.range[1];
    return ((value - min) / (max - min)) * 100;
  }

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (props.disabled) return;
    const value = parseFloat(target.value);
    props.onChange(parseFloat(target.value));
    setProgress(calcProgress(value));
  }

  function handleExpand(touch: boolean) {
    if (props.disabled) return;
    if (touch) return () => getIsTouchScreen() && setExpand(true);
    return () => !getIsTouchScreen() && setExpand(true);
  }

  function handleShrink(touch: boolean) {
    if (props.disabled) return;
    if (touch) return () => getIsTouchScreen() && setExpand(false);
    return () => !getIsTouchScreen() && setExpand(false);
  }

  return (
    <RangeInputContainer
      expand={expand}
      disabled={props.disabled}
      onMouseDown={handleExpand(false)}
      onMouseUp={handleShrink(false)}
      onTouchStart={handleExpand(true)}
      onTouchEnd={handleShrink(true)}
    >
      <RangeInputProgress disabled={props.disabled} progress={progress} />
      <input
        type="range"
        disabled={props.disabled}
        min={props.range[0]}
        max={props.range[1]}
        value={props.value}
        step={0.01}
        onChange={handleChange}
      />
    </RangeInputContainer>
  );
};

export default Slider;
