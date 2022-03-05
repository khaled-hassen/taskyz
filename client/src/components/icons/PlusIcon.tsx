import React from "react";
import { IIconsProps } from "./icons.props";
import { NormalSvg } from "../styles/SVGStyle";

const PlusIcon: React.FC<IIconsProps> = ({ size }) => {
  return (
    <NormalSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size ?? "28"}
      height={size ?? "28"}
      fill="currentColor"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="45"
        d="M256 112v288M400 256H112"
      />
    </NormalSvg>
  );
};

export default PlusIcon;
