import * as db from "../db/prisma_queries.js";
import asyncHandler from "express-async-handler";

export const getAllTodoLists = asyncHandler(async(req, res) => {
  const userId = req.user.user_id;
  const todoLists = await db.getAllUserLists(userId);
  res.json(todoLists);  
})

export const addNewTodoList = asyncHandler(async(req, res) => {
  const listName = req.body.name;
  const creatorId = req.user.user_id;
  await db.addNewList(listName, creatorId);
  res.json({success: true, message: "List successfully added"});
})

export const deleteTodoList = asyncHandler(async(req, res) => {
  const listId = Number(req.params.id);
  const creatorId = req.user.user_id;
  await db.deleteList(creatorId, listId);
  res.json({success: true, message: "List successfully deleted"});
})

export const updateTodoList = asyncHandler(async(req, res) => {
  const listId = Number(req.params.id);
  const creatorId = req.user.user_id;
  const newName = req.body.name;
  await db.updateListName(creatorId, listId, newName);
  res.json({success: true, message: "List name successfully updated"});
})