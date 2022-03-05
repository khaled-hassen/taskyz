import { Schema, model } from "mongoose";
import { ICollectionModel } from "../types/database.types";

const schema = new Schema(
  {
    name: { type: String, required: [true, "Collection name is missing"] },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    owner: {
      type: Schema.Types.ObjectId,
      required: [true, "Owner is missing"],
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Collection = model<ICollectionModel>("Collection", schema);
