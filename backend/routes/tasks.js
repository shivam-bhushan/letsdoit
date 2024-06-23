import express from 'express';
import { addTask, getTask, removeTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/addTask", verifyToken, addTask);
router.get("/getTask", verifyToken, getTask);
router.delete("/deleteTask/:id", verifyToken, removeTask);

export default router;
