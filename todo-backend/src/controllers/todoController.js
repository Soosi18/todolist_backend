import * as db from "../db/prisma_queries.js"
import asyncHandler from "express-async-handler"
import { validateTodo, validateId } from "../validators/validateTodo.js";
import { validationResult } from "express-validator";

export const getTodos = asyncHandler(async (req, res) => {
  const listId = Number(req.params.list_id);
  const creatorId = req.user.user_id;
  const todos = await db.getAllTodos(creatorId, listId);
  res.json(todos);
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
    res.json(todo);
  })
]


export const addTodo = [
  validateTodo,
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
    const addedRow = await db.createNewTodo(todo, listId);
    res.json({success: true, message: "Todo successfully added!", data: addedRow});
  })
]

export const updateTodo = [
  validateId, validateTodo,
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
    const todo = req.body;
    const updatedRow = await db.updateTodoById(todoId, listId, creatorId, todo);
    res.json({success: true, message: "Todo successfully updated!", data: updatedRow});
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