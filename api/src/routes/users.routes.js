const express = require('express')
const router = express()

const {
    getUsers,
    createUser, 
    getUserByEmail, 
    loginUser 
} = require('../controllers/users.controller')


// GET ALL USERS - GET USER BY EMAIL
router.get('/', getUsers)
router.get('/:email', getUserByEmail)

// CREATE USER
router.post('/register', createUser)

// LOGIN
router.post('/login', loginUser)



module.exports = router;