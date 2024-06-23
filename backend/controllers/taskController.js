import Task from "../models/Task.js";
import User from "../models/User.js"; // Ensure userModel is imported if it's used

export async function addTask(req, res) {
    const { title } = req.body;
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const newTask = new Task({ title, completed: false, userId });
    await newTask.save()
        .then(() => res.status(200).json({ message: "Task added successfully" }))
        .catch(error => res.status(500).json({ message: error.message }));
}

export async function removeTask(req, res) {
    const { id } = req.params;  // Use params instead of body
    Task.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Deleted Successfully" }))
        .catch((error) => res.status(500).json({ message: error.message }));
}

export async function getTask(req, res) {
    Task.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
}