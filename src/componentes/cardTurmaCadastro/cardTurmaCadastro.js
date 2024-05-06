import './cardTurmaCadastro.css'
import CriarImg  from '../../imgs/prof_img.svg'
import Mais from '../../imgs/maiszinho.svg'
import ModalCriacao from '../modalCriacao/modalCriacao.js'
import { useState } from 'react'


function CardTurmaCadastro(props, isOpen){
    const [openModal, setOpenModal] = useState(false)

    const cardTurmaCadastroStyle = {
        backgroundColor: props.configCardTurmaCadastro.backgroundColor,
        padding: props.configCardTurmaCadastro.padding,
        width: props.configCardTurmaCadastro.width,
        color: props.configCardTurmaCadastro.color,
      };

    return (
        <div className='cardTurmaCadastro' style={cardTurmaCadastroStyle}>
            <div className="imagemCardTurmaCadastro" style={{borderRadius: '20px',}}>
                <img src={CriarImg}/>
            </div>
             <div className='textoCardTurmaCadastro' style={{fontWeight: 'Bold', fontSize: '42px'}}>
                {props.text}
             </div>
            <div className="adicionar">
                <img src={Mais}  onClick={() => setOpenModal(true)} style={{cursor:'pointer'}}  />
                <ModalCriacao isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>
            </div>
          </div>
          
          
    )
}

export default CardTurmaCadastro;