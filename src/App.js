import './App.css';
import './componentes/botao/botoes';
import './componentes/header/header';
import SiteInstitucional from './screens/siteInstitucional';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteInstitucional />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
