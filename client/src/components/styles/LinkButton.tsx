import styled from "styled-components";
import tw from "twin.macro";

const LinkButton = styled.button.attrs({ type: "button" })<{
  inherit?: boolean;
}>`
  ${tw`hover:underline`};
  ${({ inherit }) => (inherit ? "" : tw`text-lg`)};
  color: hsl(var(--light-primary-color));

  &:focus {
    outline: none;
  }
`;

export default LinkButton;
