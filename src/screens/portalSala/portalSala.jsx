import './portalSala.css'
import Header from '../../componentes/header/header'
import FaixaTurma from '../../componentes/faixaTurma/faixaTurma';


function portalSala() {
    return (
        <div >
            <Header className='container' />
            <div  className='portalSala'>
            <FaixaTurma
            text="6C-2024"
            escolaridade="6º ano"
            codigo="31204"
            />
            <div className='telaPrincipal'>
                
            </div>
            </div>
        </div>
       
    )
}
  
export default portalSala;