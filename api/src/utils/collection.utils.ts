import {
  ICollectionModel,
  ITaskModel,
  IUserModel,
} from "../types/database.types";
import { Types } from "mongoose";
import { NOT_FOUND_ERROR } from "./constants";
import { Collection } from "../database/collection.model";
import { Task } from "../database/task.model";
import { UserInputError } from "apollo-server-express";
import { User } from "../database/user.model";
import { ICollection, ITask } from "../types/graphql.types";

export async function getPopulatedCollections(user: IUserModel) {
  return (
    await User.populate(user, {
      path: "collections",
      select: "name tasks updatedAt",
      populate: { path: "tasks", select: "-__v -parentCollection" },
    })
  ).collections as Types.Array<ICollectionModel>;
}

export async function findCollection(user: IUserModel, id: string) {
  const collections = user.collections as Types.Array<Types.ObjectId>;
  if (!collections.find((col) => col.toString() === id))
    throw new UserInputError(NOT_FOUND_ERROR);

  const collection = await Collection.findById(id);
  if (!collection) throw new UserInputError(NOT_FOUND_ERROR);

  return collection;
}

export async function findTask(user: IUserModel, id: string) {
  const task = await Task.findById(id);
  if (!task) throw new UserInputError(NOT_FOUND_ERROR);

  const parent = task.parentCollection.toString();
  await findCollection(user, parent);

  return task;
}

export function getCompletedTasks(tasks: Types.Array<ITaskModel>) {
  let tasksCompleted = 0;
  // convert isDone to boolean and add it to completed tasks
  tasks.forEach((task) => (tasksCompleted += +task.isDone));
  return tasksCompleted;
}

export function filterUpcomingTasks({ isDone, dueDate }: ITaskModel) {
  if (isDone) return false;
  if (!dueDate) return false;

  const today = new Date();
  const timeDifference = dueDate.setHours(0) - today.setHours(0);
  const daysDifference = Math.trunc(timeDifference / 1000 / 3600 / 24);

  return !(daysDifference > 1 || daysDifference < 0);
}

export function transformCollection(collection: ICollectionModel): ICollection {
  const tasks = collection.tasks;
  return {
    id: collection.id,
    name: collection.name,
    tasks: tasks.toObject(),
    updatedAt: collection.updatedAt,
    totalTasks: tasks.length,
    completedTasks: getCompletedTasks(tasks as Types.Array<ITaskModel>),
  };
}

export const transformTask = (task: ITaskModel): ITask => ({
  id: task.id,
  name: task.name,
  isDone: task.isDone,
  dueDate: task.dueDate,
  collection: task.parentCollection.toString(),
});
