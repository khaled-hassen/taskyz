import styled from "styled-components";
import tw from "twin.macro";
import { CardContainer } from "./CardContainer";
import Row from "./Row";

export const DatePickerContainer = styled.div`
  width: fit-content;
  background-color: hsla(var(--bg-color), var(--bg-opacity));
  ${tw`relative rounded-full px-5 py-0.5`};
`;

export const CalendarContainer = styled(CardContainer)`
  ${tw`p-4 w-72 shadow-xl`};
  height: fit-content;
  min-width: 20rem;
  overflow: auto;
  backdrop-filter: blur(var(--blur));

  #date {
    p:first-child {
      ${tw`font-bold`};
    }
    p:last-child {
      ${tw`ml-2`};
      color: hsl(var(--text-color));
    }
  }

  #days {
    ${tw`mt-1 mb-3`};

    p {
      ${tw`w-6 font-medium text-xs`};
    }
  }
`;

export const DatesContainer = styled(Row).attrs({ wrapItems: true })<{
  monthStartDay: number;
}>`
  & > div:first-child {
    ${({ monthStartDay }) => ({ width: `calc(${monthStartDay / 7} * 100%)` })}
  }
`;

export const DateText = styled.p<{ active: boolean }>`
  ${tw`cursor-pointer text-center text-sm rounded-xl leading-loose px-1 mb-1`};
  --right-margin: 3.5%;
  width: calc(1 / 7 * 100% - var(--right-margin));
  margin-right: var(--right-margin);
  &:last-child {
    margin-right: 0;
  }

  ${({ active }) => ({
    backgroundColor: active ? "hsl(var(--primary-color))" : "transparent",
  })};

  &:hover {
    ${({ active }) => ({
      backgroundColor: active
        ? "hsl(var(--primary-color))"
        : "hsla(var(--primary-color), 0.3)",
    })};
  }
`;
