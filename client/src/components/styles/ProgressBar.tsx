import styled from "styled-components";
import tw from "twin.macro";

const ProgressBar = styled.div<{ progress: number }>`
  ${tw`h-3 w-20 sm:w-1/5 rounded-full overflow-hidden`};
  background-color: hsla(var(--primary-color), 0.4);
  &::after {
    content: "";
    display: block;
    transition: width 500ms ease-in-out;
    background-color: hsl(var(--primary-color));
    ${({ progress }) => ({
      width: `calc(${progress} * 1%)`,
    })}
    ${tw`h-full`};
  }
`;

export default ProgressBar;
