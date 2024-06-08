import React from 'react';
import './modalConteudo.css';
import Xzinho from '../../imgs/xModal.svg';
import RetanguloInvertivo from '../../imgs/retanguloInvertido.svg'
import Retangulo from '../../imgs/retangulo.svg'
import DescricaoAula from '../descricaoAula/descricaoAula';
import Botao from '../botaoConteudo/botaoConteudo'
import { useState } from 'react';

function ModalConteudo({ isOpen, onClose, escolaridade, setEscolaridade, ...props }) {
    const aula = props.conteudoAula;

    console.log('Aula')
    console.log(aula)

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
        boxSizing: 'border-box',
    };

    if (isOpen) {
        return (
            <div className="modalConteudo">
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div className='conteudoCard'>
                            <div className='retangulo'>
                                <img id="retangulo" src={RetanguloInvertivo} />
                            </div>
                            <div className='borda'>

                                <div style={{ display: 'flex', justifyContent: 'end', paddingBottom: '10px', width: '100%',  }}>
                                    <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close" />
                                </div>
                                <div className='temaTitulo'>
                                <span style={{ color: '#476334', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                                   {props.temaTitulo}
                                </span>
                                </div>
                                <div className='aulasDescricao'>
                                    {aula.map((aula, index) => (
                                        <DescricaoAula
                                            key={index}
                                            numeroAula={index + 1}
                                            nomeAula={aula.titulo}
                                            descricaoTexto={aula.descricao}
                                        />
                                    ))}
                                </div>
                            <Botao
                            text='Atribuir'
                            id='Atribuir'
                            onClick={props.onClick}
                            />    
                            </div>
                            <div className='retangulo'>
                                <img id="retangulo" src={Retangulo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalConteudo;
