import styled from "styled-components";
import tw from "twin.macro";

export const Button = styled.button`
  ${tw`w-full rounded-xl text-gray-50 text-xl`};

  * {
    ${tw`text-gray-50 text-xl`};
  }

  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled(Button)`
  ${({ disabled }) => (disabled ? tw`cursor-not-allowed` : "")};
  ${({ disabled }) => ({
    backgroundColor: disabled
      ? "hsl(var(--light-primary-color))"
      : "hsl(var(--primary-color))",
  })};
  &:hover {
    ${({ disabled }) =>
      !disabled ? { backgroundColor: "hsl(var(--light-primary-color))" } : ""};
  }
`;

export const SuccessButton = styled(Button)`
  ${({ disabled }) => (disabled ? tw`cursor-not-allowed` : "")};
  ${({ disabled }) => ({
    backgroundColor: disabled
      ? "hsl(var(--light-success-color))"
      : "hsl(var(--success-color))",
  })};

  &:hover {
    ${({ disabled }) =>
      !disabled ? { backgroundColor: "hsl(var(--light-success-color))" } : ""};
  }
`;

export const DangerButton = styled(Button)`
  background-color: hsl(var(--danger-color));
  &:hover {
    background-color: hsl(var(--light-danger-color));
  }
`;

export const Spinner = styled.div.attrs({
  className: "animate-spin rounded-full",
})`
  --border: 3px;
  border-width: var(--border);
  border-style: solid;
  border-color: hsl(var(--text-color));
  border-top: var(--border) solid transparent;
  ${tw`w-5 h-5 inline-block mr-3`};
`;

export const IconButton = styled.button<{ inactive?: boolean }>`
  ${({ inactive }) => (inactive ? tw`opacity-60` : tw`opacity-100`)}

  ${tw`flex items-center`};

  p {
    ${tw`ml-4`};
  }

  &:focus {
    outline: none;
  }
`;
