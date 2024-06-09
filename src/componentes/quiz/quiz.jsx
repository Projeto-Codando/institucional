import React, { useState } from 'react';
import './quiz.css';
import ModalConteudoQuiz from '../modalConteudo/modalConteudoQuiz';

export default function Quiz(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOptionClick = (correct, index) => {
        setSelectedOption(index);
        setIsCorrect(correct);
        if (correct && props.onCorrect) {
            setTimeout(() => {
                openModal();
            }, 500); // Delay de 0,5 segundos
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
                        statusExemploResposta={props.ExemploResposta}
                        onCorrect={props.onCorrect}
                        exemploResposta={props.exemploResposta}
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
