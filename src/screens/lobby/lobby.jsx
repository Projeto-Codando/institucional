import './lobby.css';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/verde-logo.svg";
import MetadeFloresta from "../../imgs/background-floresta-cortado.png";
import Estrela from '../../imgs/estrela.png';
import Start from '../../imgs/start.png';
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function Lobby() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [avatar, setAvatar] = useState();
    const [nivelSelecionado, setNivelSelecionado] = useState(1);
    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [turma, setTurma] = useState({});

    useEffect(() => {
        api.get(`/turmas/buscar-turma-por-id/${sessionStorage.getItem("idTurma")}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            console.log(json.data)
            setTurma(json.data.alunos);
        }).catch(() => {
            toast.error("Não foi possível encontrar a turma!");
        })

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
    }, [avatar]);

    const handleNivelClick = (nivel) => {
        setNivelSelecionado(nivel);
    };

    return (
        <div className='rotaNiveis'>
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
                                <button className='botaoBemVindo'> <img src={Start} alt="" />Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='containerRota'>
                    <div className='rota'>
                        <div className='cardNiveis1'>
                            <div
                                className={`nivel ${nivelSelecionado === 1 ? 'nivel-selecionado' : ''}`}
                                onClick={() => handleNivelClick(1)}
                            >
                                <span>1</span>
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
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => navigate("/jogo/1")}><img src={Start} alt="" />Iniciar</button></div>
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
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => navigate("/jogo/2")}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 3 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 03</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Variável</span></div>
                            <div className='subtituloAula'>
                                <span>Lorem ipsum dolor sit amet consec tetur. Nisi rhoncus diam magna ullamcorper Lorem ipsum dolor sit amet consectetur.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => navigate("/jogo/3")}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 4 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 04</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Laço de Repetição</span></div>
                            <div className='subtituloAula'>
                                <span>Lorem ipsum dolor sit amet consec tetur. Nisi rhoncus diam magna ullamcorper Lorem ipsum dolor sit amet consectetur.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => navigate("/jogo/1")}><img src={Start} alt="" />Iniciar</button></div>
                        </div>

                        <div className={`cardAula ${nivelSelecionado === 5 ? 'visible' : 'hidden'}`}>
                            <div className='materia'>
                                <span className='aula'>Aula 05</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Laço de Repetição</span></div>
                            <div className='subtituloAula'>
                                <span>Lorem ipsum dolor sit amet consec tetur. Nisi rhoncus diam magna ullamcorper Lorem ipsum dolor sit amet consectetur.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'><button onClick={() => navigate("/jogo/1")}><img src={Start} alt="" />Iniciar</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lobby;
