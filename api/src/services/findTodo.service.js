const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const todoFinder = async (id) => {
    const todoId = Number(id)
    const todo = await prisma.todo.findUnique({
        where: {
            id: todoId
        },
        include: {
            folder: true,
            user: true
        }
    })
    return todo
}


module.exports = {
    todoFinder
}