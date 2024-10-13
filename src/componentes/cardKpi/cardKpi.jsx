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
            <h3 className='temaAula'>Constantes</h3>
            <img src={Expandir} alt="expandir" className='expandir' onClick={abrirModal} />
            <h2 className='questao'>Questao 0</h2>
            <div className='dados'>
                <div className='valores'>
                    <img src={IconAluno} alt="icon aluno" />
                    <span className='valorDado'>20</span>
                </div>
                <div className='valores'>
                    <img src={IconCorreto} alt="icon correto" />
                    <span className='valorDado'>40%</span>
                </div>
                <div className='valores'>
                    <img src={IconErrado} alt="icon errado" />
                    <span className='valorDado'>60%</span>
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
                        <div className='tituloQuizCard'><span>Quantos passos o macaco tem que andar para pegar a banana ?</span></div>
                        <div className='exemploCard'>
                            <span><pre>{`let bananas= 10; 
if (bananas == 5) { 
console.log("A quantidade de bananas é igual a 5!"); 
} else if (bananas < 5) { 
console.log("A quantidade de bananas é menor que 5!"); 
} else { 
console.log("A quantidade de bananas é diferente que 5!"); `}</pre></span>
                        </div>
                        <div className='quizRespostasCard'>
                            <div className="quiz-questionCard">

                                <div className="quiz-optionCard">
                                    <div className="circleCard"></div>
                                    <span>2</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}