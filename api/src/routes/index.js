const { Router } = require('express')
const router = Router()

const todos = require('../routes/todos.routes')

// To-do C.R.U.D
router.use('/todo', todos)





module.exports = router;