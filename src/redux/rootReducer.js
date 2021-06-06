import { combineReducers } from 'redux'
import quesReducer from './questions/quesReducer'
import usersReducer from './users/usersReducer'

const rootReducer = combineReducers({
    questions: quesReducer,
    users: usersReducer
})

export default rootReducer
