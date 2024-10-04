import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllTodoLists,
  addNewTodoList,
  deleteTodoList,
  updateTodoList
} from "../controllers/listController.js";

const router = express.Router();
router.use(verifyToken);

router.get("/", getAllTodoLists);
router.post("/", addNewTodoList);
router.put("/:id", updateTodoList);
router.delete("/:id", deleteTodoList);

export default router;