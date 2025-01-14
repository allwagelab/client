import { BrowserRouter } from 'react-router-dom'

import Router from './router'

function App() {
  const initialAuthState = {
    accessToken: null,
    isAuthenticated: false,
  }

  return (
    <BrowserRouter>
      <Router auth={initialAuthState} />
    </BrowserRouter>
  )
}

export default App
