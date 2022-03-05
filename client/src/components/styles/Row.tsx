import styled from "styled-components";
import tw from "twin.macro";

interface IProps {
  center?: boolean;
  centerItems?: boolean;
  between?: boolean;
  wrapItems?: boolean;
  expand?: boolean;
}

const Row = styled.div<IProps>`
  ${tw`flex`};
  ${({ wrapItems }) => (wrapItems ? tw`flex-wrap` : "")}
  ${({ expand }) => (expand ? tw`flex-1` : "")}
  ${({ center }) => (center ? tw`justify-center` : "")}
  ${({ centerItems }) => (centerItems ? tw`items-center` : "")}
  ${({ between }) => (between ? tw`justify-between` : "")}
`;

export default Row;
