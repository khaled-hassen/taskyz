import { ExpressContext } from "apollo-server-express";
import { IUserModel } from "./database.types";
import {
  ICollection,
  IConfig,
  IConfigInput,
  IImage,
  ITask,
  IToken,
  IUser,
} from "./graphql.types";

export type ResolverFn<A extends object, R> = (
  parent: any,
  args: A,
  ctx: IResolverContext
) => Promise<R>;

export interface IResolverContext extends ExpressContext {
  user: IUserModel | null;
}

export type ValidateTokenResolver = ResolverFn<any, boolean>;

export type RefreshTokenResolver = ResolverFn<any, IToken>;

export type RegisterResolver = ResolverFn<IRegisterData, IUser>;

export type LoginResolver = ResolverFn<
  { email: string; password: string },
  IUser
>;

export type LogoutResolver = ResolverFn<any, string>;

export type SaveConfigResolver = ResolverFn<{ config: IConfigInput }, string>;

export type GetConfigResolver = ResolverFn<any, IConfig | null>;

export type CollectionsResolver = ResolverFn<any, ICollection[]>;

export type CollectionResolver = ResolverFn<{ id: string }, ICollection>;

export type AddCollectionResolver = ResolverFn<{ name: string }, ICollection>;

export type UpdateCollectionResolver = ResolverFn<
  { id: string; newName: string },
  ICollection
>;

export type DeleteCollectionResolver = ResolverFn<{ id: string }, string>;

export type OverviewResolver = ResolverFn<
  any,
  {
    completedTasks: number;
    upcomingTasksNumber: number;
    recentlyModified: ICollection[];
  }
>;

export type AddTaskResolver = ResolverFn<
  { id: string; name: string; dueDate: Date | null },
  ITask
>;

export type UpdateTaskResolver = ResolverFn<
  {
    id: string;
    newName: string | null;
    isDone: boolean | null;
    dueDate: Date | null;
  },
  ITask
>;

export type DeleteTaskResolver = ResolverFn<{ id: string }, string>;

export interface IRegisterData {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export type SearchImageResolver = ResolverFn<
  { query: string; page: number },
  { images: IImage[]; totalPages: number }
>;
