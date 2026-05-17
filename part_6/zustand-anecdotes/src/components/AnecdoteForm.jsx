import { useState } from "react";
import { useAnecdoteActions } from "../store";
import { useNotificationActions } from '../notificationStore'

export default function AnecdoteForm() {
  const [newAnecdote, setNewAnecdote] = useState("")
  const { addNewAnecdote } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  function formHandler(e) {
    e.preventDefault()
    addNewAnecdote(newAnecdote)
    setMessage(`Anecdote '${newAnecdote}' Added`)
    setNewAnecdote('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={formHandler}>
        <div>
          <input onChange={(e) => setNewAnecdote(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
