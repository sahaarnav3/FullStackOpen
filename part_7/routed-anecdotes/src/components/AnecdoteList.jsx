import useAnecdotesContext from '../hooks/useAnecdotesContext'

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotesContext()

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            {anecdote.content}{" "}<button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </li>)}
      </ul>
    </div>
  )
}

export default AnecdoteList
