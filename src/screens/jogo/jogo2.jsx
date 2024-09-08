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
import Img1QUiz from '../../imgs/Aula02-Questao01.gif'
import Img2QUiz from '../../imgs/Aula02-Questao02.gif'
import Img3QUiz from '../../imgs/Aula02-Questao03.gif'
import Img4QUiz from '../../imgs/Aula02-Questao04.gif'
import Img5QUiz from '../../imgs/Aula02-Questao05.gif'
import Img6QUiz from '../../imgs/Aula02-Questao06.gif'

function Jogo2() {
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
            />
            <div className='sectionJogo'>
                <div className='niveisJogo'>
                    <img className='trianguloD' src={TrianguloD} alt="Triangulo direita" />
                    <div className='cardsNivel'>
                    <CardNivelJogo 
                        backgroundColor='#7CB518'
                        statusTitulo='true'
                        titulo='Aula 2'
                        />
                    {[1, 2, 3, 4, 5, 6].map((num) => (
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
                            qtdQuestao='6'
                            tituloQuiz='Na floresta, os macacos estão aprendendo a linguagem dos pássaros para se comunicarem melhor. Para entender os sons dos pássaros, eles precisam identificar se dois cantos são iguais. Qual símbolo eles usam para fazer essa comparação?'
                            opcao0='='
                            opcao1='-'
                            opcao2='=='
                            opcao3='*'
                            indexCorreto={2}
                            exemploResposta={
                                <pre>{`==`}</pre>
                            }
                            correctOption={correctOptions[1]}
                            onCorrect={() => handleNextQuiz(1, 2)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 2 && (
                        <Quiz
                            numeroQuestao='2'
                            qtdQuestao='6'
                            tituloQuiz='Os macacos estão classificando diferentes tipos de folhas que encontram na selva. Eles usam um código onde 1 representa folhas grandes, 2 representa folhas médias e 3 representa folhas pequenas. Como eles podem usar um switch case para imprimir o tipo de folha?'
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let tipoFolha = 2;  

switch (tipoFolha) {  

case 1: console.log("Folha grande"); break;  

case 2: console.log("Folha média"); break;  

case 3: console.log("Folha pequena"); break;  

default: console.log("Tipo de folha desconhecido"); }  `}</pre>
                            }
                            opcao0=' Folha grande '
                            opcao1=' Folha média  '
                            opcao2='Folha pequena '
                            opcao3='Tipo de folha desconhecido'
                            indexCorreto={1}
                            exemploResposta={
                                <pre>{`Folha média`}</pre>
                            }
                            correctOption={correctOptions[2]}
                            onCorrect={() => handleNextQuiz(2, 1)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 3 && (
                        <Quiz
                            numeroQuestao='3'
                            qtdQuestao='6'
                            tituloQuiz='Durante uma celebração na floresta, os macacos querem decidir que tipo de dança fazer. Eles têm uma variável tipoDanca onde a representa a dança do fogo, b representa a dança da chuva, e c representa a dança do sol. Qual switch case eles usariam?'
                            statusExemploQuiz="true"
                            exemplo={
                                <pre>{`let tipoDanca = 'c'; 

switch (tipoDanca) { 

case 'a': console.log("Dança do fogo"); break; 

case 'b': console.log("Dança da chuva"); break; 

case 'c': console.log("Dança do sol"); break; 

default: console.log("Tipo de dança desconhecido"); } `}</pre>
                            }
                            opcao0=' Dança do fogo'
                            opcao1=' Dança da chuva '
                            opcao2='Dança do sol '
                            opcao3='Tipo de dança desconhecido'
                            indexCorreto={2}
                            exemploResposta={
                                <pre>{`Dança do sol `}</pre>
                            }
                            correctOption={correctOptions[3]}
                            onCorrect={() => handleNextQuiz(3, 2)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 4 && (
                        <Quiz
                            numeroQuestao='4'
                            qtdQuestao='6'
                            tituloQuiz='Os macacos estão escolhendo frutas para um banquete. Eles têm uma variável fruta onde 1 representa bananas, 2 representa maçãs, e 3 representa mangas. Qual switch case eles usariam para imprimir a fruta escolhida?  '
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let luaCheia = true; 

if (___) { 

console.log("A lua está cheia!"); 

} `}</pre>
                            }
                            opcao0='Bananas'
                            opcao1='Maçãs'
                            opcao2='Mangas'
                            opcao3='Fruta desconhecida '
                            exemploResposta={
                                <pre>{`Fruta desconhecida `}</pre>
                            }
                            indexCorreto={3}
                            correctOption={correctOptions[4]}
                            onCorrect={() => handleNextQuiz(4, 3)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 5 && (
                        <Quiz
                            numeroQuestao='5'
                            qtdQuestao='6'
                            tituloQuiz='Os macacos estão decidindo a cor das flores para decorar suas casas. Eles têm uma variável corFlor onde red representa flores vermelhas, blue representa flores azuis, e yellow representa flores amarelas. Como usariam um switch case para decidir a cor? '
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let corFlor = 'yellow'; 

switch (corFlor) { 

case 'red': console.log("Flores vermelhas"); break; 

case 'blue': console.log("Flores azuis"); break; 

case 'yellow': console.log("Flores amarelas"); break; 

default: console.log("Cor de flor desconhecida"); } 

  `}</pre>
                            }
                            opcao0='temperatura < 30'
                            opcao1='temperatura >= 30'
                            opcao2='temperatura == 30'
                            opcao3='temperatura != 30'
                            indexCorreto={1}
                            exemploResposta={
                                <pre>{`temperatura >= 30`}</pre>
                            }
                            correctOption={correctOptions[5]}
                            onCorrect={() => handleNextQuiz(5, 1)}
                            onBack={handlePreviousQuiz}
                        />
                    )}
                    {currentQuiz === 6 && (
                        <Quiz
                            numeroQuestao='6'
                            qtdQuestao='6'
                            tituloQuiz='Em um jogo de esportes na selva, os macacos precisam decidir qual jogo jogar baseado no valor da variável jogo, onde 1 representa futebol, 2 representa basquete, e 3 representa vôlei. Qual switch case eles usariam? '
                            statusExemploQuiz='true'
                            exemplo={
                                <pre>{`let jogo = 3; 

switch (jogo) { 

case 1: console.log("Futebol"); break; 

case 2: console.log("Basquete"); break; 

case 3: console.log("Vôlei"); break; 

default: console.log("Jogo desconhecido"); } `}</pre>
                            }
                            opcao0='Futebol'
                            opcao1='Basquete'
                            opcao2='Vôlei'
                            opcao3='Jogo desconhecido'
                            indexCorreto={2}
                            exemploResposta={
                                <pre>{`Vôlei`}</pre>
                            }
                            correctOption={correctOptions[6]}
                            onCorrect={() => handleNextQuiz(6, 2)}
                            onBack={handlePreviousQuiz}
                            onFinal={true}
                        />
                    )}{currentQuiz === 1 && (
                        <div className='telaQuiz'>
                            <img src={Img1QUiz} className='imagemQuiz' alt="Imagem questão 1" />
                        </div>
                    )
                    }
                    {currentQuiz === 2 && (
                        <div className='telaQuiz'>
                            <img src={Img2QUiz} className='imagemQuiz' alt="Imagem questão 2" />
                        </div>
                    )
                    }
                    {currentQuiz === 3 && (
                        <div className='telaQuiz'>
                            <img src={Img3QUiz} className='imagemQuiz' alt="Imagem questão 3" />
                        </div>
                    )
                    }
                    {currentQuiz === 4 && (
                        <div className='telaQuiz'>
                            <img src={Img4QUiz} className='imagemQuiz' alt="Imagem questão 4" />
                        </div>
                    )
                    }
                    {currentQuiz === 5 && (
                        <div className='telaQuiz'>
                            <img src={Img5QUiz} className='imagemQuiz' alt="Imagem questão 5" />
                        </div>
                    )
                    }
                    {currentQuiz === 6 && (
                        <div className='telaQuiz'>
                            <img src={Img6QUiz} className='imagemQuiz' alt="Imagem questão 6" />
                        </div>
                    )
                    }
                   
                </div>
            </div>
        </div>
    );
}

export default Jogo2;
