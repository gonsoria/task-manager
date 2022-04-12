const express = require('express')
const router = express()

const {
    getTodos,
    createTodo,
    getTodoById,
    editTodo,
    deleteTodo,
    getUserTodos
} = require('../controllers/todos.controller')


// GET ALL TODOS - GET TODO BY ID
router.get('/', getTodos)
router.get('/:id', getTodoById)
router.get('/user/:email', getUserTodos)

// CREATE TODO
router.post('/post', createTodo)

// EDIT TODO
router.put('/edit/:id', editTodo)

// DELETE TODO
router.delete('/:id', deleteTodo)

module.exports = router;