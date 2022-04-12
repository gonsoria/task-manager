const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const {
    folderFinder
} = require ('../services/findFolder.service')



const createFolder = async (req, res) => {
    const { folderData } = req.body
    try {
        const newFolder = await prisma.folder.create({
            data: {
                folderName: folderData.folderName,
                userId: folderData.userId
            },
            include: {
                todo:true
            }
        })
        console.log('new folder created')
        res.status(200).json(newFolder)
                
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getFolders = async (req, res) => {
    try {
        const allFolders = await prisma.folder.findMany({
            include: {
                todo:true
            }
        })
        res.status(200).json(allFolders)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getFolderById = async (req, res) => {
    const { id } = req.params
    try {
        if(id) {
            const folder = await folderFinder(id)
            if(folder) {
                res.status(200).json(folder)
            } else {
                res.status(404).json('folder does not exist')
            }
        } else {
            res.status(404).json('id does not exist')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteFolder = async (req, res) => {
    const { id } = req.params
    try {
        if(id) {
            const folderToDelete = await folderFinder(id)
            if (folderToDelete && folderToDelete.todo.length < 1) {
                console.log('no tiene todos')
                const folderDeleted = await prisma.folder.delete({
                    where: {
                        id: folderToDelete.id
                    }
                })
                res.status(200).json(folderDeleted)
            } else if(folderToDelete && folderToDelete.todo.length > 0) {
                console.log('tiene todos')
                const deleteFolderTodos = await prisma.todo.deleteMany({
                    where: {
                        folderId: Number(id)
                    }
                })
                const folderDeleted = await prisma.folder.delete({
                    where: {
                        id: folderToDelete.id
                    }
                })
                res.status(200).json(folderDeleted)
            } else {
                res.status(404).json('Folder does not exists')
            }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    createFolder,
    getFolders,
    getFolderById,
    deleteFolder
}