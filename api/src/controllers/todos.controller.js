const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const {
    todoFinder
} = require('../services/findTodo.service')



const getTodos = async (req, res) => {
    try {
        const allTodos = await prisma.todo.findMany()
        res.status(200).json(allTodos)        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }  
}

const getTodoById = async (req, res) => {
    const { id } = req.params
    try{
        if(id) {
            const todo = await todoFinder(id)
            if(todo){
                res.status(200).json(todo)    
            } else {
                res.status(404).json('todo does not exist')
            }
        } else {
            res.status(404).json('id does not exist')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const createTodo = async (req, res) => {
    const { todoData } = req.body
    // todoData = {
    //     title,
    //     description,
    //     folderId
    // }
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title: todoData.title,
                description: todoData.description,
                folderId: Number(todoData.folderId)
            }
        })

        res.status(200).json(newTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const editTodo = async (req, res) => {
    const { id } = req.params
    const { newData } = req.body
    try {
        if(id) {
            const todo = await todoFinder(id)
            if(todo) {
                const todoEdited = await prisma.todo.update({
                    where : {
                        id: todo.id
                    },
                    data: {
                        title: newData.title === '' ? todo.title : newData.title,
                        description: newData.description === '' ? todo.description : newData.description,
                        todoStatus: newData.todoStatus === '' ? todo.todoStatus : newData.todoStatus
                    }
                })
                console.log('Update succes!')
                res.status(200).json(todoEdited)
            } 
        }         
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
        if(id) {
            const todoToDelete = await todoFinder(id)
            if(todoToDelete) {
                const deletedTodo = await prisma.todo.delete({
                    where: {
                        id: todoToDelete.id
                    }
                })
                console.log('todo deleted')
                res.status(200).json(deletedTodo)
            } 
        }     
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}



module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    editTodo,
    deleteTodo
}