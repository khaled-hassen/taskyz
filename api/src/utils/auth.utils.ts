import { Request } from "express";
import { decodeToken } from "./crypto.utils";
import { findUser } from "./user.utils";

export function checkToken(req: Request) {
  // gets the access token
  const header = req.headers.authorization;
  if (!header) return null;

  const token = header.split(" "); // format Bearer [TOKEN]
  if (token.length !== 2) return null;
  if (!token[1]) return null;
  return token[1];
}

export async function getAuthorizedUser(req: Request) {
  const token = checkToken(req);
  if (!token) return null;

  try {
    const id = decodeToken(token, "ACCESS");
    return await findUser(id, "ID");
  } catch (_) {
    return null;
  }
}
