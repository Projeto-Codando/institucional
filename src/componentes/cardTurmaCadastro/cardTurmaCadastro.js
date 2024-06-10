import './cardTurmaCadastro.css';
import CriarImg from '../../imgs/prof_img.svg';
import Mais from '../../imgs/maiszinho.svg';
import ModalCriacao from '../modalCriacao/modalCriacao.js';
import React, { useState } from 'react';

function CardTurmaCadastro(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const cardTurmaCadastroStyle = {
      backgroundColor: props.configCardTurmaCadastro.backgroundColor,
      padding: props.configCardTurmaCadastro.padding,
      width: props.configCardTurmaCadastro.width,
      color: props.configCardTurmaCadastro.color
    };
  
    return (
      <div className="cardTurmaCadastro" style={cardTurmaCadastroStyle}>
        <div className="imagemCardTurmaCadastro" style={{ borderRadius: '20px' }}>
          <img src={CriarImg} alt="Criar" />
        </div>
        <div className="textoCardTurmaCadastro" style={{ fontWeight: 'Bold', fontSize: '42px' }}>
          {props.text}
        </div>
        <div className="adicionar">
          <img src={Mais} onClick={openModal} style={{ cursor: 'pointer' }} alt="Adicionar" />
          <ModalCriacao
            isOpen={isModalOpen}
            onClose={closeModal}
            setNomeTurma={props.setNomeTurma}
            setEscolaridade={props.setEscolaridade}
            setSenhaTurma={props.setSenhaTurma}
            onClick={props.onClick}
          />
        </div>
      </div>
    );
  }
  

export default CardTurmaCadastro;
