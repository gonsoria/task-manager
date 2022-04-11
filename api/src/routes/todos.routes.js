const express = require('express')
const router = express()

const {
    getTodos,
    createTodo,
    getTodoById,
    editTodo,
    deleteTodo
} = require('../controllers/todos.controller')


// GET ALL TODOS - GET TODO BY ID
router.get('/', getTodos)
router.get('/:id', getTodoById)

// CREATE TODO
router.post('/post', createTodo)

// EDIT TODO
router.put('/edit/:id', editTodo)

// DELETE TODO
router.delete('/:id', deleteTodo)

module.exports = router;