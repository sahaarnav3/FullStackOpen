import { useEffect, useState } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useAnecdoteActions } from './store'
import { useMessage } from "./notificationStore"

const App = () => {
  const { initialize } = useAnecdoteActions()
  const [showNotification, setShowNotification] = useState('')
  const notificationMessage = useMessage()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <h2>Anecdotes</h2>
      {notificationMessage && <Notification message={notificationMessage} />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App