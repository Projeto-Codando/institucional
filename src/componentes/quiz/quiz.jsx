import React, { useState } from 'react'; // Removido o useEffect que não está sendo utilizado
import './quiz.css';
import ModalConteudoQuiz from '../modalConteudo/modalConteudoQuiz';
import ModalConteudoFinal from '../modalConteudo/modalConteudoFinal';
import api from '../../api';

export default function Quiz(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenFinal, setIsModalOpenFinal] = useState(false);
    const [contador, setContador] = useState(0);

    // IDs da resposta e do aluno, conforme necessário
    const idAluno = sessionStorage.getItem("userId");

    // Função que faz a requisição PUT para incrementar o contador
    const incrementarContador = (idResposta) => {
        setContador(prevContador => prevContador + 1); // Incrementa o contador local

        api.put(`/respostas/${idResposta}/${idAluno}`, {
           
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((json) => {
            console.log("Resposta atualizada com sucesso:", json);
        }).catch((error) => {
            console.error("Erro ao atualizar a resposta:", error);
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeModalFinal = () => {
        setIsModalOpenFinal(false);
    };

    const handleOptionClick = (correct, index) => {
        setSelectedOption(index);
        setIsCorrect(correct);

        // Calcular o idResposta baseado na questão e na resposta escolhida
        const idResposta = (props.numeroQuestao - 1) * 4 + index + 1;

       
            incrementarContador(idResposta);
        

        // Lógica de abertura dos modais
        if (correct && props.onCorrect && !props.onFinal) {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 500); 
        } else if (correct && props.onCorrect && props.onFinal) {
            setTimeout(() => {
                setIsModalOpenFinal(true);
            }, 500);
        }
    };

    return (
        <div className='quiz'>
            <div className='topBarQuiz'>
                <span onClick={props.onBack} style={{ cursor: 'pointer' }}>&lt; VOLTAR</span>
                <span className='tituloTopBar' >QUIZ</span>
                <span><span style={{ color: "#c79505" }}>{props.numeroQuestao}</span> DE {props.qtdQuestao}</span>
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
