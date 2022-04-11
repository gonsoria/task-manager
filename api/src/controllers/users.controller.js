const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany()

        res.status(200).json(allUsers)      

    } catch (error) {
        console.log(error)
        res.status(500).json(error)       
    }
}


const getUserByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        res.status(200).json(user)      

    } catch (error) {
        console.log(error)
        res.status(500).json(error)       
    }
}



const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        if (!findUser) {

            const salt= await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                }
            })
            res.status(200).json(newUser)
        } else {
            res.send('User already exists')
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const findUser = await prisma.user.findUnique({
        where: {
            email
        }
    })        
    
    if(!findUser) {
        res.json('Cannot find user')
    } else {
        try {
            if (await bcrypt.compare(password, findUser.password)) {
                res.json('success')
            } else {
                res.send('failed') // incorrect password
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = {
     getUsers,
     createUser, 
     getUserByEmail, 
     loginUser 
}