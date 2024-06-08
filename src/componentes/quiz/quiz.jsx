import React, { useState } from 'react';
import './quiz.css';

export default function Quiz(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (correct, index) => {
        setSelectedOption(index);
        setIsCorrect(correct);
    };

    return (
        <div className='quiz'>
            <div className='topBarQuiz'>
                <span>&lt; Voltar</span>
                <span className='tituloTopBar'>QUIZ</span>
                <span>2 de 7</span>
            </div>
            <div className='linhaDivisor'></div>
            <div className='tituloQuiz'> <span>Quantos passos o macaco tem que andar para pegar a banana ?</span>
            </div>
            <div className='exemplo'>
                <span>
                    {`for (int i = 1; i <= totalPassos; i++) {`}  <br/> 
                        {`System.out.println("O macaco deu " + i + " passos");`} <br/>
                    {`}`}
                </span>

            </div>
            <div className='quizRespostas'>
                <div className="quiz-question">

                    {['1', '2', '3', '4'].map((option, index) => {
                        const correct = index === 0;
                        
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
