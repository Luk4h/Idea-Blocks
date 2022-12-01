import { AuthProvider } from './context/Auth'
import { BrowserRoutes } from './routes/Router';
import './App.css'

function App() {

  return (
    <AuthProvider>
        <BrowserRoutes />
    </AuthProvider>
  )
}

export default App
