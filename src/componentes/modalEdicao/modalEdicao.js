import './modalEdicao.css';
import Xzinho from '../../imgs/xModal.svg';
import Inputs from '../inputsModal/inputsModal';
import Botao from '../botaoModal/botaoModal';


function modalEdicao({ isOpen, onClose, ...props }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000'
    };
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
    };

    if (isOpen) {
        return (
            <div className='modalCriacao'>
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ display: 'flex', justifyContent: 'end', padding: '15px', paddingBottom: '0px' }}>
                            <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close"></img>
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', textShadow: 'none', fontWeight: 'bold', marginTop: '0px' }}>Editar uma turma</span>
                        <Inputs
                            text='Nome da Turma'
                            id='nomeTurma'
                            onChange={typeof props.setNomeTurma === 'function' ? props.setNomeTurma : undefined}
                        />
                        <Inputs
                            text='Escolaridade'
                            id='escolaridade'
                            onChange={typeof props.setEscolaridade === 'function' ? props.setEscolaridade : undefined}
                        />
                        <Inputs
                            text='Senha Turma'
                            id='senhaTurma'
                            onChange={typeof props.setSenhaTurma === 'function' ? props.setSenhaTurma : undefined}
                        />
                        <Botao
                            text='Editar turma'
                            id='editarTurma'
                            onClick={props.onClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default modalEdicao;
