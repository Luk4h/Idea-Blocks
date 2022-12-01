import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'

function Login() {
    const [fullname, setFullname] = useState<string | null>()
    const [username, setUsername] = useState<string | null>()
    const [password, setPassword] = useState<string | null>()
    const [loading, setLoading] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const { signUp } = useAuth()
    let navigate = useNavigate();

    const handleRegister = (e: any) => {
        e.preventDefault();
        signUp( fullname, username, password)
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
        <p className="read-the-docs">
            It is amazing to have you here!
        </p>
            <form className="card" onSubmit={ handleRegister }>
            <input onChange={ (e) => setFullname(e.target.value) } type="text" placeholder="Full name"/>
            <input onChange={ (e) => setUsername(e.target.value) } type="text" placeholder="Username"/>
            <input onChange={ (e) => setPassword(e.target.value) } type="password" placeholder="••••••••"/>
            <div className="buttons">
                <button onClick={ () => navigate('/login')}>Cancel</button> 
                <button type="submit">Register</button>
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
