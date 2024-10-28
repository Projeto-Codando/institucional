import './cardKpi.css'
import React, { useState } from 'react';
import IconAluno from '../../imgs/iconAluno.svg'
import IconCorreto from '../../imgs/iconCorrect.svg'
import IconErrado from '../../imgs/iconCancelled.svg'
import Expandir from '../../imgs/expandir.svg'
import IconFechar from '../../imgs/iconFechar.svg';

export default function CardKpi(props) {
    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    return (
        <div className="kpi">
            <img src={Expandir} alt="expandir" className='expandir' onClick={abrirModal} />
            <h2 className='questao'>Questao {props.questao}</h2>
            <div className='dados'>
                <div className='valores'>
                    <img src={IconAluno} alt="icon aluno" />
                    <span className='valorDado'>{props.totalAlunos}</span>
                </div>
                <div className='valores'>
                    <img src={IconCorreto} alt="icon correto" />
                    <span className='valorDado'>{props.porcentagemCorretas}</span>
                </div>
                <div className='valores'>
                    <img src={IconErrado} alt="icon errado" />
                    <span className='valorDado'>{props.porcentagemErradas}</span>
                </div>
            </div>

            {modalAberto && (
                <div className="modal">
                    <div className="modalContent">
                        <img src={IconFechar} alt="fechar" className="fecharModal" onClick={fecharModal} />
                        <div className='topBarCard'>
                            <span className='tituloTopCard'>QUIZ</span>
                        </div>
                        <div className='linhaDivisorCard'></div>
                        <div className='tituloQuizCard'><span>{props.textoPergunta}</span></div>
                        <div className='exemploCard'>
                            <span><pre>{`Aqui você pode adicionar mais detalhes da pergunta, respostas, etc.`}</pre></span>
                        </div>
                        <div className='quizRespostasCard'>
                            <div className="quiz-questionCard">
                                {props.respostas.map((resposta, index) => (
                                    <div key={index} className={`quiz-optionCard ${resposta.correta ? 'correct' : ''}`}>
                                        <div className="circleCard"></div>
                                        <span>{resposta.texto}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
