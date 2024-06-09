import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
import SiteInstitucional from './screens/siteInstitucional/siteInstitucional';
import Portal from './screens/portalProfessor/portal';
import Cadastro from './screens/cadastro/cadastro';
import Login from './screens/login/login';
import LoginProfessor from './screens/login/loginProfessor';
import PortalSala from './screens/portalSala/portalSala';
import CadastroProfessor from './screens/cadastro/cadastroProfessor';
import { ToastContainer } from 'react-toastify';
import Jogo1 from './screens/jogo/jogo1'
import Jogo2 from './screens/jogo/jogo2'
import Jogo3 from './screens/jogo/jogo3'
import Jogo4 from './screens/jogo/jogo4'
import Jogo5 from './screens/jogo/jogo5'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lobby from './screens/lobby/lobby';
import 'react-toastify/dist/ReactToastify.css';
import { AvatarProvider } from './componentes/avatarContext/avatarContext';

function App() {
  return (
    <AvatarProvider> {/* Wrap everything inside AvatarProvider */}
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<SiteInstitucional />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginProfessor' element={<LoginProfessor />} />
          <Route path='/portal' element={<Portal />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/cadastroProfessor' element={<CadastroProfessor />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/jogo/1' element={<Jogo1 />} />
          <Route path='/jogo/2' element={<Jogo2 />} />
          <Route path='/jogo/3' element={<Jogo3 />} />
          <Route path='/jogo/4' element={<Jogo4 />} />
          <Route path='/jogo/5' element={<Jogo5 />} />
          <Route path='/portal/sala' element={<PortalSala />} />
        </Routes>
      </BrowserRouter>
    </AvatarProvider>
  )
}

export default App;
