const express = require('express')
const router = express()

const {
    createFolder,
    getFolders,
    getFolderById,
    deleteFolder
} = require('../controllers/folders.controller')


// GET ALL FOLDERS - GET FOLDER CONTENT 
router.get('/', getFolders)
router.get('/:id', getFolderById)

// CREATE FOLDER
router.post('/', createFolder)

// EDIT FOLDER

// DELETE FOLDER
router.delete('/:id', deleteFolder)








module.exports = router;