import { createApi } from "unsplash-js";
import { SearchImageResolver } from "../../types/resolvers.types";
import { config } from "dotenv";
import { AUTHORIZATION_ERROR, SERVER_ERROR } from "../../utils/constants";
import { ForbiddenError } from "apollo-server-express";

require("isomorphic-fetch");

config();
const unsplash = createApi({
  accessKey: process.env.UNSPLAH_ACCESS_KEY || "",
});

export const searchImages: SearchImageResolver = async (
  _,
  { query, page },
  { user }
) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const { response, errors } = await unsplash.search.getPhotos({
    query,
    page,
    perPage: 30,
    orientation: "landscape",
  });
  if (errors && errors.length > 0) throw SERVER_ERROR;
  if (!response) throw SERVER_ERROR;

  return {
    images: response.results.map((res) => ({
      url: res.urls.regular,
      alt: res.alt_description || query,
      sourceUrl: res.links.html,
      creatorName: res.user.name,
      creatorUrl: res.user.links.html,
    })),
    totalPages: response.total_pages,
  };
};
