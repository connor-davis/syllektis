import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'loading',
    initialState: {
        details: {},
    },
    reducers: {
        setAccountDetails: (state, action) => {
            state.details = action.payload
        },
    },
})

const { setAccountDetails } = accountSlice.actions

const selectAccountDetails = (state) => state.accountReducer.details

export { accountSlice, setAccountDetails, selectAccountDetails }
