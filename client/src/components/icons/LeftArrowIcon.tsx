import React from "react";
import { IIconsProps } from "./icons.props";
import { NormalSvg } from "../styles/SVGStyle";

const LeftArrowIcon: React.FC<IIconsProps> = ({ size }) => {
  return (
    <NormalSvg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? "25"}
      height={size ?? "25"}
      fill="currentColor"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M328 112L184 256l144 144"
      />
    </NormalSvg>
  );
};

export default LeftArrowIcon;
