import './modalCriacao.css'
import Xzinho from '../../imgs/xModal.svg'
import Inputs from '../inputsModal/inputsModal'
import Botao from '../botaoModal/botaoModal'
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group'
function modalCriacao({ isOpen }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000'
    }
    const MODAL_STYLE = {
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '500px',
        width: '450px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column'

    }
    if (isOpen) {
        return (
            <div className='modalCriacao'>
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ display: 'flex', justifyContent: 'end', padding: '15px', paddingBottom: '0px' }}>
                            <img src={Xzinho} onClick={''} style={{ width: '40px', cursor: 'pointer' }}></img>
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', textShadow: 'none', fontWeight: 'bold', marginTop: '0px' }}>Criar uma turma</span>
                            <Inputs
                                text='Nome da Turma'
                                id='nomeTurma'/>
                        
                            <Inputs
                                text='Escolaridade'
                                id='escolaridade'/>
                    
                            <Inputs
                            text='Quantidade de Alunos'
                            id='qtdAlunos'/>
                            <Botao
                            text='Criar turma'
                            id='criarTurma' />
                        
                    </div>
                </div>

            </div>)
    }
    return null
}

export default modalCriacao;