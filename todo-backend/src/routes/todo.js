import express from "express";
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodoDescription,
  updateTodoStatus,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router({mergeParams: true});

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", addTodo);
router.put("/desc/:id", updateTodoDescription);
router.put("/status/:id", updateTodoStatus);
router.delete("/:id", deleteTodo);

export default router;
