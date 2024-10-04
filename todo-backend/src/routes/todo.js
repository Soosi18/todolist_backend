import express from "express";
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router({mergeParams: true});

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
