import {
  getAccessExpire,
  getAccessKey,
  getHashKey,
  getRefreshKey,
} from "./key.utils";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";
import jwt from "jsonwebtoken";
import { TOKEN_TYPE_ERROR, TOKEN_VALIDATION_ERROR } from "./constants";
import { ApolloError, AuthenticationError } from "apollo-server-express";

export function hash(message: string) {
  const key = getHashKey();
  const sha256Hash = sha256(key + message);
  return Base64.stringify(hmacSHA512(sha256Hash, key));
}

export function verifyHash(message: string, hashValue: string) {
  return hash(message) === hashValue;
}

export function signToken(payload: object, type: "ACCESS" | "REFRESH") {
  switch (type) {
    case "REFRESH":
      return jwt.sign(payload, getRefreshKey());
    case "ACCESS":
      const expiresIn = getAccessExpire();
      return jwt.sign(payload, getAccessKey(), { expiresIn });
    default:
      throw new ApolloError(TOKEN_TYPE_ERROR);
  }
}

export function decodeToken(token: string, type: "ACCESS" | "REFRESH"): string {
  switch (type) {
    case "REFRESH": {
      const payload: any = jwt.verify(token, getRefreshKey());
      if (!payload) throw new AuthenticationError(TOKEN_VALIDATION_ERROR);
      return payload.id;
    }
    case "ACCESS": {
      const payload: any = jwt.verify(token, getAccessKey());
      if (!payload) throw new AuthenticationError(TOKEN_VALIDATION_ERROR);
      return payload.id;
    }
    default:
      throw new ApolloError(TOKEN_TYPE_ERROR);
  }
}
