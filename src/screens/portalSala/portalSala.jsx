import './portalSala.css'
import Header from '../../componentes/header/header'
import FaixaTurma from '../../componentes/faixaTurma/faixaTurma';
import Progresso from '../../componentes/progresso/progresso';
import Conteudo from '../../componentes/conteudos/conteudos';


function portalSala() {
    return (
        <div >
            <Header className='container' />
            <div className='portalSala'>
                <FaixaTurma
                    text="6C-2024"
                    escolaridade="6º ano"
                    codigo="31204"
                />
                <div className='telaPrincipal'>
                    <Conteudo/>
                </div>
                
            </div>
        </div>

    )
}

export default portalSala;