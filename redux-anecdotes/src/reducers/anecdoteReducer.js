import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

function compareAnecdoteVotes(anec1, anec2) {
  if(anec1.votes < anec2.votes) return 1
  if(anec1.votes > anec2.votes) return -1
  if(anec1.votes === anec2.votes) return 0
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state,action){
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const unorderedState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      return unorderedState.sort(compareAnecdoteVotes)
    },
    appendAnecdote(state,action) {
      return [...state,action.payload].sort(compareAnecdoteVotes)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const orderedAnecdotes = anecdotes.sort(compareAnecdoteVotes)
    dispatch(setAnecdotes(orderedAnecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => { 
      const updatedAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
  
    const id = anecdote.id
    await anecdoteService.update(id,updatedAnecdote)
    dispatch(initializeAnecdotes())
  }
}

export const { vote, appendAnecdote, setAnecdotes, incrementeVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  let unorderedState = []
  switch(action.type){
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      unorderedState = state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return unorderedState.sort(compareAnecdoteVotes)
    case 'NEW_ANECDOTE':
        return [...state, action.payload].sort(compareAnecdoteVotes)
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: { 
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer */