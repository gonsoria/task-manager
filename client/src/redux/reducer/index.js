import { 
    LOG_IN, 
    SIGN_UP, 
    CREATE_FOLDER, 
    DELETE_FOLDER, 
    CREATE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    LOG_OUT
 } from '../actions'

const initialState ={
    profile: [],
    folders:[],
    todos: [],
    isAuthenticated: false,
    accountStatus:null,
    accountCreated: null
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case LOG_IN:
            return {
                profile: action.payload.profile,
                folders: action.payload.profile.folder,
                todos: action.payload.profile.todos,
                isAuthenticated: action.payload.isAuthenticated,
                accountStatus: action.payload.accountStatus
            }
        case LOG_OUT:
            return {
                profile: [],
                folders:[],
                todos: [],
                isAuthenticated: false,
                accountStatus:'',
                accountCreated: null
            }
        case SIGN_UP:
            return {
                ...state,
                accountCreated: action.payload
            }
        case CREATE_FOLDER:
            return {
                ...state,
                folders:[...state.folders, action.payload]
            }
        case DELETE_FOLDER:
            return {
                ...state,
                folders: state.folders.filter(folder => folder.id !== action.payload)
            }
        case CREATE_TODO:
            return {
                ...state,
                todos:[...state.todos, action.payload]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo)
            }
        default:
            return state
    }
}