import * as db from "../db/prisma_queries.js";
import { validateId, validateListName } from "../validators/validateTodo.js"
import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

export const getAllTodoLists = asyncHandler(async(req, res) => {
  const userId = req.user.user_id;
  const todoLists = await db.getAllUserLists(userId);
  res.json(todoLists);  
})

export const addNewTodoList = [
  validateListName,
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const listName = req.body.name;
    const creatorId = req.user.user_id;
    await db.addNewList(listName, creatorId);
    res.json({success: true, message: "List successfully added"});
  })
]
  

export const deleteTodoList = [
  validateId,
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const listId = Number(req.params.id);
    const creatorId = req.user.user_id;
    await db.deleteList(creatorId, listId);
    res.json({success: true, message: "List successfully deleted"});
  })
]

export const updateTodoList = [
  validateId, validateListName,
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array().map((error) => {
        return {
          field: error.path,
          error: error.msg
        }
      })});
    }
    const listId = Number(req.params.id);
    const creatorId = req.user.user_id;
    const newName = req.body.name;
    await db.updateListName(creatorId, listId, newName);
    res.json({success: true, message: "List name successfully updated"});
  })
]