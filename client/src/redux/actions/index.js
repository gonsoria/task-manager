import axios from 'axios'

export const LOG_IN = "LOG_IN"
export const SIGN_UP = "SIGN_UP"

const LOGIN = 'http://localhost:3001/user/login'
const REGISTER = 'http://localhost:3001/user/register'
const PROFILE = 'http://localhost:3001/user/'



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
            
        }
    }
}

