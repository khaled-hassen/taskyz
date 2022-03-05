import styled from "styled-components";
import tw from "twin.macro";

export const NormalSvg = styled.svg`
  path,
  circle,
  rect {
    color: hsl(var(--text-color));
  }
`;

export const WarningSvg = styled.svg`
  path {
    color: hsl(var(--warning-color));
  }
`;

export const DangerSvg = styled.svg`
  path {
    color: hsl(var(--danger-color));
  }
`;

export const CheckSvg = styled.svg<{ checked: boolean }>`
  ${tw`border-2`}
  border-color: hsl(var(--text-color));
  ${tw`rounded-xl`};

  path {
    ${({ checked }) => ({
      color: checked ? "hsl(var(--text-color))" : "transparent",
    })}
`;
