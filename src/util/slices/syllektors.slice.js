import { createSlice } from '@reduxjs/toolkit'

const ipcRenderer = window.ipcRenderer

const syllektorsSlice = createSlice({
    name: 'syllektors',
    initialState: {
        syllektors: [],
    },
    reducers: {
        setSyllektors: (state, action) => {
            state.syllektors = action.payload
        },
    },
})

const { setSyllektors } = syllektorsSlice.actions

const selectSyllektors = (state) => state.syllektorsReducer.syllektors

export { syllektorsSlice, setSyllektors, selectSyllektors }
