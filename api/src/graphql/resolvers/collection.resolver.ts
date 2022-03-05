import {AUTHORIZATION_ERROR, NOT_FOUND_ERROR} from "../../utils/constants";
import {
  AddCollectionResolver,
  CollectionResolver,
  CollectionsResolver,
  DeleteCollectionResolver,
  OverviewResolver,
  UpdateCollectionResolver,
} from "../../types/resolvers.types";
import {ITaskModel} from "../../types/database.types";
import {Types} from "mongoose";
import {filterUpcomingTasks, findCollection, getCompletedTasks, getPopulatedCollections, transformCollection,} from "../../utils/collection.utils";
import {Task} from "../../database/task.model";
import {ForbiddenError, UserInputError} from "apollo-server-express";
import {Collection} from "../../database/collection.model";

export const overview: OverviewResolver = async (_, __, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collections = await Collection.find({ owner: user._id })
    .populate("tasks")
    .sort("-updatedAt")
    .limit(3);
  const tasks = await Task.find({ owner: user._id });

  const futureTasks = tasks.filter(filterUpcomingTasks);
  let tasksCompleted = 0;
  tasks.forEach((task) => (tasksCompleted += +task.isDone));

  return {
    completedTasks: tasksCompleted,
    upcomingTasksNumber: futureTasks.length,
    recentlyModified: collections.map(transformCollection),
  };
};

export const collections: CollectionsResolver = async (_, __, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collections = await getPopulatedCollections(user);
  return collections.map(transformCollection);
};

export const collection: CollectionResolver = async (_, { id }, { user }) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collections = await getPopulatedCollections(user);
  const collection = collections.find((col) => col.id === id);
  if (!collection) throw new UserInputError(NOT_FOUND_ERROR);

  return {
    id: collection.id,
    name: collection.name,
    tasks: collection.tasks.toObject(),
    updatedAt: collection.updatedAt,
    totalTasks: collection.tasks.length,
    completedTasks: getCompletedTasks(
      collection.tasks as Types.Array<ITaskModel>
    ),
  };
};

export const addCollection: AddCollectionResolver = async (
  _,
  { name },
  { user }
) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collection = new Collection({ name, tasks: [], owner: user._id });
  user.collections.push(collection._id);

  await collection.save();
  await user.save();

  return {
    id: collection.id,
    name,
    tasks: [],
    totalTasks: 0,
    updatedAt: collection.updatedAt,
    completedTasks: 0,
  };
};

export const updateCollection: UpdateCollectionResolver = async (
  _,
  { id, newName },
  { user }
) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collection = await findCollection(user, id);
  collection.name = newName;
  await collection.save();

  return {
    id: collection.id,
    name: newName,
    tasks: collection.tasks.toObject(),
    updatedAt: collection.updatedAt,
    totalTasks: collection.tasks.length,
    completedTasks: getCompletedTasks(
      collection.tasks as Types.Array<ITaskModel>
    ),
  };
};

export const deleteCollection: DeleteCollectionResolver = async (
  _,
  { id },
  { user }
) => {
  if (!user) throw new ForbiddenError(AUTHORIZATION_ERROR);

  const collection = await findCollection(user, id);
  user.collections.pull(collection._id);

  await user.save();
  await Task.deleteMany({ _id: { $in: collection.tasks } });
  await Collection.deleteOne({ _id: collection._id });

  return id;
};

