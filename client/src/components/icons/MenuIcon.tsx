import React from "react";
import { IIconsProps } from "./icons.props";

const MenuIcon: React.FC<IIconsProps> = ({}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="35"
        style={{ color: "hsl(var(--text-color))" }}
        d="M130 160h250M130 270h250M130 380h250"
      />
    </svg>
  );
};

export default MenuIcon;
