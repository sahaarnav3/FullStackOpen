import { createContext } from "react";
import { useAnecdotes } from "./hooks/useAnecdotes"

const AnecdotesContext = createContext()

export default AnecdotesContext

export const AnecdotesContextProvider = (props) => {
    const { anecdotes, addAnecdote, deleteAnecdote } = useAnecdotes()
    return(
        <AnecdotesContext.Provider value={{ anecdotes, addAnecdote, deleteAnecdote }}>
            {props.children}
        </AnecdotesContext.Provider>
    )
}

// Main idea of using Context because calling useAnecdotes hook in seperate components was creating different instances 
// of it in the memory i.e. updating state in one component was not updating in all, the re-rendering was not happening.