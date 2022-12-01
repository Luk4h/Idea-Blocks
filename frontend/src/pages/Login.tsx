import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

function Login() {
  const [username, setUsername] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { signIn } = useAuth();
  let navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    signIn( username, password)
      .then((res: any) => {
        if (!res) {
          throw 'Invalid_Credentials'
        }
        res ? navigate('/menu') : navigate('/login')
      })
      .catch((err: any) => {
      console.log(err)
      setLoading(false)
      setIsInvalid(true)
  })

  }
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Idea blocks</h1>
      <div>
        <form className="card" onSubmit={ handleLogin }>
          <input onChange={ (e) => setUsername(e.target.value) } type="text" placeholder="Username"/>
          <input onChange={ (e) => setPassword(e.target.value) } type="password" placeholder="••••••••"/>
          <div className="buttons">
            <button onClick={ () => navigate('/register') }>Register</button>
            <button type="submit">Login</button> 
          </div>
        </form>
      </div>
      <p className="read-the-docs">
        Made with ❤️ in Brazil 🇧🇷
      </p>
    </div>
  )
}

export default Login
