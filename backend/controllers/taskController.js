import List from "../models/List.js";
import Task from "../models/Task.js";
import User from "../models/User.js"; // Ensure userModel is imported if it's used

export async function addTask(req, res) {
    const { title, listId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const list = await List.findOne({ _id: listId, userId });
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        const newTask = new Task({ title, completed: false, userId, listId });
        await newTask.save();

        // Update the list with the new task
        list.tasks.push(newTask._id);
        await list.save();

        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function removeTask(req, res) {
    const { id } = req.params;  // Use params instead of body
    const userId = req.user.id;

    try {
        const task = await Task.findOne({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(id);

        // Remove task from the list
        await List.findByIdAndUpdate(task.listId, { $pull: { tasks: id } });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getTask(req, res) {
    const { listId } = req.params;
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ listId, userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

