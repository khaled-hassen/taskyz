import express from "express";
import { ApolloServer, CorsOptions, gql } from "apollo-server-express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import { getAuthorizedUser } from "./utils/auth.utils";
import { IResolverContext } from "./types/resolvers.types";
import typeDefs from "./graphql/typedefs/typeDefs";
import { resolvers } from "./graphql/resolvers/resolvers";
import { SERVER_ERROR } from "./utils/constants";
import { GraphQLError } from "graphql";

config();
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError(error) {
    if (error.extensions?.code === "INTERNAL_SERVER_ERROR")
      return new GraphQLError(SERVER_ERROR);
    return error;
  },
  async context(ctx): Promise<IResolverContext> {
    const queryObj: any = gql(ctx.req.body.query);
    const queryName =
      queryObj.definitions[0].selectionSet.selections[0].name.value;
    // don't check for access token
    if (queryName === "refreshToken") return { ...ctx, user: null };

    const user = await getAuthorizedUser(ctx.req);
    return { ...ctx, user };
  },
  playground:
    true,
    // process.env.NODE_ENV === "production"
    //   ? false
    //   : { settings: { "request.credentials": "include" } },
  introspection: process.env.NODE_ENV !== "production",
});
const clientUrl = process.env.CLIENT;
const cors: CorsOptions = { origin: clientUrl, credentials: true };
server.applyMiddleware({ app, cors });

const db = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const pwd = process.env.DB_PASSWORD;
const url = `mongodb+srv://${username}:${pwd}@cluster0.3itfd.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connected to db successfully");
  })
  .catch((e) => console.log("Cannot connect to db.\n", e));
