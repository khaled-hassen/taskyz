import { gql } from "@apollo/client";

export const SearchImagesQuery = gql`
  query SearchImages($query: String!, $page: Int!) {
    searchImages(query: $query, page: $page) {
      images {
        url
        alt
        sourceUrl
        creatorName
        creatorUrl
      }
      totalPages
    }
  }
`;
