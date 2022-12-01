import { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import { useNavigate, useLocation } from 'react-router-dom'

export const BlockEditor = () => {
    const location = useLocation();
    const [ block, setBlock ] = useState<any>();
    const [ blockText, setText ] = useState<any>();
    const { token } = useAuth();
    const blockId = location.pathname.split('/')[2];

    useEffect( () => {

    }, [])

    console.log(blockId)

    return (
        <div className="App">
          <h1 className='Header'>Your blocks</h1>
        </div>
      )
}