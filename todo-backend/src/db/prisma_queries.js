import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// User Queries
export const addNewUser = async(username, password) => {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
    }
  });
}

export const getUser = async(username) => {
  const user = await prisma.user.findUnique({
    where: {username: username},
    select: {user_id: true, username: true, password: true}
  });
  return user;
}


// List Queries
export const getAllUserLists = async(creatorId) => {
  const lists = prisma.list.findMany({
    where: {creator_id: creatorId}
  })
  return lists;
}

export const addNewList = async(listName, creatorId) => {
  await prisma.list.create({
    data:{
      name: listName,
      creator_id: creatorId
    }
  });
}

export const deleteList = async(creatorId, listId) => {
  await prisma.list.delete({
    where: {
      AND:{
        list_id: listId,
        creator_id: creatorId
      } 
    }
  });
}

export const updateListName = async(listId, newName) => {
  await prisma.list.update({
    where: {
      AND: {
        list_id: listId,
        creator_id: creatorId
      }
    },
    data: {name: newName}
  });
}

// Todo Queries
export const getAllTodos = async (creatorId, listId) => {
  const todos = await prisma.todo.findMany({
    where: {
      belongs_to: {
        creator_id: creatorId
      },
      belongsToId: listId
    },
    select: {description: true, is_complete: true}
  });
  return todos;
}

export const getTodoById = async (creatorId, listId, todoId) => {
  const todo = await prisma.todo.findUnique({
    where:{
      todo_id: todoId,
      belongsToId: listId,
      belongs_to: {
        creator_id: creatorId
      } 
    },
    select: {description: true, is_complete: true}
  });
  return todo;
}

export const createNewTodo = async(todo, listId) => {
  await prisma.todo.create({
    data: {
      description: todo.description,
      is_complete: (todo.isComplete==='true'),
      belongsToId: listId
    }    
  });
}

export const updateTodoById = async(todoId, listId, creatorId, todo) => {
  await prisma.todo.update({
    where: {
      belongsToId: listId,
      todo_id: todoId,
      belongs_to: { creator_id: creatorId}
    },
    data: {
      description: todo.description,
      is_complete: (todo.isComplete==='true')
    }
  });
}

export const deleteTodoById = async(creatorId, listId, todoId) => {
  await prisma.todo.delete({
    where: {
      belongsToId: listId,
      todo_id: todoId,
      belongs_to: {creator_id: creatorId}
    }
  });
}
