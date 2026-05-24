import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AnecdotesContextProvider } from './AnecdotesContext.jsx'

createRoot(document.getElementById('root')).render(
    <AnecdotesContextProvider >
        <App />
    </AnecdotesContextProvider>
)
