import { calculateExpireDate } from "../../utils/key.utils";
import {
  decodeToken,
  hash,
  signToken,
  verifyHash,
} from "../../utils/crypto.utils";
import { createUser, findUser } from "../../utils/user.utils";
import { CookieOptions } from "express";
import {
  AUTHORIZATION_ERROR,
  CONFIG_ERROR,
  CREDENTIALS_ERROR,
  PWD_ERROR,
  PWD_MATCH_ERROR,
} from "../../utils/constants";
import {
  GetConfigResolver,
  LoginResolver,
  LogoutResolver,
  RefreshTokenResolver,
  RegisterResolver,
  SaveConfigResolver,
  ValidateTokenResolver,
} from "../../types/resolvers.types";
import { ForbiddenError, UserInputError } from "apollo-server-express";
import { IConfig } from "../../types/graphql.types";

const cookieKey = "user-session";
const options: CookieOptions = { httpOnly: true, secure: true, signed: true };

export const validateToken: ValidateTokenResolver = async (_, __, { user }) => {
  if (!user) throw new UserInputError(CREDENTIALS_ERROR);
  return true;
};

export const refreshToken: RefreshTokenResolver = async (_, __, { req }) => {
  const token = req.signedCookies[cookieKey] as string;
  if (!token) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const id = decodeToken(token, "REFRESH");
  const user = await findUser(id, "ID");
  if (!user.refreshTokens.includes(token))
    throw new ForbiddenError(AUTHORIZATION_ERROR);

  const access = signToken({ id }, "ACCESS");
  return { value: access, expire: calculateExpireDate() };
};

export const register: RegisterResolver = async (_, { data }, { res }) => {
  const { firstName, lastName, email, password, confirmPassword } = data;

  if (password.length < 6) throw new UserInputError(PWD_ERROR);
  if (password !== confirmPassword) throw new UserInputError(PWD_MATCH_ERROR);

  const user = await createUser(firstName, lastName, email, hash(password));
  const refreshToken = signToken({ id: user.id }, "REFRESH");
  const accessToken = signToken({ id: user.id }, "ACCESS");

  user.refreshTokens.push(refreshToken);
  await user.save();
  res.cookie(cookieKey, refreshToken, options);

  return {
    fullName: user.fullName,
    token: { value: accessToken, expire: calculateExpireDate() },
  };
};

export const login: LoginResolver = async (_, { email, password }, { res }) => {
  if (password.length < 6) throw new UserInputError(PWD_ERROR);
  const user = await findUser(email, "EMAIL");
  if (!verifyHash(password, user.password))
    throw new UserInputError(CREDENTIALS_ERROR);

  const accessToken = signToken({ id: user.id }, "ACCESS");
  const refreshToken = signToken({ id: user.id }, "REFRESH");

  user.refreshTokens.push(refreshToken);
  await user.save();
  res.cookie(cookieKey, refreshToken, options);

  return {
    fullName: user.fullName,
    token: { value: accessToken, expire: calculateExpireDate() },
  };
};

export const logout: LogoutResolver = async (_, __, { req, res, user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const { "user-session": token } = req.signedCookies;
  if (!token) return "Logout successfully";

  const id = decodeToken(token, "REFRESH");
  if (user.id !== id) throw new ForbiddenError(AUTHORIZATION_ERROR);

  if (user.refreshTokens.includes(token)) {
    user.refreshTokens.pull(token);
    await user.save();
  }

  // to make the cookie invalid in the client browser
  res.cookie(cookieKey, token, {
    ...options,
    expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
  });

  return "Logout successfully";
};

export const saveUserConfig: SaveConfigResolver = async (
  _,
  { config },
  { user }
) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  if (!user.config) {
    if (!config.bgImage || !config.colors)
      throw new UserInputError(CONFIG_ERROR);
    user.config = config as IConfig;
  } else
    user.config = {
      bgImage: config.bgImage || user.config.bgImage,
      colors: config.colors || user.config.colors,
    };
  await user.save();

  return "Config is saved";
};

export const config: GetConfigResolver = async (_, __, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);
  return user.config;
};
