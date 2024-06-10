import './lobby.css';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/verde-logo.svg";
import MetadeFloresta from "../../imgs/background-floresta-cortado.png";
import Estrela from '../../imgs/estrela.png';
import Start from '../../imgs/start.png';
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../componentes/loadingSpinner/loadingSpinner';

function Lobby() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [avatar, setAvatar] = useState();
    const [nivelSelecionado, setNivelSelecionado] = useState(1);
    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [turma, setTurma] = useState({});

    const body = {
        fkAluno: sessionStorage.getItem("userId"),
        fkAula: nivelSelecionado
    };

    console.log(body);

    const handleCreateNewProgressGame = () => {
        setIsLoading(true);
        api.post(`/progresso-aluno`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            setIsLoading(false);
            console.log(response.data);
            toast.success("Quiz iniciado com sucesso!");
            navigate(`/jogo/${nivelSelecionado}`);
        }).catch((error) => {
            setIsLoading(false);
            toast.error("Não foi possível iniciar o quiz! " + error.response.data.message);
            console.error(error);
        });
    }

    useEffect(() => {
        api.get(`/turmas/buscar-turma-por-id/${sessionStorage.getItem("idTurma")}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            console.log(json.data);
            setTurma(json.data.alunos);
        }).catch(() => {
            toast.error("Não foi possível encontrar a turma!");
        });

        const nome = sessionStorage.getItem("apelidoUser");
        const avatar = sessionStorage.getItem("ImagemURL_AVATAR");

        setNomeUsuario(nome);
        setAvatar(avatar);

        const apelido = sessionStorage.getItem("apelidoUser");
        const email = sessionStorage.getItem("email");

        if (apelido) {
            setIsAlunoLoggedIn(true);
        }
        if (email) {
            setIsProfessorLoggedIn(true);
        }

        // Verificação de sessionStorage e aplicação de classe
        const fkAula = parseInt(sessionStorage.getItem("nivel"));
        if (fkAula) {
            setNivelSelecionado(fkAula + 1);
        }

    }, [avatar]);

    const handleNivelClick = (nivel) => {
        setNivelSelecionado(nivel);
    };

    return (
        <div className='rotaNiveis'>
            {isLoading && <LoadingSpinner />}
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
                listaAlunos={turma}
                onUpdateAvatar={(avatar) => setAvatar(avatar)}
                alunosAtivos="true"
            />
            <div className='sectionRotas'>
                <div className='containerBemVindo'>
                    <img className='background-bemVindo' src={MetadeFloresta} alt="Background Floresta" />
                    <div className='cardsBemVindo'>
                        <div className='bemVindo'>
                            <img src={avatar} alt="Imagem avatar" style={{borderRadius: "360px"}}/>
                            <span>Bem vindo(a), <br />
                            @{nomeUsuario}</span>
                        </div>
                        <div className='cardTema'>
                            <div className='tema'>
                                <span className='span1'>Tema atual:</span>
                                <span className='span2'>Condicional</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='containerRota'>
                    <div className='rota'>
                        <div className='cardNiveis1'>
                            <div
                                className={`nivel ${nivelSelecionado === 1 ? 'nivel-selecionado' : ''}`}
                                style={{ background: nivelSelecionado === 2 ? 'purple' : ''}}
                                onClick={() => handleNivelClick(1)}
                            >
                                <span style={{color: nivelSelecionado === 2 ? 'white' : null }}>1</span>
                            </div>
                            <div
                                className={`nivel ${nivelSelecionado === 2 ? 'nivel-selecionado' : ''}`}
                                onClick={() => handleNivelClick(2)}
                            >
                                <span>2</span>
                            </div>
                        </div>
                        <div className='containerNivel'>
                            <div className='cardNiveis2'>
                                <div
                                    className={`nivel ${nivelSelecionado === 3 ? 'nivel-selecionado' : ''}`}
                                    onClick={() => handleNivelClick(3)}
                                >
                                    <span>3</span>
                                </div>
                                <div
                                    className={`nivel ${nivelSelecionado === 4 ? 'nivel-selecionado' : ''}`}
                                    onClick={() => handleNivelClick(4)}
                                >
                                    <span>4</span>
                                </div>
                                <div
                                    className={`nivel ${nivelSelecionado === 5 ? 'nivel-selecionado' : ''}`}
                                    onClick={() => handleNivelClick(5)}
                                >
                                    <span>5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='containerAula'>
                        <div className={`cardAula ${nivelSelecionado === 1 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 01</span>
                                <span className='tituloMateria'>Condicional</span>
                            </div>
                            <div className='titulo'><span>If / Else</span></div>
                            <div className='subtituloAula'>
                                <span>Aula detalhada sobre a combinação das estruturas condicionais if e else, incluindo exemplos de uso em fluxos de controle.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 7</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => {
                                sessionStorage.setItem("nivel", nivelSelecionado);
                                handleCreateNewProgressGame()
                            }}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 2 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 02</span>
                                <span className='tituloMateria'>Condicional</span>
                            </div>
                            <div className='titulo'><span>Switch Case</span></div>
                            <div className='subtituloAula'>
                                <span>Aula explicativa sobre a estrutura condicional switch case, ideal para selecionar entre várias opções baseadas em uma única variável.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 6</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => {
                                sessionStorage.setItem("nivel", nivelSelecionado);
                                handleCreateNewProgressGame()
                            }}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 3 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 03</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Variável</span></div>
                            <div className='subtituloAula'>
                                <span>Uma variável é um espaço de memória identificado por um nome que armazena valores que podem ser alterados durante a execução do programa.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => {
                                sessionStorage.setItem("nivel", nivelSelecionado);
                                handleCreateNewProgressGame()
                            }}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 4 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 04</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Função</span></div>
                            <div className='subtituloAula'>
                                <span>Uma função é um bloco de código projetado para realizar uma tarefa específica e pode ser chamado quando necessário, facilitando a reutilização e organização do código.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => {
                                sessionStorage.setItem("nivel", nivelSelecionado);
                                handleCreateNewProgressGame()
                            }}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 5 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 05</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Array</span></div>
                            <div className='subtituloAula'>
                                <span>Um array é uma coleção de elementos, todos do mesmo tipo, armazenados em locais de memória contíguos, que podem ser acessados por um índice numérico.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => {
                                sessionStorage.setItem("nivel", nivelSelecionado);
                                handleCreateNewProgressGame()
                            }}><img src={Start} alt="" />Iniciar</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lobby;
