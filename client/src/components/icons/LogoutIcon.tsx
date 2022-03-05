import React from "react";
import { IIconsProps } from "./icons.props";
import { DangerSvg } from "../styles/SVGStyle";

const LogoutIcon: React.FC<IIconsProps> = ({ size }) => {
  return (
    <DangerSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={size ?? "30"}
      width={size ?? "30"}
      fill="currentColor"
    >
      <path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zM459.31 244.69l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z" />
    </DangerSvg>
  );
};

export default LogoutIcon;
