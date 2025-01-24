import { BrowserRouter } from 'react-router-dom'

import Router from './router'

function App() {
  return (
    <BrowserRouter>
      <Router auth={null} />
    </BrowserRouter>
  )
}

export default App
