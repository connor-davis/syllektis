import { createSlice } from '@reduxjs/toolkit'

const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
        materials: [],
    },
    reducers: {
        setMaterials: (state, action) => {
            state.materials = action.payload
        },
    },
})

const { setMaterials } = materialsSlice.actions

const selectMaterials = (state) => state.materialsReducer.materials

export { materialsSlice, setMaterials, selectMaterials }
