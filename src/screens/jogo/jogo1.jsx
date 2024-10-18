import './jogo1.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png";
import Quiz from '../../componentes/quiz/quiz';
import TrianguloE from '../../imgs/triangulo-esquerda.png';
import TrianguloD from '../../imgs/triangulo-direita.png';
import CardNivelJogo from '../../componentes/cardNivelJogo/cardNivelJogo';
import IconControle from '../../imgs/iconControle.png';
import IconControleRoxo from '../../imgs/iconControleRoxo.png';
import IconControleBranco from '../../imgs/IconControleBranco.png';
import Img1Quiz from '../../imgs/Aula01-Questao01.gif'
import Img2Quiz from '../../imgs/Aula01-Questao02.gif'
import Img3Quiz from '../../imgs/Aula01-Questao03.gif'
import Img4Quiz from '../../imgs/Aula01-Questao04.gif'
import Img5Quiz from '../../imgs/Aula01-Questao05.gif'
import Img6Quiz from '../../imgs/Aula01-Questao06.gif'
import Img7Quiz from '../../imgs/Aula01-Questao07.gif'

function Jogo() {
    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [quizStack, setQuizStack] = useState([1]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [correctOptions, setCorrectOptions] = useState({});

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const [quizData, setQuizData] = useState([]);
    const [correctIndexes, setCorrectIndexes] = useState([]);

    useEffect(() => {
        const idAula = sessionStorage.getItem("nivel");

        if (idAula) {
            api.get(`/perguntas/aulas/${idAula}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
                .then((response) => {
                    const data = response.data;
                    setQuizData(data);

                    const indexes = data.map(quiz =>
                        quiz.respostas.findIndex(resposta => resposta.correta)
                    );
                    setCorrectIndexes(indexes); // Armazena os índices em um estado
                })
                .catch(() => {
                    toast.error("Não foi possível encontrar as perguntas");
                });
        }
    }, []);

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

        setSelectedOption(null);
        setIsCorrect(null);
    };

    const handlePreviousQuiz = () => {
        setQuizStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

        setSelectedOption(null);
        setIsCorrect(null);
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

    const quizImages = [Img1Quiz, Img2Quiz, Img3Quiz, Img4Quiz, Img5Quiz, Img6Quiz, Img7Quiz];


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
                    {quizData.length > 0 && currentQuiz <= quizData.length && (
                        <Quiz
                            key={currentQuiz}
                            numeroQuestao={quizData[currentQuiz - 1].idPergunta.toString()}
                            qtdQuestao={quizData.length.toString()}
                            tituloQuiz={quizData[currentQuiz - 1].texto}
                            opcao0={quizData[currentQuiz - 1].respostas[0].texto}
                            opcao1={quizData[currentQuiz - 1].respostas[1].texto}
                            opcao2={quizData[currentQuiz - 1].respostas[2].texto}
                            opcao3={quizData[currentQuiz - 1].respostas[3].texto}
                            indexCorreto={correctIndexes[currentQuiz - 1]} // Encontra o índice da resposta correta
                            statusExemploResposta='true'
                            exemploResposta={<pre>{quizData[currentQuiz - 1].respostas.find(r => r.correta).texto}</pre>}
                            correctOption={correctOptions[currentQuiz]}
                            onCorrect={() => handleNextQuiz(currentQuiz, correctOptions[currentQuiz])}
                            onBack={handlePreviousQuiz}
                            onFinal={currentQuiz === quizData.length}
                        />
                    )}
                    <div className='telaQuiz'>
                        {currentQuiz > 0 && currentQuiz <= quizImages.length && (
                            <img
                                src={quizImages[currentQuiz - 1]} // currentQuiz começa de 1, então subtrai 1 para acessar o array
                                className='imagemQuiz'
                                alt={`Imagem questão ${currentQuiz}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jogo;
