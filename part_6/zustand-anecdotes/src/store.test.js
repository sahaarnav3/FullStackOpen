import { describe, it, expect, beforeEach, vi, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import anecdotesService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFilteredAnecdotes, useAnecdoteActions } from './store'
import AnecdoteList from './components/AnecdoteList'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        deleteAnecdote: vi.fn()
    }
}))
vi.mock('../notificationStore', () => ({
    useNotificationActions: () => ({
        setMessage: vi.fn()
    })
}))

beforeEach(() => {
    useAnecdoteStore.setState({
        anecdotes: [],
        filteredAnecdotes: []
    })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {

    test('initialize anecdotes from service', async () => {
        const mockAnecdote = [{ id: 1, content: 'Test', votes: 1 }]
        anecdotesService.getAll.mockResolvedValue(mockAnecdote)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdote)
    })

    test('anecdotes are displayed sorted by the number of votes', async() => {
        const mockAnecdotes = [
            { id: '1', content: 'Premature optimization is the root of all evil', votes: 2 },
            { id: '2', content: 'Debugging is twice as hard as writing the code', votes: 12 },
            { id: '3', content: 'Good design is easier to change than bad design', votes: 5 }
        ]
        const finalAnecdotesList = [
            { id: '2', content: 'Debugging is twice as hard as writing the code', votes: 12 },
            { id: '3', content: 'Good design is easier to change than bad design', votes: 5 },
            { id: '1', content: 'Premature optimization is the root of all evil', votes: 2 },
        ]
        anecdotesService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useFilteredAnecdotes())
        expect(anecdotesResult.current).toEqual(finalAnecdotesList)
    })

    test(`anecdotes are displayed based on filter text`, async() => {
        const mockAnecdotes = [
            { id: '1', content: 'Premature optimization is the root of all evil', votes: 2 },
            { id: '2', content: 'Debugging is twice as hard as writing the code', votes: 12 },
            { id: '3', content: 'Good design is easier to change than bad design', votes: 5 }
        ]
        const finalAnecdotesList = [
            { id: '2', content: 'Debugging is twice as hard as writing the code', votes: 12 },
        ]
        anecdotesService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
            await result.current.filterAnecdotes('debugging')
        })

        const { result: anecdotesResult } = renderHook(() => useFilteredAnecdotes())
        expect(anecdotesResult.current).toEqual(finalAnecdotesList)
    })

    test('Voting increases the number of votes for an anecdote', async() => {
        const mockAnecdote = [{ id: 1, content: 'Test', votes: 1 }]
        const finalAnecdote = [{ id: 1, content: 'Test', votes: 2 }]

        anecdotesService.getAll.mockResolvedValue(mockAnecdote)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
            await result.current.voteIncrement(1) // anecdoteId = 1
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(finalAnecdote)
    })
})