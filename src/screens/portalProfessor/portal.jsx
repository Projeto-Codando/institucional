import Header from '../../componentes/header/header'
import CardTurmaCadastro from '../../componentes/cardTurmaCadastro/cardTurmaCadastro'
import CardTurma from '../../componentes/cardTurma/cardTurma'
import Ajuda from '../../componentes/ajuda/ajuda'
import ModalCricao from '../../componentes/modalCriacao/modalCriacao'
import './portalProfessor.css'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'



function Portal(){


    return(
        <div className='portalProfessor' style={{overflow: 'hidden'}}>
            <div className='modalCriacao' style={{zIndex: '10'}}>
              </div>
              <Header className='container' />
           
              
              <div className='portal'>
                 <h1 style={{ color: "#fffff", fontSize: '32px'}}>Bem Vindo(a), Lisandra</h1>
                 <div className='CardTurmas'style={{ display: 'flex', flexDirection: 'row', gap: '50px'}}>
              <CardTurmaCadastro text="Criar turma"
            configCardTurmaCadastro={{
              backgroundColor: '#FFFFFF99',
              padding: '3px',
              width: '400px',
              color: '#476334'
            }} />
            <CardTurma turma="TURMA 6C-2023"
            serie={"6" + "ª Ano"}
            qtdAlunos= {"20" + " Alunos"}
            configCardTurma={{
              backgroundColor: '#FFFFFF99',
              padding: '3px',
              width: '400px',
              color: '#476334'
            }} />
            <CardTurma turma="TURMA XPT0"
            serie={"6" + "ª Ano"}
            qtdAlunos= {"20" + " Alunos"}
            configCardTurma={{
              backgroundColor: '#FFFFFF99',
              padding: '3px',
              width: '400px',
              color: '#476334'
            }} />
            </div>
              <Ajuda />

              </div>
        </div>
     
    )
  }
  
  export default Portal;
  