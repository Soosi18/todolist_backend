import { body, param } from 'express-validator'

export const validateTodo = [
  body("description").trim().escape()
    .isLength({min: 1, max: 255}).withMessage("Task character count must be between 1 and 255"),
  body("isComplete").trim().toLowerCase()
    .notEmpty().withMessage("Value cannot be empty")
    .isBoolean({loose: false}).withMessage("Value must be true")
]

export const validateId = [
  param("id").trim()
    .isInt({min: 1}).withMessage("ID must be integer starting from 1")
]

export const validateListName = [
  body("name").trim().escape()
    .isLength({min: 1, max: 32}).withMessage("List name must be between 1 and 32 characters")
]
