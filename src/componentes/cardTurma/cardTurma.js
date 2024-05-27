import React, { useState } from 'react';
import './cardTurma.css';
import TurmaImg1 from '../../imgs/CardTurma1.png';
import SerieImg from '../../imgs/Serie.svg';
import QtdAlunosImg from '../../imgs/qtdAlunos.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ModalCriacao from '../modalCriacao/modalCriacao';  // Atualize este import

function CardTurma({ turma, serie, qtdAlunos, setNomeTurma, setEscolaridade, setSenhaTurma, onClick, configCardTurma, index, setEditingTurmaIndex }) {
    const [openModal, setOpenModal] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);
    const [cardVisivel, setCardVisivel] = useState(true);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const arquivarCard = () => {
        setCardVisivel(false);
    };

    const cardTurmaStyle = {
        overflow: configCardTurma.overflow,
        backgroundColor: configCardTurma.backgroundColor,
        padding: configCardTurma.padding,
        width: configCardTurma.width,
        color: configCardTurma.color,
        position: 'relative',
        zIndex: '2',
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

    const handleEdit = () => {
        setNomeTurma(turma);
        setEscolaridade(serie.replace('ª Ano', ''));
        setSenhaTurma(''); // Supondo que você não exibe a senha; se necessário, adicione aqui
        setEditingTurmaIndex(index);
        setOpenModal(true);
    };

    return (
        <div className='cardTurma' style={cardTurmaStyle}>
            <ModalCriacao
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                setNomeTurma={setNomeTurma}
                setEscolaridade={setEscolaridade}
                setSenhaTurma={setSenhaTurma}
                onClick={onClick}
                modalTitle="Editar Turma"
                buttonText="Salvar"
            />
            <div className='reticencias' style={{ display: 'flex', justifyContent: 'end', paddingRight: '50px', paddingTop: '20px' }}>
                <FontAwesomeIcon icon={faEllipsis} style={{ height: '30px', cursor: 'pointer' }} onClick={toggleMenu} />
                {menuAberto && (
                    <div className='menuOpcoes' style={menuStyle}>
                        <div style={{ height: '30px', cursor: 'pointer' }} onClick={handleEdit} className='opcaoMenu'>Editar</div>
                        <div style={{ padding: '0', height: '1px', width: '100%', backgroundColor: 'rgba(000, 000, 000, 0.5)' }} className='linha'></div>
                        <div style={{ height: '30px', cursor: 'pointer' }} className='opcaoMenu' onClick={arquivarCard}>Arquivar</div>
                    </div>
                )}
            </div>
            <div className="imagemCardTurma" style={{ borderRadius: '20px' }}>
                <img src={TurmaImg1} alt='Turma' />
            </div>
            <div className='textoCardTurma' style={{ fontWeight: 'Bold', fontSize: '30px', display: 'flex', flexDirection: 'column' }}>
                {turma}
                <div className='serie' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <img src={SerieImg} alt='Série' />
                    {serie}
                </div>
                <div className='qtdAlunos' style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <img src={QtdAlunosImg} alt='Quantidade de Alunos' />
                    {qtdAlunos}
                </div>
            </div>
        </div>
    );
}

export default CardTurma;
