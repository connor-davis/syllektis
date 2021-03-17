import { applyMiddleware, createStore } from 'redux'

import { combineReducers } from '@reduxjs/toolkit'
import { syllektorsSlice } from './slices/syllektors.slice'
import { syllektionsSlice } from './slices/syllektions.slice'

let syllektorsReducer = syllektorsSlice.reducer
let syllektionsReducer = syllektionsSlice.reducer

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
    syllektionsReducer,
})

let store = createStore(rootReducer, applyMiddleware(loggerMiddleware))

export default store
