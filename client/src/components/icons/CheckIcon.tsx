import React from "react";
import { IIconsProps } from "./icons.props";
import { CheckSvg } from "../styles/SVGStyle";

const CheckIcon: React.FC<IIconsProps> = ({ size, checked }) => {
  return (
    <CheckSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size ?? "24"}
      height={size ?? "24"}
      fill="currentColor"
      checked={!!checked}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="45"
        d="M369 173L204 371l-96-96"
      />
    </CheckSvg>
  );
};

export default CheckIcon;
