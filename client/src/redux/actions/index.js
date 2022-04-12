import axios from 'axios'

export const LOG_IN = "LOG_IN"
export const SIGN_UP = "SIGN_UP"
export const EDIT_TODO = "EDIT_TODO"
export const CREATE_TODO = "CREATE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const DELETE_FOLDER = "DELETE_FOLDER"
export const CREATE_FOLDER = "CREATE_FOLDER"
export const PROFILE_LOAD = "PROFILE_LOAD"
export const LOG_OUT = "LOG_OUT"

const LOGIN = 'http://localhost:3001/user/login'
const REGISTER = 'http://localhost:3001/user/register'
const PROFILE = 'http://localhost:3001/user/'
const USER_TODOS = 'http://localhost:3001/todo/user/'
const EDIT_DB_TODO = 'http://localhost:3001/todo/edit/'
const CREATE_DB_TODO = 'http://localhost:3001/todo/post/'
const DELETE_DB_TODO = 'http://localhost:3001/todo/'
const DELETE_DB_FOLDER = 'http://localhost:3001/folder/'
const CREATE_DB_FOLDER = 'http://localhost:3001/folder/'




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
                const userTodos = await axios.get(USER_TODOS + email)
                console.log(userTodos)
                const userProfile = {
                    id: user.data.id,
                    email: user.data.email,
                    folder: user.data.folder,
                    todos: userTodos.data
                }
                dispatch({
                    type: LOG_IN,
                    payload: {profile: userProfile, isAuthenticated: true, accountStatus:req.data}
                })

            } else if (req.data === 'failed') {
                dispatch({
                    type: LOG_IN,
                    payload: {profile:{}, isAuthenticated: false, accountStatus:req.data}
                })
            } else {
                dispatch({
                    type: LOG_IN,
                    payload: {profile:{}, isAuthenticated: false, accountStatus:req.data}
                })
            }      
            
        } catch (error) {
            console.log(error)     
        }
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT
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
    const { title, description, folderId, userId } = todoData
    return async function (dispatch) {
        try {
            const req = await axios.post(CREATE_DB_TODO, {
                title,
                description,
                folderId,
                userId
            })
            if(req.data) {
                dispatch ({
                    type: CREATE_TODO,
                    payload: req.data
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
                    type:DELETE_TODO,
                    payload:req.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteFolder = (id) => {
    return async function (dispatch) {
        try {
            const req = await axios.delete(DELETE_DB_FOLDER + id)
            if(req.data) {
                dispatch({
                    type:DELETE_FOLDER,
                    payload:id
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const createFolder = (folderData) => {
    return async function(dispatch) {
        try {
            const req = await axios.post(CREATE_DB_FOLDER, {folderData})
            if(req.data) {
                dispatch({
                    type:CREATE_FOLDER,
                    payload:req.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}