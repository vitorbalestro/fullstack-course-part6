import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient() 

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length >= 5){
      const anecdoteObject = { content: content, votes: 0 }
      newAnecdoteMutation.mutate(anecdoteObject)
      dispatch({ type: 'CREATE', payload: anecdoteObject })
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
    } else {
      dispatch({ type: 'INVALID_LENGTH' })
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
    }

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
