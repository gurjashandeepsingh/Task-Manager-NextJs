import { NextApiRequest, NextApiResponse } from "next";
import Task from "../../models/Task";
import { connectDB } from "../../lib/db";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { taskId } = req.query;
      const findTask = await Task.find({ _id: taskId });
      if (!findTask) throw new Error("Can't find Task");
      res.status(200).json(findTask);
    } catch (error) {
      res.status(400).json({ message: "Can't find task" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, priority } = req.body;
      const newTask = await new Task({
        title,
        description,
        priority,
      });
      console.log(newTask);
      res.status(201).json(await newTask.save());
    } catch (error) {
      res.status(500).json({ message: "Can't add new Task" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { taskId } = req.query;
      const findTask = await Task.find({ _id: taskId });
      if (!findTask) throw new Error("Can't find Task");
      const deleteTask = await Task.deleteOne({ _id: taskId });
      res.status(201).json("Task Deleted");
    } catch (error) {
      res.status(500).json({ message: "Can't delete Task" });
    }
  } else if (req.method === "PUT") {
    try {
      const { taskId } = req.query;
      const updateObject = req.body;
      const findTask = await Task.findById(taskId);
      if (!findTask) throw new Error("Can't find Task");
      const newTask = await Task.findOneAndUpdate(
        { _id: taskId },
        { $set: updateObject },
        { new: true }
      );
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Can't delete Task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
