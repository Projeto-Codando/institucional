import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
<<<<<<< HEAD
import SiteInstitucional from './screens/siteInstitucional/siteInstitucional';
import Login from './screens/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


=======
import SiteInstitucional from './screens/siteInstitucional';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
>>>>>>> bbc460ff29e438d9fbff8f76ab4be6a37564381d

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<SiteInstitucional />} />
        <Route path='/login' element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  )
=======
        <Route path="/" element={<SiteInstitucional />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> bbc460ff29e438d9fbff8f76ab4be6a37564381d
}

export default App;
