import List from "../models/List.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export async function getList(req, res) {
    List.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }))
}

export async function addList(req, res) {
    try {
        const { title } = req.body;
        console.log('Request body:', req.body);

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newList = new List({ title, userId, tasks: [] });
        const savedList = await newList.save();

        console.log('Saved list:', savedList);
        res.status(201).json({ message: "List added successfully", list: savedList });
    } catch (error) {
        console.error('Error in addList:', error);
        res.status(500).json({ message: error.message });
    }
}

export async function getListTasks(req, res) {
    const { listId } = req.params;
    const list = await List.findOne({ _id: listId, userId: req.user.id }).populate("tasks");
    if (!list) {
        return res.status(404).json({ message: "List not found" })
    }
    res.status(200).json(list.tasks)
}

export async function removeList(req, res) {
    const { listId } = req.params;
    const list = await List.findOneAndDelete({ _id: listId, userId: req.user.id });
    if (!list) {
        return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List deleted successfully" });
}