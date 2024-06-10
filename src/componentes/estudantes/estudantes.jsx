import './estudantes.css';
import React, { useState } from 'react';
import XzinCinza from '../../imgs/XzinhoCinza.svg';
import Lupazinha from '../../imgs/lupazinha.svg';
import Setinha from '../../imgs/setinhaEstudantes.svg';
import EstudantesInfo from '../estudantesInfo/estudantesInfo';
import ModalExcluirEstudante from '../modalEstudante/modalExcluirEstudante'; 
import ModalEditarEstudante from '../modalEstudante/modalEditarEstudante';

export default function Estudantes(props) {
    const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);

    const openExcluirModal = () => setIsExcluirModalOpen(true);
    const closeExcluirModal = () => setIsExcluirModalOpen(false);

    const openEditarModal = () => setIsEditarModalOpen(true);
    const closeEditarModal = () => setIsEditarModalOpen(false);

    return (
        <div className="estudantes">
            <div className='barraNavegacao'>
                <div className='selecionar'>
                    <input type="checkbox" />
                    <label htmlFor="">Selecionar todos</label>
                </div>
                <div className='botoesDireita'>
                    <div className='botoesEstudantes'>
                        <div className='excluir' onClick={openExcluirModal}>
                            <p>Excluir</p>
                            <img src={XzinCinza} alt="" />
                        </div>
                    </div>
                    <div className='botoesEstudantes'>
                        <div className='pesquisarEstudante'>
                            <img src={Lupazinha} alt="" />
                        </div>
                    </div>
                    <div className='botoesEstudantes'>
                        <div className='ordernarEstudantes'>
                            <select name="" id="ordenacao-select" value={props.value} onChange={props.onChange}>
                                <option value="1">Ordem Alfabética</option>
                                <option value="2">Mais Troféus</option>
                                <option value="3">Menos Troféus</option>
                                <img src={Setinha} alt="" />
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='estudantesInformacoes'>
                <EstudantesInfo
                    nomeAluno='Guilherme Santos'
                    apelido='@guido'
                    qtdPontos='10'
                    openEditarModal={openEditarModal}
                />
            </div>
            <ModalExcluirEstudante
                isOpen={isExcluirModalOpen}
                onClose={closeExcluirModal}
                nomeAluno='deixar dinamico'
                apelido='@dxDinamic'
   
                onClick={props.onClick}
            />
            <ModalEditarEstudante
                isOpen={isEditarModalOpen}
                onClose={closeEditarModal}
                escolaridade={props.escolaridade}
                setEscolaridade={props.setEscolaridade}
                edicaoNomeTurma={props.edicaoNomeTurma}
                setNomeTurma={props.setNomeTurma}
                edicaoSenhaTurma={props.edicaoSenhaTurma}
                setSenhaTurma={props.setSenhaTurma}
                onClick={props.onClick}
            />
        </div>
    );
}
