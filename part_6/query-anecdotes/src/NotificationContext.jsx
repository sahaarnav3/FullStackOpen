import { createContext, useEffect, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setNotification('')
        }, 5000);
    }, [notification])
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}