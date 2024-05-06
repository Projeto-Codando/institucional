import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
import SiteInstitucional from './screens/siteInstitucional/siteInstitucional';
import Login from './screens/login/login';
import Portal from './screens/portalProfessor/portal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SiteInstitucional />} />
        <Route path='/login' element={ <Login/> }/>
        <Route path='/portal' element={ <Portal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
