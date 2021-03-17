import { createSlice } from '@reduxjs/toolkit'

const syllektionsSlice = createSlice({
    name: 'syllektions',
    initialState: {
        syllektions: [],
    },
    reducers: {
        setSyllektions: (state, action) => {
            state.syllektions = action.payload
        },
    },
})

const { setSyllektions } = syllektionsSlice.actions

const selectSyllektions = (state) => state.syllektionsReducer.syllektions

export { syllektionsSlice, setSyllektions, selectSyllektions }
