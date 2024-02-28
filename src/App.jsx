import { useState } from 'react'
import './App.css'
import Form from './Form';
import Site from './Site';
import Loading from './assets/loading';

function App() {
  const [generated, setGenerated] = useState(false);
  const [raw, setRaw] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setChangeOfRaw = (value) => {
    setRaw(value);
  }

  const setGeneratedToTrue = () => {
    setGenerated(true);
  }

  return(
    <>
    {isLoading && !generated ? <Loading /> : generated ? <Site raw={raw}/> : <Form setGenerated={setGeneratedToTrue} setRaw={setChangeOfRaw} setIsLoading={setIsLoading}/>}
    </>
  );

}

export default App

/*to-do:
- button REGENERATE
*/
