import styled from "styled-components";
import tw from "twin.macro";
import { CardContainer } from "./CardContainer";
import { getBackdropSupport } from "../../utils/browser.utils";

export const ModalContainer = styled.div<{ large?: boolean }>`
  ${tw`bg-gray-900 fixed top-0 left-0 right-0 bottom-0 z-30 flex justify-center`};
  ${() => (getBackdropSupport() ? tw`bg-opacity-10` : tw`bg-opacity-60`)};
  backdrop-filter: blur(var(--blur));

  & > div {
    ${({ large }) =>
      large ? tw`lg:mt-16 lg:w-4/5 lg:h-3/4 h-full w-full` : tw`mt-16`};
  }
`;
export const CustomizationModalContainer = styled.div`
  & > div {
    ${tw`h-full w-full flex flex-col`};
    backdrop-filter: blur(var(--blur));
  }
`;

export const FullParentContainer = styled.div`
  ${tw`min-h-full max-h-full min-w-full max-w-full flex flex-col`};

  & > div {
    ${tw`px-9 -mx-9`};
  }
`;

export const CustomizationMenuContainer = styled.div`
  ${tw`grid auto-rows-max gap-8`};
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
`;

export const ColorPickerContainer = styled(CardContainer).attrs({
  className: "h-fit",
})`
  input,
  label {
    outline: none;
    color: hsl(var(--default-card-bg-color));
  }
`;
