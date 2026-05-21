import { createContext, useEffect, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('')
    useEffect(() => {
        if(!notification)
            return 

        const timer = setTimeout(() => {
            setNotification('')
        }, 5000);

        return () => clearTimeout(timer)
    }, [notification])
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}