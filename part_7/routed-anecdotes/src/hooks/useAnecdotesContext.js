import { useContext } from "react"
import AnecdotesContext from "../AnecdotesContext"

const useAnecdotesContext = () => useContext(AnecdotesContext)

export default useAnecdotesContext