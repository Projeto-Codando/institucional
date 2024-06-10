import React from 'react';
import './modalEstudante.css';
import Xzinho from '../../imgs/xModal.svg';
import InputsModal from '../inputsModal/inputsModal';
import Botao from '../botaoModal/botaoModal';
import SelectBox from '../inputsModal/selectBoxModal';

function ModalEditarEstudante({ isOpen, onClose, escolaridade, setEscolaridade, ...props }) {
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
        alignItems: 'center',
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '500px',
        width: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box',
    };

    if (isOpen) {
        return (
            <div className="modalExcluirEstudante">
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end', paddingBottom: '10px' }}>
                            <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close" />
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Excluir aluno
                        </span>
                        <div className='conteudoPrincipal'>
                            <div style={{ marginTop: '50px', width: '90%', display: 'flex', justifyContent: 'center', textAlign: 'justify' }} className='textoExcluir'>
                                <span>Ao excluir um aluno, lembre-se: essa ação é <span style={{ fontWeight: 'bolder' }}>permanente. </span>
                                    O aluno perderá o acesso aos conteúdos da turma.</span>
                            </div>
                            <div className='detalhesEstudantes'>
                                <div className='detalhesTitulos'>
                                    <div className='itensHorizontais'>
                                        <span style={{ width: '200px' }}>Aluno</span>
                                        <div className='linhaRoxaVertical'></div>
                                        <span>Apelido</span>
                                    </div>
                                    <div className='linhaRoxaHorizontal'></div>
                                </div>
                                <div className='listaEstudantes'>
                                    <div className='alunoInfo'>  
                                        <span>{props.nomeAluno}</span>
                                        <span>{props.apelido}</span>
                                        </div>
                                       
                                </div>
                                

                            </div>

                            <Botao
                                text="Excluir aluno"
                                id="excluirEstudante"
                                onClick={props.onClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalEditarEstudante;
