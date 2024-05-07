import mongoose from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
}

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: "Task",
    },

    description: { type: String, minLength: 2, maxLength: 400 },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "High",
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
