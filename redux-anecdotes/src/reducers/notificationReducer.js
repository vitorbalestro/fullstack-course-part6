import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        voteNotification(state,action){
            return `you voted '${action.payload}'`
        },
        createNotification(state,action){
            return `you created '${action.payload}'`
        },
        removeNotification(state, action){
            return null
        }
    }
})

export const timedVoteNotification = (anecdote,time) => {
    return (dispatch) => {
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => dispatch(removeNotification()), time*1000)
    }
}

export const timedCreateNotification = (content,time) => {
    return (dispatch) => {
        dispatch(createNotification(content))
        setTimeout(() => dispatch(removeNotification()), time*1000)
    }
}

export const { voteNotification, createNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer