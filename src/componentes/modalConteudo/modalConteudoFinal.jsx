import React from 'react';
import './modalConteudo.css';
import RetanguloVerdeInvertivo from '../../imgs/RetanguloVerdeInverso.png';
import RetanguloVerde from '../../imgs/RetanguloVerde.png';
import Botao from '../botao/botoes';
import BananaPoint from '../../imgs/estrela.png';
import api from '../../api';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

import { useNavigate } from 'react-router-dom';

function ModalConteudoFinal({ isOpen, onClose, onCorrect, ...props }) {
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
        height: 'min-content',
        width: 'min-content',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column',
        boxSizing: 'border-box',
    };
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = React.useState(false);

    const idAluno = sessionStorage.getItem('userId');
    const idAula = sessionStorage.getItem('nivel');

    const qtdPontosFinal = props.qtdPontos;

    console.log(qtdPontosFinal);

    const body = {
        pontos: qtdPontosFinal,
        moedas: qtdPontosFinal
    }
 
    const handleButtonClick = () => {
        setIsLoaded(true);
        api.put(`/progresso-aluno/aluno/${idAluno}/aula/${idAula}/pontos`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(response => {
            setIsLoaded(false);
            console.log(response.data);
            sessionStorage.setItem('moedas', response.data.aluno.moedas)
            window.location.reload();
        }
        ).catch(error => {
            setIsLoaded(false);
            console.error(error)
        })
        
        setTimeout(() => {
            onClose();
        }, 500);

        navigate("/lobby")
    };

    if (isOpen) {
        return (
            <div className="modalConteudo">
                {isLoaded && <LoadingSpinner />}
                <div style={BACKGROUND_STYLE} >
                    <div style={MODAL_STYLE} >
                        <div className='conteudoCard'>
                            <div className='retangulo'>
                                <img id="retanguloVerde" src={RetanguloVerdeInvertivo} alt='Retangulo Verde invertido' />
                            </div>
                            <div className='borda' style={{ padding: '15px' }}>

                                <div className='temaTitulo' style={{ marginTop: '15px', width: '450px' }}>
                                    <span id='tituloParabens' style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                                        Parabens, Explorador!
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '270px', textAlign: 'center' }}>
                                        Você foi corajoso e esperto.<br />
                                        Depois de completar todos os desafios, você é um verdadeiro mestre da floresta e da programação.
                                        Continue explorando e criando!
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px' }}>
                                    <span style={{ display: 'flex', justifyContent: 'center', width: '270px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                                        Banana Points conquistadas:
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', marginBottom: '30px' }}>
                                    <img src={BananaPoint} style={{ width: '30px' }} alt="close" />
                                    <span style={{ color: '#F3DE2C', fontSize: '30px', fontWeight: '900', marginLeft: '8px' }}>{qtdPontosFinal}</span>
                                </div>


                                <Botao
                                    texto='Finalizar aula'
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

export default ModalConteudoFinal;
