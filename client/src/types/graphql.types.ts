import { IConfig, IImage } from "./style.types";

export interface IRefreshTokenQuery {
  refreshToken: IToken;
}

export interface IValidateTokenQuery {
  validateToken: boolean;
}

export interface ILoginQuery {
  login: {
    token: IToken;
  };
}

export interface IRegisterMutation {
  register: {
    token: IToken;
  };
}

export interface IToken {
  value: string;
  expire: number;
}

export interface ICollectionsQuery {
  collections: ICollection[];
}

export interface ICollectionQuery {
  collection: ICollection;
}

export interface IAddCollectionMutation {
  addCollection: ICollection;
}

export interface ICollection {
  id: string;
  name: string;
  totalTasks: number;
  completedTasks: number;
  updatedAt: number;
  tasks?: ITaskQuery[];
}

export interface ITaskQuery {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: number | null;
}

export interface ITask {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: Date | null;
}

export interface ISearchImagesQuery {
  searchImages: { images: IImage[]; totalPages: number; found: boolean };
}

export interface IGetConfigQuery {
  config: IConfig | null;
}
