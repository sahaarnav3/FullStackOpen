import useNotify from "../hooks/useNotify"

const AnecdoteForm = ({ newNoteMutation }) => {
  const { setNotification } = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newNoteMutation.mutate({ content, votes: 0 })
    setNotification(`anecdote '${content}' added`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm