import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

import useNotify from './useNotify'

export const useAnecdotes = () => {
    const { setNotification } = useNotify()
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 2 // can put 'false' to prevent retries
    })

    const newNoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: () => setNotification(`too short anecdote, must have length 5 or more`)
    })
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        newNoteMutation,
        updateAnecdoteMutation
    }
}