import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { timedVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))

    const handleVote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(timedVoteNotification(anecdote,5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList