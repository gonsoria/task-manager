import axios from 'axios'

export const LOG_IN = "LOG_IN"
export const SIGN_UP = "SIGN_UP"
export const EDIT_TODO = "EDIT_TODO"
export const CREATE_TODO = "CREATE_TODO"
export const DELETE_TODO = "DELETE_TODO"

const LOGIN = 'http://localhost:3001/user/login'
const REGISTER = 'http://localhost:3001/user/register'
const PROFILE = 'http://localhost:3001/user/'
const EDIT_DB_TODO = 'http://localhost:3001/todo/edit/'
const CREATE_DB_TODO = 'http://localhost:3001/todo/post/'
const DELETE_DB_TODO = 'http://localhost:3001/todo/'



export const getProfileData = (email) => {
    return async function (dispatch) {
    const user = await axios.get(PROFILE + email)
    const userProfile = {
        id: user.data.id,
        email: user.data.email,
        folder: user.data.folder,
        todos: user.data.todo
    }
    dispatch({
        type: LOG_IN,
        payload: {profile: userProfile, isAuthenticated: true}
    })
    }
}


export const logIn = (userData) => {
    const { email, password } = userData
    return async function (dispatch) {
        try {
            let req = await axios.post(LOGIN, {
                email: email,
                password: password
            })
            if (req.data === 'success') {
                const user = await axios.get(PROFILE + email)
                const userProfile = {
                    id: user.data.id,
                    email: user.data.email,
                    folder: user.data.folder,
                    todos: user.data.todo
                }
                dispatch({
                    type: LOG_IN,
                    payload: {profile: userProfile, isAuthenticated: true}
                })

            } else if (req.data === 'failed') {
                dispatch({
                    type: LOG_IN,
                    payload: {profile:{}, isAuthenticated: false}
                })
            } else {
                dispatch({
                    type: LOG_IN,
                    payload: {profile:{}, isAuthenticated: false}
                })
            }      
            
        } catch (error) {
            console.log(error)     
        }
    }
}

export const createUser = (userData) => {
    const { email, password } = userData
    return async function (dispatch) {
        try {
            let req = await axios.post(REGISTER, {
                email: email,
                password: password
            })
            if(!req.data) {
                dispatch({
                    type: SIGN_UP,
                    payload: false
                })
            } else {
                dispatch ({
                    type: SIGN_UP,
                    payload: true 
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createTodo =  (todoData) => {
    const { title, description, folderId } = todoData
    return async function (dispatch) {
        try {
            const req = await axios.post(CREATE_DB_TODO, {
                title,
                description,
                folderId
            })
            if(req.data) {
                dispatch ({
                    type: CREATE_TODO
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const editTodo =  (newData, id) => {
    const { title, description, todoStatus } = newData
    return async function (dispatch) {
        try {
            console.log(newData)
            const req = await axios.put(EDIT_DB_TODO + id, {
                title,
                description,
                todoStatus
            })
            dispatch({
                type: EDIT_TODO,
                payload: req.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteTodo = (id) => {
    return async function (dispatch) {
        try {
            const req = await axios.delete(DELETE_DB_TODO + id)
            if(req.data) {
                dispatch({
                    type:DELETE_TODO
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}