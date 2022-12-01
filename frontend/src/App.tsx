import { AuthProvider } from './context/Auth'
import { BlockProvider } from './context/Block'
import { BrowserRoutes } from './routes/Router';
import './App.css'
import { createContext, useState } from 'react';

export const BlockContext = createContext<any>(null);

function App() {
  const [block, setBlock] = useState<any>({});

  return (
    <AuthProvider>
      <BlockProvider>
          <BrowserRoutes />
      </BlockProvider>
    </AuthProvider>
  )
}

export default App
