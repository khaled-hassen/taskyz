import { ApolloError } from "apollo-server-express";
import ms from "ms";
import {
  ACCESS_EXPIRE_ERROR,
  ACCESS_KEY_ERROR,
  HASH_KEY_ERROR,
  REFRESH_KEY_ERROR,
} from "./constants";

export function getHashKey() {
  const hashKey = process.env.HASH_KEY;
  if (!hashKey) throw new ApolloError(HASH_KEY_ERROR);
  return hashKey;
}

export function getRefreshKey() {
  const refreshKey = process.env.REFRESH_KEY;
  if (!refreshKey) throw new ApolloError(REFRESH_KEY_ERROR);
  return refreshKey;
}

export function getAccessKey() {
  const accessKey = process.env.ACCESS_KEY;
  if (!accessKey) throw new ApolloError(ACCESS_KEY_ERROR);
  return accessKey;
}

export function getAccessExpire() {
  const expire = process.env.ACCESS_EXPIRE;
  if (!expire) throw new ApolloError(ACCESS_EXPIRE_ERROR);
  return expire;
}

export function calculateExpireDate() {
  return new Date(Date.now() + ms(getAccessExpire()));
}
