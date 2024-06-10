import React, { useState, useEffect } from 'react';
import './quiz.css';
import ModalConteudoQuiz from '../modalConteudo/modalConteudoQuiz';
import ModalConteudoFinal from '../modalConteudo/modalConteudoFinal';

export default function Quiz(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFinal, setIsModalOpenFinal] = useState(false);
    useEffect(() => {
        if (props.correctOption !== undefined) {
            setSelectedOption(props.correctOption);
            setIsCorrect(true);
        }
    }, [props.correctOption]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModalFinal = () => {
        setIsModalOpenFinal(true);
    };

    const closeModalFinal = () => {
        setIsModalOpenFinal(false);
    };

    const handleOptionClick = (correct, index) => {
        setSelectedOption(index);
        setIsCorrect(correct);
        if (correct && props.onCorrect && !props.onFinal) {
            setTimeout(() => {
                openModal();
            }, 500); 
        }else if(correct && props.onCorrect && props.onFinal){
            setTimeout(() => {
                openModalFinal();
            }, 500);
        }
    };

    return (
        <div className='quiz'>
            <div className='topBarQuiz'>
                <span onClick={props.onBack} style={{cursor: 'pointer'}}>&lt; VOLTAR</span>
                <span className='tituloTopBar' >QUIZ</span>
                <span>{props.numeroQuestao} DE {props.qtdQuestao}</span>
            </div>
            <div className='linhaDivisor'></div>
            <div className='tituloQuiz'><span>{props.tituloQuiz}</span></div>
            {props.statusExemploQuiz && (
                <div className='exemplo'>
                    <span>{props.exemplo}</span>
                </div>
            )}
            <div className='quizRespostas'>
                <div className="quiz-question">
                    <ModalConteudoQuiz
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        statusExemploResposta={props.statusExemploResposta}
                        onCorrect={props.onCorrect}
                        exemploResposta={props.exemploResposta}
                    />
                    <ModalConteudoFinal
                    isOpen={isModalOpenFinal}
                    onClose={closeModalFinal}
                    qtdPontos={props.qtdQuestao * 20}
                    />
                    {[props.opcao0, props.opcao1, props.opcao2, props.opcao3].map((option, index) => {
                        const correct = index === props.indexCorreto;
                        const isSelected = selectedOption === index;
                        const optionClass = isSelected ? (isCorrect ? 'correct' : 'incorrect') : '';

                        return (
                            <div
                                key={index}
                                className={`quiz-option ${optionClass}`}
                                onClick={() => handleOptionClick(correct, index)}
                                data-correct={correct}>
                                <div className="circle"></div>
                                <span>{option}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
