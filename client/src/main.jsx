import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import LoadingUser from './components/LoadingUser' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <LoadingUser>
        <App />
      </LoadingUser>
    </Provider>
  </StrictMode>,
)