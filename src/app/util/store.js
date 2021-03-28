import { applyMiddleware, createStore } from 'redux'

import { accountSlice } from './slices/account.slice'
import { combineReducers } from '@reduxjs/toolkit'
import { loadingSlice } from './slices/loading.slice'
import { materialsSlice } from './slices/materials.slice'
import { syllektionsSlice } from './slices/syllektions.slice'
import { syllektorsSlice } from './slices/syllektors.slice'

let syllektorsReducer = syllektorsSlice.reducer
let syllektionsReducer = syllektionsSlice.reducer
let materialsReducer = materialsSlice.reducer
let loadingReducer = loadingSlice.reducer
let accountReducer = accountSlice.reducer

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
    materialsReducer,
    loadingReducer,
    accountReducer,
})

let store = createStore(rootReducer, applyMiddleware(loggerMiddleware))

export default store
