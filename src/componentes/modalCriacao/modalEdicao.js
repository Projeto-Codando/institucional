import React from 'react';
import './modalCriacao.css';
import Xzinho from '../../imgs/xModal.svg';
import InputsModal from '../inputsModal/inputsModal';
import Botao from '../botaoModal/botaoModal';
import SelectBox from '../inputsModal/selectBoxModal';

function ModalEdicao({ isOpen, onClose, escolaridade, setEscolaridade, ...props }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000',
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
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box',
    };

    

    if (isOpen) {
        return (
            
            <div className="modalCriacao">
                
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ display: 'flex', justifyContent: 'end', paddingBottom: '10px' }}>
                            <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close" />
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Editar turma
                        </span>
                        <InputsModal
                            text="Nome da Turma"
                            id="nomeTurma"
                            value={props.edicaoNomeTurma}
                            onChange={props.setNomeTurma}
                        />
                        <SelectBox
                            text="Escolaridade"
                            value={escolaridade}
                            onChange={(e) => setEscolaridade(e.target.value)}
                        />
                        <InputsModal
                            text="Senha Turma"
                            id="senhaTurma"
                            value={props.edicaoSenhaTurma}
                            onChange={props.setSenhaTurma}
                        />
                        <Botao
                            text="Editar turma"
                            id="editarTurma"
                            onClick={props.onClick}
                        />
                    </div>
                </div>       
            </div>  
        );
    }
    
    return null;
}

export default ModalEdicao;
