import React from "react";
import { IIconsProps } from "./icons.props";
import { NormalSvg } from "../styles/SVGStyle";

const CancelIcon: React.FC<IIconsProps> = ({ size }) => {
  return (
    <NormalSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size ?? "20"}
      height={size ?? "20"}
      fill="currentColor"
      transform="scale(1.5)"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="45"
        d="M357.823 154.177l-203.647 203.647M357.823 357.823 154.177 154.177"
      />
    </NormalSvg>
  );
};

export default CancelIcon;
