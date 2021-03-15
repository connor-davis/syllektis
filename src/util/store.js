import { applyMiddleware, createStore } from 'redux'

import { combineReducers } from '@reduxjs/toolkit'
import { syllektorsSlice } from './slices/syllektors.slice'

let syllektorsReducer = syllektorsSlice.reducer

function loggerMiddleware(store) {
    return function (next) {
        return function (action) {
            console.log(action)
            next(action)
            console.log(store.getState())
        }
    }
}

const rootReducer = combineReducers({
    syllektorsReducer,
})

let store = createStore(rootReducer, applyMiddleware(loggerMiddleware))

export default store
