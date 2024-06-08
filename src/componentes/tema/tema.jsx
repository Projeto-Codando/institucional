import './tema.css'
import Bolinhas from '../bolinhas/bolinhas'
import React, { useState } from 'react';
import ModalConteudo from '../modalConteudo/modalConteudo';
export default function Tema(props) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='temaDescricao'>
            <ModalConteudo
             isOpen={isModalOpen}
             onClose={closeModal}
             temaTitulo={props.tituloTema}
             />
            <div className='tituloTema'>
                {props.tituloTema}
                <div className='linhaFina'></div>
            </div>
            <div className='detalhes'>
                <div className='bolinhasTotais'>
                    <Bolinhas
                    numeroAula='1'/>
                    <Bolinhas
                    numeroAula='2'/>
                    <Bolinhas
                    numeroAula='3'/>
                    <Bolinhas
                    numeroAula='4'/>

                </div>
                <button className='verMais' onClick={openModal} >
                    Ver Mais
                </button>
                
            </div>
        </div>

    )
}