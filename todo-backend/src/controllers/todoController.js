import * as db from "../db/prisma_queries.js"
import asyncHandler from "express-async-handler"
import { validateTodoDescription, validateTodoStatus, validateId } from "../validators/validateTodo.js";
import { validationResult } from "express-validator";

export const getTodos = asyncHandler(async (req, res) => {
  const listId = Number(req.params.list_id);
  const creatorId = req.user.user_id;
  const todos = await db.getAllTodos(creatorId, listId);
  res.json({success: true, content: todos});
});

export const getTodo = [
  validateId,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const todoId = Number(req.params.id);
    const listId = Number(req.params.list_id);
    const creatorId = req.user.user_id;
    const todo = await db.getTodoById(creatorId, listId, todoId);
    res.json({success: true, content: todo});
  })
]


export const addTodo = [
  validateTodoDescription,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const todo = req.body;
    const listId = Number(req.params.list_id);
    const newTodo = await db.createNewTodo(todo, listId);
    res.json({success: true, message: "Todo successfully added!", todo: newTodo});
  })
]

export const updateTodoDescription = [
  validateId, validateTodoDescription,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const todoId = Number(req.params.id);
    const listId = Number(req.params.list_id);
    const creatorId = req.user.user_id;
    const description = req.body.description;
    const updatedRow = await db.updateTodoDescById(todoId, listId, creatorId, description);
    res.json({success: true, message: "Task description successfully updated!", data: updatedRow});
  })
]

export const updateTodoStatus = [
  validateId, validateTodoStatus,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const todoId = Number(req.params.id);
    const listId = Number(req.params.list_id);
    const creatorId = req.user.user_id;
    const status = req.body.is_complete;
    const updatedRow = await db.updateTodoStatusById(todoId, listId, creatorId, status);
    res.json({success: true, message: "Task status successfully updated!", data: updatedRow});
  })
]

export const deleteTodo = [
  validateId,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const todoId = Number(req.params.id);
    const creatorId = req.user.user_id;
    const listId = Number(req.params.list_id);
    const deletedRows = await db.deleteTodoById(creatorId, listId, todoId);
    res.json({success: true, message: "Todo successfully deleted!", data: deletedRows});
  })
]