
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: '',
  actions: {
    add: anecdote => {
      set(
      state => ({ anecdotes: state.anecdotes.concat(anecdote)})
      )
      get().actions.setNotification('Added anecdote')
    },

    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const voted = await anecdoteService.voteAnecdote(id, { ...anecdote, votes: anecdote.votes+1 })

      set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? voted : anecdote
        )
      })
      )
      get().actions.setNotification('Voted for anecdote')
    },

    deleteZero: async () => {
      const anecdotes = get().anecdotes
      const updated = anecdotes.filter(a => a.votes !== 0)
      set({ anecdotes: updated })
    },

    setFilter: value => set(() => ({ filter: value })),
    setNotification: value => {
      set(() => ({ notification: value }))
      setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000);},
    initialize: anecdotes => set(() => ({ anecdotes }))
  },
}))

export default useAnecdoteStore

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const anecdotesFiltered = anecdotes.filter(a => a.content.includes(filter))
  return anecdotesFiltered
}
export const useNotification = () => {
  const notification = useAnecdoteStore((state) => state.notification)
  return notification
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
