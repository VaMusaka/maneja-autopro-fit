import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import combinedReducer from './combinedReducer'

const initialState = {}

const Store = createStore(
    combinedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default Store
