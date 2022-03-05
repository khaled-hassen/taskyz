import { model, Schema } from "mongoose";
import { IUserModel } from "../types/database.types";

const FullName = { first: String, last: String };
const BgImage = {
  url: String,
  alt: String,
  sourceUrl: String,
  creatorName: String,
  creatorUrl: String,
};
const HSLColor = { h: Number, s: Number, l: Number, a: Number };
const Colors = {
  textColor: HSLColor,
  primaryColor: HSLColor,
  successColor: HSLColor,
  warningColor: HSLColor,
  dangerColor: HSLColor,
  bgColor: HSLColor,
  cardBgColor: HSLColor,
  bgOpacity: Number,
  blur: Number,
};
const Config = {
  bgImage: BgImage,
  colors: Colors,
};

const schema = new Schema({
  fullName: { type: FullName, required: [true, "FullName is missing"] },
  email: { type: String, unique: true, required: [true, "Email is missing"] },
  config: { type: Config, default: null },
  password: { type: String, required: [true, "Password is missing"] },
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  refreshTokens: [{ type: String, required: true }],
});

export const User = model<IUserModel>("User", schema);
