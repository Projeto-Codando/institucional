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
             conteudoAula={props.temas}
             />
            <div className='tituloTema'>
                {props.tituloTema}
                <div className='linhaFina'></div>
            </div>
            <div className='detalhes'>
                <div className='bolinhasTotais'>
                    {[...Array(props.qtdAulas)].map((_, index) => (
                        <Bolinhas
                            key={index}
                            numeroAula={index + 1}
                        />
                    ))}
                </div>
                <button className='verMais' onClick={openModal} >
                    Ver Mais
                </button>
                
            </div>
        </div>
    )
}