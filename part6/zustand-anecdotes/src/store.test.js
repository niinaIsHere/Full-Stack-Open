import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'


vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    voteAnecdote: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, setFilter, useAnecdoteActions } from './store'


beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ content: "If it hurts, do it more often", id: "47145", votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize(mockAnecdotes)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('initialize loads anecdotes sorted by votes', async () => {
    const mockAnecdotes = [{ content: "If it hurts, do it more often", id: "47145", votes: 2 },
      { content: "Adding manpower to a late software project makes it later!", id: "21149", votes: 1 },
      { content: "Premature optimization is the root of all evil.", id: "25170", votes: 0 }]

    const correctAnecdoteOrder = [{ content: "If it hurts, do it more often", id: "47145", votes: 2 },
        { content: "Adding manpower to a late software project makes it later!", id: "21149", votes: 1 },
        { content: "Premature optimization is the root of all evil.", id: "25170", votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize(mockAnecdotes)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(correctAnecdoteOrder)
  })

  it('react component receives correctly filtered list of anecdotes', async () => {
    const mockAnecdotes = [{ content: "If it hurts, do it more often", id: "47145", votes: 2 },
      { content: "Adding manpower to a late software project makes it later!", id: "21149", votes: 1 },
      { content: "Premature optimization is the root of all evil.", id: "25170", votes: 0 }]

    const correctAnecdotesFiltered = [{ content: "If it hurts, do it more often", id: "47145", votes: 2 },
        { content: "Adding manpower to a late software project makes it later!", id: "21149", votes: 1 }]

    useAnecdoteStore.setState({ filter: 'it' })
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize(mockAnecdotes)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(correctAnecdotesFiltered)
  })

  it('voting increases number of votes for anecdote', async () => {
    const mockAnecdotes = [{ content: "If it hurts, do it more often", id: "47145", votes: 0 }]
    const expectedAnecdotes = [{ content: "If it hurts, do it more often", id: "47145", votes: 1 }]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes})
    anecdoteService.voteAnecdote.mockResolvedValue(expectedAnecdotes[0])

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize(mockAnecdotes)
    })
    await result.current.vote("47145")

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    expect(anecdotesResult.current).toEqual(expectedAnecdotes)
  })

})
