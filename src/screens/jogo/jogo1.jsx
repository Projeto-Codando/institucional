import './jogo1.css';
import { useEffect, useState } from 'react';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png";
import Quiz from '../../componentes/quiz/quiz';
import TrianguloE from '../../imgs/triangulo-esquerda.png';
import TrianguloD from '../../imgs/triangulo-direita.png';
import CardNivelJogo from '../../componentes/cardNivelJogo/cardNivelJogo';
import IconStart from '../../imgs/iconStart.png';
import IconControle from '../../imgs/iconControle.png';
import IconControleRoxo from '../../imgs/iconControleRoxo.png';

function Jogo() {

    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(1);

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

    const handleNextQuiz = () => {
        setTimeout(() => {
            setCurrentQuiz(prev => prev + 1);
        }, 500)
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
                        <CardNivelJogo 
                        backgroundColor= '#662E9B'
                        statusImg='true'
                        imagem={IconStart}
                        />
                        <CardNivelJogo 
                        backgroundColor= '#F3DE2C'
                        statusImg='true'
                        imagem={IconControle}
                        />
                        <CardNivelJogo 
                        backgroundColor= '#D9D9D9'
                        statusImg='true'
                        imagem={IconControleRoxo}
                        />
                    </div>
                    <img className='trianguloE' src={TrianguloE} alt="Triangulo esquerda" />
                </div>
                <div className='containerJogo'>
                    {currentQuiz == 1 && (
                        <Quiz 
                            numeroQuestao='1'
                            qtdQuestao='7'
                            tituloQuiz='Em uma aventura na selva, um macaco curioso encontrou uma árvore mágica cheia de frutas diferentes. Para saber quais frutas ele ainda não experimentou, ele precisa comparar se as duas frutas são diferentes. Qual símbolo ele deve usar para fazer essa comparação?'
                            opcao1='=='
                            opcao2='!='
                            opcao3='!'
                            opcao4='?'
                            indexCorreto={1}
                            onCorrect={handleNextQuiz}
                        />
                    )}
                    {currentQuiz == 2 && (
                        <Quiz 
                            numeroQuestao='2'
                            qtdQuestao='7'
                            tituloQuiz='aaaaaaaaaaaaaaaaaaaaaaaaaa'
                            opcao1='=='
                            opcao2='!='
                            opcao3='!'
                            opcao4='?'
                            indexCorreto={1}
                            onCorrect={handleNextQuiz}
                        />
                    )}
                    <div className='telaQuiz'>
                        <div className='imagemQuiz'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jogo;
