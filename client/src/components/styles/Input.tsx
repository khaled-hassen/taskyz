import styled from "styled-components";
import tw from "twin.macro";
import React from "react";

interface IProps {
  noRight?: boolean;
  noLeft?: boolean;
}

export const Input = styled.input<IProps>`
  ${tw`rounded-xl text-gray-900 px-5 py-2 w-full`};
  background-color: hsl(var(--text-color));
  ${({ noRight }) => (noRight ? tw`rounded-r-none` : "")}
  ${({ noLeft }) => (noLeft ? tw`rounded-l-none` : "")}

  &:focus {
    outline: none;
  }
`;

export const IconInputContainer = styled.form<{ expanded?: boolean }>`
  ${({ expanded }) => (expanded ? tw`rounded-3xl` : tw`rounded-full`)};
  ${tw`text-lg border-2 border-white border-opacity-5 py-2 px-5`};

  #error {
    ${tw`mt-2`};
  }

  svg {
    min-height: 20px;
    min-width: 20px;
  }

  input {
    ${tw`w-full bg-transparent ml-4 truncate`};
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: hsla(var(--text-color), 0.6);
    }
  }
`;

export const RangeInputContainer = styled.div<{
  expand: boolean;
  disabled?: boolean;
}>`
  ${tw`relative w-48`};
  transition: height var(--transition-duration) ease;
  ${({ expand }) => (expand ? tw`h-4` : tw`h-2`)};

  input {
    ${tw`appearance-none w-full h-full absolute top-0 rounded-full bg-transparent`};
    -webkit-appearance: none;
    ${({ expand }) => (expand ? tw`overflow-hidden` : "")};

    &::-moz-range-thumb {
      ${tw`appearance-none h-4 w-4 rounded-full border-none`};
      ${({ expand }) => (expand ? tw`rounded-none` : "")};
      ${({ disabled }) => (disabled ? tw`invisible` : "")};
      ${({ expand }) => ({
        backgroundColor: expand ? "transparent" : "hsl(var(--primary-color))",
      })};
      transition: border-radius var(--transition-duration) ease;
    }

    &::-webkit-slider-thumb {
      ${tw`appearance-none h-4 w-4 rounded-full border-none`};
      -webkit-appearance: none;
      ${({ expand }) => (expand ? tw`rounded-none` : "")};
      ${({ expand }) => ({
        backgroundColor: expand ? "transparent" : "hsl(var(--primary-color))",
      })};
      transition: border-radius var(--transition-duration) ease;
    }
  }
`;

export const RangeInputProgress = styled.div<{
  progress: number;
  disabled?: boolean;
}>`
  ${tw`h-full w-full rounded-full overflow-hidden`};
  ${({ disabled }) => (disabled ? "--opacity: 0.15" : "--opacity: 0.4")};
  background-color: hsla(var(--primary-color), var(--opacity));

  &::after {
    content: "";
    display: block;
    ${({ disabled }) => (disabled ? "--opacity: 0.3" : "--opacity: 1")};
    background-color: hsla(var(--primary-color), var(--opacity));
    ${({ progress }) => ({
      width: `calc(${progress} * 1%)`,
    })}
    ${tw`h-full`};
  }
`;
