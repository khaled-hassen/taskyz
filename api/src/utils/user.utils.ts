import { User } from "../database/user.model";
import {
  CREDENTIALS_ERROR,
  USER_EXISTS_ERROR,
  USER_SEARCH_TYPE_ERROR,
} from "./constants";
import { IUserModel } from "../types/database.types";
import { UserInputError } from "apollo-server-express";

export async function createUser(
  first: string,
  last: string,
  email: string,
  password: string
) {
  const user = await User.findOne({ email });
  if (user) throw new UserInputError(USER_EXISTS_ERROR);

  return new User({
    fullName: { first, last },
    email,
    password,
    collections: [],
    refreshTokens: [],
  });
}

export async function findUser(query: string, by: "ID" | "EMAIL") {
  let user: IUserModel | null = null;
  switch (by) {
    case "EMAIL":
      user = await User.findOne({ email: query });
      break;
    case "ID":
      user = await User.findById(query);
      break;
    default:
      throw new UserInputError(USER_SEARCH_TYPE_ERROR);
  }

  if (!user) throw new UserInputError(CREDENTIALS_ERROR);
  return user;
}
