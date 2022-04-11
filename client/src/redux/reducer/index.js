import { LOG_IN, SIGN_UP } from '../actions'

const initialState ={
    profile: [],
    isAuthenticated: false,
    accountCreated: null
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state,
                profile: action.payload.profile,
                isAuthenticated: action.payload.isAuthenticated
            }
        case SIGN_UP:
            return {
                ...state,
                accountCreated: action.payload
            }
        default:
            return state
    }
}