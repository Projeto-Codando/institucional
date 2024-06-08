import React from 'react';
import './modalConteudo.css';
import Xzinho from '../../imgs/xModal.svg';
import RetanguloVerdeInvertivo from '../../imgs/RetanguloVerdeInverso.png'
import RetanguloVerde from '../../imgs/RetanguloVerde.png'
import DescricaoAula from '../descricaoAula/descricaoAula';
import Botao from '../botao/botoes'
import BananaPoint from '../../imgs/estrela.png'
import Parabens from '../../imgs/img-parabens.png'


function ModalConteudo({ isOpen, onClose, onCorrect, ...props }) {
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
        height: 'max-content',
        width: '450px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column',
        boxSizing: 'border-box',
    };

    const handleButtonClick = () => {
        setTimeout(() => {
            if (onCorrect) {
                onCorrect();
            }
        }, 500); // Delay de 0,5 segundos
    };

    if (isOpen) {
        return (
            <div className="modalConteudo">
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div className='conteudoCard'>
                            <div className='retangulo'>
                                <img id="retanguloVerde" src={RetanguloVerdeInvertivo} />
                            </div>
                            <div className='borda'>

                                <div style={{ display: 'flex', justifyContent: 'start', paddingBottom: '10px', width: '100%', alignItems: 'center', padding: '15px 0px 0px 20px' }}>
                                    <img src={BananaPoint} style={{ width: '30px' }} alt="close" />
                                    <span style={{ color: '#F3DE2C', fontSize: '20px', fontWeight: '900', marginLeft: '8px' }}>2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <img src={Parabens} alt="imagem de parabens" />
                                </div>

                                <div className='temaTitulo' style={{ marginTop: '5px' }}>
                                    <span id='tituloParabens' style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                                        Parabens!
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '270px' }}>
                                        Para resolucionar a questão foi necessário o código abaixo:
                                    </span>
                                </div>

                                <div className='exemplo' style={{width: '80%', marginBottom: '20px'}}>
                                    {props.exemplo}
                                </div>

                                <Botao
                                    texto='Próxima atividade'
                                    backgroundColor="#7CB518"
                                    width="198.5px"
                                    fontSize='20px'
                                    padding="5px"
                                    marginBottom='10px'
                                    onClick= {handleButtonClick}
                                />
                            </div>
                            <div className='retangulo'>
                                <img id="retanguloVerde" src={RetanguloVerde} />
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
