import styled from "styled-components";
import tw from "twin.macro";

export const ResultContainer = styled.div`
  ${tw`grid auto-rows-min items-center gap-8 overflow-auto h-full px-9 -mx-9`};
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));

  img {
    ${tw`h-40`};
  }
`;

export const ImageContainer = styled.div`
  ${tw`inline-block cursor-pointer relative overflow-hidden`};
  height: fit-content;

  &:hover {
    --translation: 0%;
  }

  img {
    ${tw`w-full object-cover rounded-xl`};
  }
`;

export const ImageViewerContainer = styled.div`
  ${tw`h-full md:grid md:grid-cols-5 md:items-center md:gap-8 overflow-auto px-9 -mx-9`};

  & > img {
    ${tw`md:mb-0 mb-8 md:h-full md:col-span-3 w-full object-cover rounded-xl`};
  }

  & > div {
    ${tw`flex flex-col md:h-full md:col-span-2 justify-between`};

    & > div {
      ${tw`lg:mb-0 mb-10`};
    }
  }
`;
