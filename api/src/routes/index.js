const { Router } = require('express')
const router = Router()

const todos = require('../routes/todos.routes')
const folders = require('../routes/folders.routes')
const users = require('../routes/users.routes')

// To-do C.R.U.D
router.use('/todo', todos)

// Folders C.R.U.D
router.use('/folder', folders)

// Uers management
router.use('/user', users)


module.exports = router;