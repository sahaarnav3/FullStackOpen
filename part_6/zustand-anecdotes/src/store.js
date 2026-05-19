import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filteredAnecdotes: [],
  actions: {
    voteIncrement: async (id) => {
      let newAnecdote = {}

      const newAnecdotesList = get().anecdotes.map(anecdote => {
        if (anecdote.id !== id)
          return anecdote
        newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        return newAnecdote
      })
      anecdoteService.update(id, newAnecdote)
      set(state => ({
        anecdotes: newAnecdotesList,
        filteredAnecdotes: state.filteredAnecdotes.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
      }))
    },
    addNewAnecdote: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
        filteredAnecdotes: state.filteredAnecdotes.concat(newAnecdote)
      }))
    },
    deleteAnecdote: async(id) => {
      const newAnecdotesList = get().anecdotes.filter(anecdote => anecdote.id !== id)
      anecdoteService.deleteAnecdote(id)
      set(state => ({
        anecdotes: newAnecdotesList,
        filteredAnecdotes: state.filteredAnecdotes.filter(anecdotes => anecdotes.id !== id)
      }))
    },
    filterAnecdotes: filterValue => set(state => ({
      filteredAnecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
    })),
    initialize: async () => {
      const data = await anecdoteService.getAll()
      set({
        anecdotes: data,
        filteredAnecdotes: data
      })
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilteredAnecdotes = () => useAnecdoteStore(useShallow((state) => state.filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)))
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export default useAnecdoteStore;