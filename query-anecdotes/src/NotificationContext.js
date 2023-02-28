import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return `you voted for '${action.payload.content}'`
        case 'CREATE':
            return `you created anecdote '${action.payload.content}'`
        case 'CLEAR':
            return null
        case 'INVALID_LENGTH':
            return 'too short anecdote, must have length 5 or more'
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext