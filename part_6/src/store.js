import { create } from 'zustand'

const useCounterStore = create(set => ({
    good: 0,
    neutral: 0,
    bad: 0,
    actions: {
        goodIncrement: () => set(state => ({ good: state.good + 1 })),
        neutralIncrement: () => set(state => ({ neutral: state.neutral + 1 })),
        badIncrement: () => set(state => ({ bad: state.bad + 1 }))
    }
}))

export const useGoodCounter = () => useCounterStore(state => state.good)
export const useNeutralCounter = () => useCounterStore(state => state.neutral)
export const useBadCounter = () => useCounterStore(state => state.bad)

export const useCounterControls = () => useCounterStore(state => state.actions)