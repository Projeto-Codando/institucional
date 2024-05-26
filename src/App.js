import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
import SiteInstitucional from './screens/siteInstitucional/siteInstitucional';
import Portal from './screens/portalProfessor/portal';
import Cadastro from './screens/cadastro/cadastro';
import Login from './screens/login/login';
import LoginProfessor from './screens/login/loginProfessor';
import PortalSala from './screens/portalSala/portalSala';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastroProfessor from './screens/cadastro/cadastroProfessor';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SiteInstitucional />} />
        <Route path='/login' element={ <Login/> }/>
        <Route path='/loginProfessor' element={ <LoginProfessor/> }/>
        <Route path='/portal' element={ <Portal />} />
        <Route path='/cadastro' element={ <Cadastro/> }/>
        <Route path='/cadastroProfessor' element={ <CadastroProfessor/> }/>
        <Route path='/portal/sala' element={ <PortalSala/> }/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
