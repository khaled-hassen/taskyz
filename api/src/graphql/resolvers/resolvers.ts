import { dateScalar } from "../typedefs/scalars";
import {
  config,
  login,
  logout,
  refreshToken,
  register,
  saveUserConfig,
  validateToken,
} from "./user.resolver";
import {
  addCollection,
  collection,
  collections,
  deleteCollection,
  overview,
  updateCollection,
} from "./collection.resolver";
import { searchImages } from "./unsplash.resolver";
import { addTask, deleteTask, updateTask } from "./task.resolver";

export const resolvers = {
  Date: dateScalar,
  Query: {
    validateToken,
    refreshToken,
    login,
    config,
    collections,
    collection,
    overview,
    searchImages,
  },
  Mutation: {
    register,
    logout,
    saveUserConfig,
    addCollection,
    updateCollection,
    deleteCollection,
    addTask,
    updateTask,
    deleteTask,
  },
};
