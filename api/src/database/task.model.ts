import { Schema, model } from "mongoose";
import { ITaskModel } from "../types/database.types";

const schema = new Schema({
  name: { type: String, required: [true, "Task name is missing"] },
  dueDate: { type: Date },
  isDone: { type: Boolean, required: [true, "isDone is missing"] },
  parentCollection: {
    type: Schema.Types.ObjectId,
    required: [true, "Parent collection is missing"],
    ref: "Collection",
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "Owner is missing"],
    ref: "User",
  },
});

export const Task = model<ITaskModel>("Task", schema);
