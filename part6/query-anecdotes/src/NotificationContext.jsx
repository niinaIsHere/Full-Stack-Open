import { createContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('')

  useEffect(() => {
    if (notification !== '') {
    console.log("notification changed:", notification)
    setTimeout(() => setNotification(''), 5000)}
  }, [notification])
  
  return (
    <NotificationContext.Provider value={{ setNotification, notification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
