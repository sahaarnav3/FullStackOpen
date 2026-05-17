import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
    message: '',
    actions: {
        setMessage: (messageValue) => {
            set({ message: messageValue })
            setTimeout(() => {
                set({ message: '' })
            }, 5000);
        },
    }
}))

export const useMessage = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)