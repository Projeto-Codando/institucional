import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
import SiteInstitucional from './screens/siteInstitucional/siteInstitucional';
import Login from './screens/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SiteInstitucional />} />
        <Route path='/login' element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
