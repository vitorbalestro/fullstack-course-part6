import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

/*const filterReducer = (state = '', action) => {
    if(action.type === 'SET_FILTER') {
        return action.payload
    }
    return state
}

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter 
    }
}

export default filterReducer*/