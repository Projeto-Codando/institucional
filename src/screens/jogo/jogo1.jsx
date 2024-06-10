import './jogo1.css';
import { useEffect, useState } from 'react';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png";
import Quiz from '../../componentes/quiz/quiz';
import TrianguloE from '../../imgs/triangulo-esquerda.png';
import TrianguloD from '../../imgs/triangulo-direita.png';
import CardNivelJogo from '../../componentes/cardNivelJogo/cardNivelJogo';
import IconControle from '../../imgs/iconControle.png';
import IconControleRoxo from '../../imgs/iconControleRoxo.png';
import IconControleBranco from '../../imgs/IconControleBranco.png';

function Jogo() {
    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [quizStack, setQuizStack] = useState([1]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [correctOptions, setCorrectOptions] = useState({});

    useEffect(() => {
        const apelido = sessionStorage.getItem("apelidoUser");
        const email = sessionStorage.getItem("email");

        if (apelido) {
            setIsAlunoLoggedIn(true);
        }
        if (email) {
            setIsProfessorLoggedIn(true);
        }
    }, []);

    const handleNextQuiz = (quizNumber, correctOption) => {
        setQuizStack(prev => [...prev, prev[prev.length - 1] + 1]);
        setCompletedQuizzes(prev => [...prev, quizNumber]);
        setCorrectOptions(prev => ({ ...prev, [quizNumber]: correctOption }));
    };

    const handlePreviousQuiz = () => {
        setQuizStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    };

    const currentQuiz = quizStack[quizStack.length - 1];

    const getBackgroundColor = (quizNumber) => {
        if (currentQuiz === quizNumber) return '#F3DE2C';
        if (completedQuizzes.includes(quizNumber)) return '#662E9B';
        return '#D9D9D9';
    };

    const getIcon = (quizNumber) => {
        if (currentQuiz === quizNumber) return IconControle;
        if (completedQuizzes.includes(quizNumber)) return IconControleBranco;
        return IconControleRoxo;
    };

    return (
        <div className='jogo'>
            <Header
                logo={Logo}
                statusBotao1={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
                statusBotao2={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
                statusLogoff={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
                statusLogin={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
                statusLoginAluno={isAlunoLoggedIn ? "true" : null}
                statusLoginProfessor={isProfessorLoggedIn ? "true" : null}
                statusEstrela={isAlunoLoggedIn ? "true" : null}
                statusSerie={isAlunoLoggedIn ? "true" : null}
                statusAvatar={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
                alunosAtivos="true"
            />
            <div className='sectionJogo'>
                <div className='niveisJogo'>
                    <img className='trianguloD' src={TrianguloD} alt="Triangulo direita" />
                    <div className='cardsNivel'>
                        <CardNivelJogo
                            backgroundColor='#7CB518'
                            statusTitulo='true'
                            titulo='Aula 1'
                        />
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <CardNivelJogo
                                key={num}
                                backgroundColor={getBackgroundColor(num)}
                                statusImg='true'
                                imagem={getIcon(num)}
                            />
                        ))}
                    </div>
                    <img className='trianguloE' src={TrianguloE} alt="Triangulo esquerda" />
                </div>
                <div className='containerJogo'>
                    {currentQuiz === 1 && (
                        <Quiz
                            numeroQuestao='1'
                            qtdQuestao='7'
                            tituloQuiz='Em uma aventura na selva, um macaco curioso encontrou uma árvore mágica cheia de frutas diferentes. Para saber quais frutas ele ainda não experimentou, ele precisa comparar se as duas frutas são diferentes. Qual símbolo ele deve usar para fazer essa comparação?'
                            opcao0='=='
                            opcao1='!='
                            opcao2='!'
                            opcao3='?'
                            indexCorreto={1}
                            statusExemploResposta='true'
                            exemploResposta={
                                <pre>{`!=`}</pre>
                            }
                            correctOption={correctOptions[1]}
                            onCorrect={() => handleNextQuiz(1, 1)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 2 && (
                        <Quiz
                            numeroQuestao='2'
                            qtdQuestao='7'
                            tituloQuiz='Em uma aventura na floresta, um grupo de macacos encontra uma árvore carregada de bananas. Eles estão usando um código JavaScript para decidir o que fazer com as bananas: '
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let bananas= 10; 

if (bananas == 5) { 

console.log("A quantidade de bananas é igual a 5!"); 

} else if (bananas < 5) { 

console.log("A quantidade de bananas é menor que 5!"); 

} else { 

console.log("A quantidade de bananas é diferente que 5!"); `}</pre>
                            }
                            opcao0='A quantidade de bananas é menor que 5! '
                            opcao1='A quantidade de bananas é igual a 5! '
                            opcao2='A quantidade de bananas é diferente que 5'
                            opcao3='Nenhuma das anteriores'
                            indexCorreto={2}
                            statusExemploResposta='true'
                            exemploResposta={
                                <pre>{`A quantidade de bananas é diferente que 5`}</pre>
                            }
                            correctOption={correctOptions[2]}
                            onCorrect={() => handleNextQuiz(2, 2)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 3 && (
                        <Quiz
                            numeroQuestao='3'
                            qtdQuestao='7'
                            tituloQuiz='Você está ajudando um grupo de macacos programadores a desenvolver um sistema de acesso a uma caverna misteriosa na floresta. Para garantir a segurança, eles precisam verificar se a senha inserida pelo explorador tem pelo menos oito caracteres. Qual seria a melhor estrutura para realizar essa verificação? '

                            opcao0=' Iteração para contar caracteres '
                            opcao1='Verificação do comprimento da string '
                            opcao2=' Loop para verificar repetidamente '
                            opcao3='Avaliação da complexidade da senha'
                            indexCorreto={1}
                            statusExemploResposta='true'
                            statusCodNeces='true'
                            exemploResposta={
                                <pre>{`Verificação do comprimento da string`}</pre>
                            }
                            correctOption={correctOptions[3]}
                            onCorrect={() => handleNextQuiz(3, 1)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 4 && (
                        <Quiz
                            numeroQuestao='4'
                            qtdQuestao='7'
                            tituloQuiz='Em uma aventura noturna, os macacos precisam determinar se a lua está cheia para realizar um ritual especial. Eles têm um sensor que retorna o valor true se a lua estiver cheia e false caso contrário. Como os macacos podem usar uma estrutura de if para verificar se a lua está cheia e imprimir "A lua está cheia!"? '
                            statusExemploQuiz='true'
                            statusExemploResposta='true'
                            exemplo={
                                <pre>{`let luaCheia = true; 

if (___) { 

console.log("A lua está cheia!"); 

} `}</pre>
                            }
                            opcao0='luaCheia'
                            opcao1='luaCheia == false'
                            opcao2='luaCheia != true'
                            opcao3='luaCheia == false'
                            statusCodNeces='true'
                            exemploResposta={
                                <pre>{`luaCheia`}</pre>
                            }
                            correctOption={correctOptions[4]}
                            onCorrect={() => handleNextQuiz(4, 0)}
                            indexCorreto={0}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 5 && (
                        <Quiz
                            numeroQuestao='5'
                            qtdQuestao='7'
                            tituloQuiz='Os macacos querem verificar se a temperatura está acima de 30 graus para decidir se vão nadar no rio. Eles possuem uma variável chamada temperatura. Qual estrutura de if é adequada para essa verificação?'
                            statusExemploQuiz='true'
                            statusExemploResposta='true'
                            statusCodNeces='true'
                            exemplo={
                                <pre>{`let temperatura = 35; 

if (___) { 

console.log("Vamos nadar no rio!"); 

}  `}</pre>
                            }
                            opcao0='temperatura < 30'
                            opcao1='temperatura >= 30'
                            opcao2='temperatura <= 30'
                            opcao3='temperatura != 30'
                            indexCorreto={1}
                            exemploResposta={
                                <pre>{`temperatura >= 30`}</pre>}
                            correctOption={correctOptions[5]}
                            onCorrect={() => handleNextQuiz(5, 1)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 6 && (
                        <Quiz
                            numeroQuestao='6'
                            qtdQuestao='7'
                            tituloQuiz='Os macacos precisam verificar se a altura de uma árvore é maior que 15 metros para escolher a árvore certa para a competição. Eles possuem uma variável alturaArvore. Qual estrutura de if usariam?'
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let alturaArvore = 20; 

if (___) { 

console.log("Essa árvore é adequada para a competição!"); 

} `}</pre>
                            }
                            opcao0='alturaArvore <= 15'
                            opcao1='alturaArvore < 15'
                            opcao2='alturaArvore > 15'
                            opcao3='alturaArvore == 15'
                            indexCorreto={2}
                            statusExemploResposta='true'
                            statusCodNeces='true'
                            exemploResposta={
                                <pre>{`alturaArvore > 15`}</pre>
                            }
                            correctOption={correctOptions[6]}
                            onCorrect={() => handleNextQuiz(6, 2)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 7 && (
                        <Quiz
                            numeroQuestao='7'
                            qtdQuestao='7'
                            tituloQuiz='Um macaco curioso está testando diferentes tipos de frutas para ver quais são comestíveis. Ele tem uma variável frutaComestivel que retorna true se a fruta for comestível e false caso contrário. Como ele pode usar uma estrutura de if para verificar se a fruta é comestível e imprimir "A fruta é comestível!"?'
                            statusExemploQuiz='true'
                            statusExemploResposta='true'
                            exemplo={
                                <pre>{`let frutaComestivel = true; 

if (___) { 

console.log("A fruta é comestível!"); 

} `}</pre>
                            }
                            opcao0='frutaComestivel != true'
                            opcao1='frutaComestivel == false'
                            opcao2='frutaComestivel == true'
                            opcao3='frutaComestivel != false'
                            indexCorreto={2}
                            statusCodNeces='true'
                            exemploResposta={
                                <pre>{`frutaComestivel == true`}</pre>
                            }
                            correctOption={correctOptions[7]}
                            onCorrect={() => handleNextQuiz(7, 2)}
                            onBack={handlePreviousQuiz}
                            onFinal={true}
                        />
                    )}
                    {currentQuiz === 1 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 2 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 3 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 4 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 5 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 6 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                    {currentQuiz === 7 && (
                        <div className='telaQuiz'>
                            <div className='imagemQuiz'></div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Jogo;
