import {
  AddTaskResolver,
  DeleteTaskResolver,
  UpdateTaskResolver,
} from "../../types/resolvers.types";
import { AUTHORIZATION_ERROR } from "../../utils/constants";
import { findCollection, findTask } from "../../utils/collection.utils";
import { Task } from "../../database/task.model";
import { ForbiddenError } from "apollo-server-express";

export const addTask: AddTaskResolver = async (_, args, { user }) => {
  const { id, name, dueDate } = args;
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collection = await findCollection(user, id);
  const task = new Task({
    name,
    isDone: false,
    dueDate,
    parentCollection: collection._id,
    owner: user._id,
  });

  collection.tasks.push(task._id);
  await task.save();
  await collection.save();

  return {
    id: task.id,
    name,
    isDone: false,
    dueDate,
    collection: id,
  };
};

export const updateTask: UpdateTaskResolver = async (_, args, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const { id, newName, isDone, dueDate } = args;
  const task = await findTask(user, id);
  const collection = await findCollection(
    user,
    task.parentCollection.toString()
  );

  if (newName !== null) task.name = newName;
  if (isDone !== null) task.isDone = isDone;
  task.dueDate = dueDate;
  collection.updatedAt = new Date();
  await task.save();
  await collection.save();

  return {
    id,
    name: task.name,
    isDone: task.isDone,
    dueDate,
    updatedAt: collection.updatedAt,
  };
};

export const deleteTask: DeleteTaskResolver = async (_, { id }, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const task = await findTask(user, id);
  const collection = await findCollection(
    user,
    task.parentCollection.toString()
  );
  collection.tasks.pull(task._id);

  await Task.deleteOne({ _id: task._id });
  await collection.save();

  return id;
};
