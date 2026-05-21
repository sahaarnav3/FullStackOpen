import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotify from './hooks/useNotify'


const App = () => {
  const { anecdotes, isPending, isError, newNoteMutation, updateAnecdoteMutation} = useAnecdotes()
  const { notification, setNotification } = useNotify()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`)
  }

  if (isError)
    return <div>anecdote service not available due to problems in server</div>

  if (isPending)
    return <div>loading data...</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      { notification && <Notification message={notification} />}
      <AnecdoteForm newNoteMutation={newNoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App