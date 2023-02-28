import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes+1,
      id: anecdote.id
    }
    updateAnecdoteMutation.mutate(updatedAnecdote)
    dispatch({type: 'VOTE', payload: anecdote})
    setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
  }
  
  const result = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })
  console.log(result.data)

  if( result.isLoading ) {
    return <div>loading data...</div>
  }

  if( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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

export default App
