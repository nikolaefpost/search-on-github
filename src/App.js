import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";


function App() {

  return (
      <BrowserRouter className='bg-info'>

        <AppRouter/>

      </BrowserRouter>
  );
}

export default App;
