import { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import { useBlock } from '../context/Block';
import { useNavigate, useLocation } from 'react-router-dom'

export const BlockEditor = () => {
    const location = useLocation();
    const [ text, setText ] = useState<any>();
    const [error, setError] = useState<any>();
    const { token } = useAuth();
    const { block } = useBlock();
    let navigate = useNavigate();

    useEffect( () => {
      if ( block.ID_TEXT_BLOCK ) {
        let options = {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
            body: JSON.stringify({"textId": block.ID_TEXT_BLOCK})
        }
        const fetchData = async () => {
            const result = await fetch('https://idea-blocks.cyclic.app/texts', options)
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
          const result = await fetch('https://idea-blocks.cyclic.app/texts', options)
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
          const result = await fetch('https://idea-blocks.cyclic.app/blocks', options)
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
          <div className='BlockButtons'>
            <div>
              <button className='Button' onClick={()=>navigate('/home')}>Back</button>
            </div>
            <div className='SaveDelete'>
              <button id='DeleteButton' className='Button' onClick={handleDelete}>Delete</button>
              <button id='SaveButton' className='Button' onClick={handleSave}>Save</button>
            </div>
          </div>
          <h1 className='Header'>{ block.TITLE_BLOCK}</h1>
          <h5>{ block.DESCRIPTION_BLOCK }</h5>
          <textarea className='Notepad' value={text && text} onChange={(e)=>setText(e.target.value)}/>
        </div>
      )
}