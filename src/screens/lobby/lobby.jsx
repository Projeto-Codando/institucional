import './lobby.css';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/verde-logo.svg";
import MetadeFloresta from "../../imgs/background-floresta-cortado.png";
import { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import CardAula from '../../componentes/cardAula/cardAula';

function Lobby() {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [avatar, setAvatar] = useState();
    const [aulas, setAulas] = useState([]);
    const [nivelSelecionado, setNivelSelecionado] = useState(1);
    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [turma, setTurma] = useState({});
    const [aulaSelecionada, setAulaSelecionada] = useState([]);
    const [tema, setTema] = useState([]);
    const [temaAtualIndex, setTemaAtualIndex] = useState(0); // Index para controlar o tema atual
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const idTurma = sessionStorage.getItem("idTurma");
        if (idTurma && !turma?.id) {
            api.get(`/turmas/buscar-turma-por-id/${idTurma}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((json) => {
                setTurma(json.data.alunos);
            }).catch(() => {
                toast.error("Não foi possível encontrar a turma!");
            });
        }
        
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

        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fkAula = parseInt(sessionStorage.getItem("nivel"));
        if (fkAula && fkAula + 1 !== nivelSelecionado) {
            setNivelSelecionado(fkAula + 1);
        }
    }, [nivelSelecionado]);

    useEffect(() => {
        if (isMounted && tema.length === 0) {
            api.get(`/temas`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then((json) => {
                const temaData = json.data;
                if (temaData.length > 0) {
                    setTema(temaData);
                    setAulas(temaData[temaAtualIndex].aulas);
                } else {
                    toast.error("Nenhuma aula encontrada!");
                }
            }).catch(() => {
                toast.error("Não foi possível encontrar as aulas!");
            });
        }
    }, [isMounted, tema, temaAtualIndex]);

    useEffect(() => {
        let totalAulasAnteriores = 0;
        for (let i = 0; i < temaAtualIndex; i++) {
            totalAulasAnteriores += tema[i].aulas.length;
        }

        const nivelGlobal = nivelSelecionado + totalAulasAnteriores;

        let aulaEncontrada = null;
        for (let i = 0; i < tema.length; i++) {
            const temaAtual = tema[i];
            if (nivelGlobal <= totalAulasAnteriores + temaAtual.aulas.length) {
                const indexAula = nivelGlobal - totalAulasAnteriores - 1;
                aulaEncontrada = temaAtual.aulas[indexAula];
                setTemaAtualIndex(i);
                setAulaSelecionada(aulaEncontrada);
                break;
            }
            totalAulasAnteriores += temaAtual.aulas.length;
        }
    }, [nivelSelecionado, tema, temaAtualIndex]);

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
                alunosAtivos="true"
            />
            <div className='sectionRotas'>
                <div className='containerBemVindo'>
                    <img className='background-bemVindo' src={MetadeFloresta} alt="Background Floresta" />
                    <div className='cardsBemVindo'>
                        <div className='bemVindo'>
                            <img src={avatar} alt="Imagem avatar" style={{ borderRadius: "360px" }} />
                            <span>Bem vindo(a), <br />
                                @{nomeUsuario}</span>
                        </div>
                        <div className='cardTema'>
                            <div className='tema'>
                                <span className='span1'>Tema atual:</span>
                                <span className='span2'>{tema[temaAtualIndex]?.nome}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='containerRota'>
                <div className='rota'>
                        <div className='cardNiveis1'>
                            <div
                                className={`nivel ${nivelSelecionado === 1 ? 'nivel-selecionado' : ''}`}
                                style={{ background: nivelSelecionado > 1 ? 'purple' : '' }}
                            >
                                <span style={{ color: nivelSelecionado > 1 ? 'white' : null }}>1</span>
                            </div>
                            <div
                                className={`nivel ${nivelSelecionado === 2 ? 'nivel-selecionado' : ''}`}
                                style={{ background: nivelSelecionado > 2 ? 'purple' : '' }}
                            >
                                <span style={{ color: nivelSelecionado > 2 ? 'white' : null }}>2</span>
                            </div>
                        </div>
                        <div className='containerNivel'>
                            <div className='cardNiveis2'>
                                <div
                                    className={`nivel ${nivelSelecionado === 3 ? 'nivel-selecionado' : ''}`}
                                    style={{ background: nivelSelecionado > 3 ? 'purple' : '' }}
                                >
                                    <span style={{ color: nivelSelecionado > 3 ? 'white' : null }}>3</span>
                                </div>
                                <div
                                    className={`nivel ${nivelSelecionado === 4 ? 'nivel-selecionado' : ''}`}
                                    style={{ background: nivelSelecionado > 4 ? 'purple' : '' }}
                                >
                                    <span style={{ color: nivelSelecionado > 4 ? 'white' : null }}>4</span>
                                </div>
                                <div
                                    className={`nivel ${nivelSelecionado === 5 ? 'nivel-selecionado' : ''}`}
                                    style={{ background: nivelSelecionado > 5 ? 'purple' : '' }}
                                >
                                    <span style={{ color: nivelSelecionado > 5 ? 'white' : null }}>5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='containerAula'>
                        {aulaSelecionada && tema.length > 0 ? (
                            <CardAula
                                titulo={aulaSelecionada.titulo}
                                descricao={aulaSelecionada.descricao}
                                tema={tema[temaAtualIndex].nome}
                                numeroAula={nivelSelecionado}
                                numEstrela='0'
                                numTotalEstrela={aulaSelecionada.pontuacaoMaxima}
                            />
                        ) : (
                            <p>Nenhuma aula encontrada.</p>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Lobby;