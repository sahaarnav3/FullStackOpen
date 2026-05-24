import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])
    async function addAnecdote(anecdote) {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        setAnecdotes(anecdotes.concat(newAnecdote))
    }
    async function deleteAnecdote(id) {
        await anecdoteService.deleteAnecdote(id)
        setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}