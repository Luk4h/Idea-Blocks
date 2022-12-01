import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import { useBlock } from '../context/Block';

function Login() {
  const [blocks, setBlocks] = useState<any>();
  const [error, setError] = useState<any>();
  const [isCreatingNewBlock, setCreatingNewBlock] = useState<boolean>();
  const [blockname, setBlockname] = useState<string>();
  const [blockdescription, setBlockdescription] = useState<string>();
  const {block, setBlock} = useBlock();
  const { token } = useAuth();
  let navigate = useNavigate();

  useEffect( () => {
    let options = {
      method: 'get',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    }
    const fetchData = async () => {
      const result = await fetch('https://idea-blocks.cyclic.app/blocks', options)
      if ( result.status === 200 ) {
        setBlocks( await result.json())
      } else {
        setError( await result.json())
      }
    }
    fetchData()
      .catch(console.error);
  }, [isCreatingNewBlock])

  const handleCreation = (e: any) => {
    e.preventDefault();
    let options = {
      method: 'post',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      body: JSON.stringify({"blockTitle": blockname, "blockDescription": blockdescription})
    }

    const fetchData = async () => {
      const result = await fetch('https://idea-blocks.cyclic.app/blocks', options)
      console.log(result)
      if ( result.status === 200 ) {
        setCreatingNewBlock(!isCreatingNewBlock)
      } else {
        setError( await result.json())
      }
    }

    fetchData();
  }

  return (

    <div className="App">
      <h1 className='Header'>Your blocks</h1>
      <div className='BodyList'>
        { isCreatingNewBlock ? 
        <form className="card blockCreator" onSubmit={handleCreation}>
          <input type="text" placeholder="Block name" onChange={(e) => setBlockname(e.target.value)}/>
          <input type="text" placeholder="Block description" onChange={(e) => setBlockdescription(e.target.value)}/>
          <div className="buttons">
            <button onClick={() => setCreatingNewBlock(!isCreatingNewBlock)}>Cancel</button>
            <button type="submit">Create</button> 
          </div>
        </form>
        :
        <> {
        blocks && blocks.map((block: any) => 
          (
          <div className='Block' id={block.ID_BLOCK} onClick={() => {setBlock(block); navigate('/block/'+block.ID_BLOCK)}}>
            <h4>{block.TITLE_BLOCK}</h4>
            <p>{block.DESCRIPTION_BLOCK}</p>
          </div>
        )
        )}
        <div className='Block' id='NewBlock' onClick={() => setCreatingNewBlock(!isCreatingNewBlock)}>
            <h4>+ New block!</h4>
        </div>
        </>}
      </div>
    </div>
  )
}

export default Login
