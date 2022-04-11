const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const folderFinder = async (id) => {
    const folderId = Number(id)
    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId
        },
        include: {
            todo: true,
            user: true
        }
    })
    return folder
}


module.exports = {
    folderFinder
}