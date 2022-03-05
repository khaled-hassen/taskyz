import styled from "styled-components";
import tw from "twin.macro";
import { getIsTouchScreen } from "../../utils/browser.utils";

export const CardContainer = styled.div<{ noBorderSmall?: boolean }>`
  background-color: hsla(var(--card-bg-color), var(--bg-opacity));
  ${({ noBorderSmall }) =>
    noBorderSmall ? tw`lg:rounded-3xl` : tw`rounded-3xl`};
  ${tw`py-6 px-9`};
`;

export const TopBarCardContainer = styled.div`
  ${tw`md:px-5 md:py-2 rounded-xl flex justify-center`};
  width: fit-content;
  background-color: hsla(var(--bg-color), var(--bg-opacity));
  backdrop-filter: blur(var(--blur));

  @media screen and (max-width: 768px) {
    background-color: transparent;
    backdrop-filter: none;
  }
`;

const InteractableCard = styled(CardContainer)<{ clickable?: boolean }>`
  ${({ clickable }) => (clickable ? tw`cursor-pointer` : "")};
  ${tw`p-5 py-3`};

  ${() =>
    getIsTouchScreen()
      ? "--delete-btn-display: inline-block;"
      : "--delete-btn-display: none;"};

  &:hover {
    ${() => (getIsTouchScreen() ? "" : "--delete-btn-display: inline-block;")};
  }

  .delete-btn {
    display: var(--delete-btn-display);
  }
`;

export const AuthCard = styled(CardContainer).attrs({
  className: "min-w-18rem max-w-30rem",
})`
  ${tw`py-10 px-8 flex-1`};
`;

export const OverviewCardContainer = styled(CardContainer)`
  ${tw`text-center`};

  h3:first-child {
    ${tw`mb-5`};
  }
`;

export const CardTransitionContainer = styled.div<{ scrollable?: boolean }>`
  & {
    ${tw`mt-4`};
    ${({ scrollable }) => (scrollable ? tw`overflow-auto -mx-8 px-8` : "")};
  }

  &,
  .transition-group {
    & > div {
      ${tw`mb-4`};

      &:last-child {
        ${tw`mb-0`};
      }
    }
  }
`;

export const CollectionCard = styled(InteractableCard)`
  ${tw`w-full`};

  &:last-child {
    ${tw`mr-0 mb-0`};
  }
`;

export const TaskCardContainer = styled(InteractableCard)`
  ${tw`block py-2.5 px-7`};

  h3 {
    ${tw`ml-6`};
  }

  #content {
    ${tw`mb-3`};
  }
`;
