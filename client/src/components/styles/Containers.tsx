import styled from "styled-components";
import tw from "twin.macro";

export const ResponsiveContainer = styled.div`
  --px: 2%;
  padding-left: var(--px);
  padding-right: var(--px);
  ${tw`flex flex-col items-center py-16 min-h-screen md:flex-row md:justify-center`};
`;

export const BodyContainer = styled.div.attrs({ id: "body" })<{
  noBgImage?: boolean;
}>`
  min-width: 300px;
  ${tw`h-screen w-screen flex flex-col`};
  ${({ noBgImage }) =>
    noBgImage ? { backgroundImage: "none !important" } : ""};
`;

export const BrandContainer = styled.div<{ forceCenter?: boolean }>`
  ${({ forceCenter }) => (forceCenter ? "" : tw`md:items-start`)};
  ${tw`flex flex-col items-center md:mr-24 mb-10`};
  p {
    ${tw`mt-3 text-2xl text-center md:text-left`};
  }
`;

export const ResponsiveSidebar = styled.div`
  ${tw`hidden lg:block`};
`;

export const SlideSidebar = styled.div<{ show?: boolean }>`
  ${tw`lg:hidden top-0 left-0 absolute h-full z-50 transform transition-transform`};
  ${({ show }) => (show ? "" : tw`-translate-x-full`)};
`;

export const SidebarContainer = styled.div`
  ${tw`rounded-xl w-72 h-80 px-10 py-6 flex flex-col justify-between`};
  background-color: hsla(var(--bg-color), var(--bg-opacity));
  backdrop-filter: blur(var(--blur));

  div:first-child button {
    ${tw`mb-10`};
  }
`;

export const Containers = styled.div`
  ${tw`flex flex-1 md:pb-8 md:pt-2 overflow-auto`};

  & > div:first-child {
    ${tw`mr-10`};
  }

  @media screen and (min-width: 768px) {
    --px: 8vw;
    padding-left: var(--px);
    padding-right: var(--px);
  }
`;

export const TopBarContainer = styled.header`
  ${tw`grid grid-cols-3 col-span-3 md:py-3 pb-3`};

  @media screen and (min-width: 768px) {
    --px: 8vw;
    padding-left: var(--px);
    padding-right: var(--px);
  }
`;

export const Content = styled.div`
  ${tw`md:rounded-xl flex-1 h-full px-8 py-6`};
  min-height: 20rem;
  background-color: hsla(var(--bg-color), var(--bg-opacity));
  backdrop-filter: blur(var(--blur));
`;

export const Page = styled.div<{ withHeader: boolean }>`
  ${tw`flex flex-col overflow-auto -mx-8 px-8`};
  ${({ withHeader }) =>
    withHeader ? { height: "calc(100% - 48px)" } : tw`h-full`};
`;

export const OverviewContainer = styled.div`
  ${tw`mt-4 mb-5 grid gap-8`};
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
`;

export const LoadingHeaderContainer = styled.div`
  .bg-text-color {
    background-color: hsl(var(--text-color));
  }
`;
