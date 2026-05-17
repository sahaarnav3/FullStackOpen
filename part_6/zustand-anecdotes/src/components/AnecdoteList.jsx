import { useFilteredAnecdotes, useAnecdoteActions } from "../store";
import { useNotificationActions } from '../notificationStore'

export default function AnecdoteList() {
  const anecdotes = useFilteredAnecdotes();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const { voteIncrement, deleteAnecdote } = useAnecdoteActions();
  const { setMessage } = useNotificationActions()

  function voteButtonHandler(anecdote) {
    voteIncrement(anecdote.id)
    setMessage(`You voted '${anecdote.content}'`)
  }

  function deletehandler(anecdote) {
    if(anecdote.votes > 0){
      setMessage(`Anecdote '${anecdote.content}' can't be Deleted`)
      return;
    }
    deleteAnecdote(anecdote.id)
    setMessage(`Anecdote '${anecdote.content}' Deleted`)
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteButtonHandler(anecdote)}>vote</button>
            <button onClick={() => deletehandler(anecdote)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
