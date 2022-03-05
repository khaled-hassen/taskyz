import styled from "styled-components";
import tw from "twin.macro";

export const H1 = styled.h1`
  ${tw`text-3xl capitalize`};
`;

export const Title = styled.h1<{ small?: boolean }>`
  ${({ small }) => (small ? tw`text-3xl` : tw`text-7xl`)};
  ${tw`font-semibold`};
  width: fit-content;
  color: hsl(var(--text-color));

  &:first-letter {
    ${tw`uppercase`};
  }
`;

export const H2 = styled.h2`
  ${tw`text-2xl`};

  &:first-letter {
    ${tw`uppercase`};
  }
`;

export const H3 = styled.h3`
  ${tw`text-xl`};

  &:first-letter {
    ${tw`uppercase`};
  }
`;

const EditableHeading = styled.input.attrs({
  autoComplete: "off",
  spellCheck: false,
})`
  ${tw`capitalize w-full bg-transparent truncate`};

  &:focus {
    outline: none;
  }
`;

export const EditableH2 = styled(EditableHeading)`
  ${tw`text-3xl`};
`;

export const EditableH3 = styled(EditableHeading)`
  ${tw`text-2xl`};
`;

export const P = styled.p`
  ${tw`text-xl`};
`;
