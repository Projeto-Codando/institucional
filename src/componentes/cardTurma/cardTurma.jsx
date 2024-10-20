import React, { useState } from 'react';
import './cardTurma.css';
import TurmaImg1 from '../../imgs/CardTurma1.png';
import SerieImg from '../../imgs/Serie.svg';
import QtdAlunosImg from '../../imgs/qtdAlunos.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ModalEdicao from '../modalCriacao/modalEdicao.js';
import api from '../../api';
import ModalEscolhaAvatar from '../modalEscolhaAvatar/modalEscolhaAvatar.jsx';

function CardTurma({ onClick, ...props }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [menuAberto, setMenuAberto] = useState(false);
    const [cardVisivel, setCardVisivel] = useState(true);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const arquivarCard = () => {
        api.post(`/turmas/desativar/${sessionStorage.getItem("userId")}/${props.idTurma}`, {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });

        setCardVisivel(false);
    };

    const cardTurmaStyle = {
        overflow: props.configCardTurma.overflow,
        backgroundColor: props.configCardTurma.backgroundColor,
        padding: props.configCardTurma.padding,
        width: props.configCardTurma.width,
        color: props.configCardTurma.color,
        position: 'relative',
        display: cardVisivel ? 'block' : 'none',
    };

    const menuStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '20%',
        left: '40%',
        transform: 'translateY(-100%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: '999',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '150px',
    };

    const handleCardClick = (event) => {
        if (event.target.closest('.reticencias') || event.target.closest('.menuOpcoes')) {
            return;
        }
        onClick(event);
    };

    return (
        <div className='cardTurma' style={cardTurmaStyle} idCard={props.idCard} onClick={handleCardClick}>
            <ModalEdicao
                edicaoNomeTurma={props.edicaoNomeTurma}
                edicaoSenhaTurma={props.edicaoSenhaTurma}
                value={props.value}
                isOpen={isModalOpen}
                onClose={closeModal}
                nomeTurma={props.turma}
                escolaridade={props.serie}
                senhaTurma={props.senhaTurma}
                setNomeTurma={props.setNomeTurma}
                setEscolaridade={props.setEscolaridade}
                setSenhaTurma={props.setSenhaTurma}
                onClick={props.onClick}
            />
            
            {props.statusMenuOpcoes && (
                <div className='reticencias' style={{ display: 'flex', justifyContent: 'end', paddingRight: '50px', paddingTop: '20px' }}>

                    <FontAwesomeIcon icon={faEllipsis} style={{ height: '30px', cursor: 'pointer' }} onClick={toggleMenu} />
                    {menuAberto && (
                        <div className='menuOpcoes' style={menuStyle}>
                            <div style={{ height: '30px', cursor: 'pointer' }}  className='opcaoMenu'>Editar</div>
                            <div style={{ padding: '0', height: '1px', width: '100%', backgroundColor: 'rgba(000, 000, 000, 0.5)' }} className='linha'></div>
                            <div style={{ height: '30px', cursor: 'pointer' }} className='opcaoMenu' onClick={arquivarCard}>Arquivar</div>
                        </div>
                    )}
                </div>
            )
            }

            <div className="imagemCardTurma" style={{ borderRadius: '20px' }}>
                <img src={TurmaImg1} alt='Turma' />
            </div>
            <div className='textoCardTurma' style={{ fontWeight: 'Bold', fontSize: '30px', display: 'flex', flexDirection: 'column' }}>
                {props.turma}
                <div className='serie' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <img src={SerieImg} alt='Série' />
                    {props.serie}
                </div>
                <div className='qtdAlunos' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <img src={QtdAlunosImg} alt='Quantidade de Alunos' />
                    {props.qtdAlunos}
                </div>
            </div>
        </div>
    );
}

export default CardTurma;
