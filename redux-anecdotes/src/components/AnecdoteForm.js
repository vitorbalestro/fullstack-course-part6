import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { timedCreateNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
    
        dispatch(createAnecdote(content))
        dispatch(timedCreateNotification(content,5))
    }
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='newAnecdote'/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm