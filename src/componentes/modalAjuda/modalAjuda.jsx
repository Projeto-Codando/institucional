import React from 'react';
import './modalAjuda.css';
import RetanguloVerdeInvertivo from '../../imgs/RetanguloVerdeInverso.png';
import RetanguloVerde from '../../imgs/RetanguloVerde.png';
import Botao from '../botao/botoes';
import BananaPoint from '../../imgs/estrela.png';
import BananaIcon from '../../imgs/bananaIcon.png';
import IconQuestion from '../../imgs/IconQuestion.png'
import api from '../../api';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

import { useNavigate } from 'react-router-dom';

function ModalAjuda({ isOpen, onClose }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.1)',
        zIndex: '1001',
    };
    const MODAL_STYLE = {
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: 'min-content',
        width: 'min-content',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column',
        boxSizing: 'border-box',
    };
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = React.useState(false);
   
    const handleButtonClick = () => {
        setIsLoaded(true);
        setTimeout(() => {
            onClose();
        }, 500);

        navigate("/lobby")
    };

    if (isOpen) {
        return (
            <div className="modalAjuda">
                {isLoaded && <LoadingSpinner />}
                <div style={BACKGROUND_STYLE} >
                    <div style={MODAL_STYLE} >
                        <div className='conteudoCard'>
                            <div className='retangulo'>
                                <img id="retanguloVerde" src={RetanguloVerdeInvertivo} alt='Retangulo Verde invertido' />
                            </div>
                            <div className='borda' style={{ padding: '15px' }}>

                                <div className='temaTitulo' style={{ marginTop: '15px', width: '450px' }}>
                                    <span id='tituloAjuda' style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
                                    Ajuda
                                    <img src={IconQuestion} alt="Ícone de Banana" style={{ width: '35px', height: '35px'}} />
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <img src={BananaIcon} alt="Ícone de Banana" style={{ width: '24px', height: '24px'}} />
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '300px', textAlign: 'left' }}>
                                        Ao longo do caminho pela floresta, há muitos desafios para descobrir.
                                        <br/>
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <img src={BananaIcon} alt="Ícone de Banana" style={{ width: '24px', height: '24px'}} />
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '300px', textAlign: 'left' }}>
                                        Cada ponto no mapa 

                                        <br />
                                        indica uma aula cheia de quizzes e atividades interativas para você aprender enquanto se diverte!
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <img src={BananaIcon} alt="Ícone de Banana" style={{ width: '24px', height: '24px'}} />
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '300px', textAlign: 'left' }}>
                                        Complete os quizzes para ganhar Banana Points e avançar na sua jornada!
                                        <br />
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <img src={BananaIcon} alt="Ícone de Banana" style={{ width: '24px', height: '24px'}} />
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '300px', textAlign: 'left' }}>
                                        Ganhe Banana Points e troque-os por avatares exclusivos para personalizar seu personagem e se destacar na sua jornada!
                                    </span>
                                </div>

                                <Botao
                                    texto='Entendi'
                                    backgroundColor="#7CB518"
                                    width="198.5px"
                                    fontSize='20px'
                                    padding="5px"
                                    marginBottom='10px'
                                    onClick={handleButtonClick}
                                />
                            </div>
                            <div className='retangulo'>
                                <img id="retanguloVerde" src={RetanguloVerde} alt='Retangulo Verde' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalAjuda;
