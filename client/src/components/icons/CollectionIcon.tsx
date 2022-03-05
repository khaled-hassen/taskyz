import React from "react";
import { IIconsProps } from "./icons.props";
import { NormalSvg } from "../styles/SVGStyle";

const CollectionIcon: React.FC<IIconsProps> = ({ size }) => {
  return (
    <NormalSvg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? "24"}
      height={size ?? "24"}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z" />
    </NormalSvg>
  );
};

export default CollectionIcon;
