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
      if ( block.ID_TEXT_BLOCK ) {
        let options = {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
            body: JSON.stringify({"textId": block.ID_TEXT_BLOCK})
        }
        const fetchData = async () => {
            const result = await fetch('http://localhost:8181/texts', options)
            if ( result.status === 200 ) {
                setText( (await result.json()).blockText)
            } else {
                setError( await result.json())
            }
        }
        fetchData();
    }}, [block])

    const handleSave = (e: any) => {
      let options = {
          method: 'put',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
          body: JSON.stringify({"textId": block.ID_TEXT_BLOCK, "textBody": text})
      }
      const fetchData = async () => {
          const result = await fetch('http://localhost:8181/texts', options)
          if ( result.status === 200 ) {
              console.log('Saved')
          } else {
              setError( await result.json())
          }
      }
      fetchData();
    }

    const handleDelete = (e: any) => {
      let options = {
          method: 'delete',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
          body: JSON.stringify({"blockId": block.ID_BLOCK, "blockTitle": block.TITLE_BLOCK})
      }
      const fetchData = async () => {
          const result = await fetch('http://localhost:8181/blocks', options)
          if ( result.status === 200 ) {
              console.log('Deleted');
              navigate('/home');
          } else {
              setError( await result.json())
          }
      }
      fetchData();
    }

    return (
        <div className="App">
          <h1 className='Header'>Your blocks</h1>
        </div>
      )
}