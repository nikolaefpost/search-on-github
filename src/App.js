import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import React, {useState} from "react";
import Greetings from "./page/Greetings";


function App() {
    const [greetings, setGreetings] = useState(true)
  return (
      <BrowserRouter className='bg-info'>

        <AppRouter/>
          <Greetings show={greetings} onHide={()=>setGreetings(false)} />

      </BrowserRouter>
  );
}

export default App;
