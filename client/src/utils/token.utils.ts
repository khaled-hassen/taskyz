import { IToken } from "../types/graphql.types";

export const key = "session";

export function saveToken({ value, expire }: IToken) {
  sessionStorage.setItem(key, JSON.stringify({ value, expire }));
}

export function clearToken() {
  sessionStorage.removeItem(key);
}

export function getAuthToken() {
  const token = getSavedToken();
  if (!token) return null;
  return "Bearer " + token.value;
}

export function getSavedToken() {
  const item = sessionStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as IToken;
  } catch (_) {
    return null;
  }
}
