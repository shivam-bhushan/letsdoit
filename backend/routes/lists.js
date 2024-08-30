import express from 'express';
import { addList, getList, getListTasks, removeList } from '../controllers/listController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/addList", verifyToken, addList);
router.get("/getLists", verifyToken, getList);
router.get("/getListTasks/:listId", verifyToken, getListTasks);
router.delete("/deleteList/:listId", verifyToken, removeList);

export default router;