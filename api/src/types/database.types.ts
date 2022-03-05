import { Document, Types } from "mongoose";
import { IConfig } from "./graphql.types";

export interface IUserModel extends Document {
  fullName: { first: string; last: string };
  email: string;
  password: string;
  config: IConfig | null;
  collections: Types.Array<Types.ObjectId> | Types.Array<ICollectionModel>;
  refreshTokens: Types.Array<string>;
}

export interface ICollectionModel extends Document {
  name: string;
  tasks: Types.Array<Types.ObjectId> | Types.Array<ITaskModel>;
  createdAt: Date;
  updatedAt: Date;
  owner: Types.ObjectId;
}

export interface ITaskModel extends Document {
  name: string;
  isDone: boolean;
  dueDate: Date | null;
  parentCollection: Types.ObjectId;
  owner: Types.ObjectId;
}
