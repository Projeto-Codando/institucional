import './progresso.css'
import AlertaSala from '../alertaSala/alertaSala'
import DetalhesAula from '../detalhesAula/detalhesAula'
import Mensagem from '../mensagemProfessor/mensagemProfessor'
import { useEffect, useState } from 'react'
import api from '../../api'
import LoadingSpinner from '../loadingSpinner/loadingSpinner'
import Input from '../inputsLogins/inputsLogins'
import BotaoEnviar from '../botaoEnviar/botaoEnviar'
import SetaE from '../../imgs/setaEsquerda.png'
import SetaD from '../../imgs/setaDireira.png'
import React, { useRef } from 'react';
import { toast } from 'react-toastify'
import { array } from 'yup'


export default function Progresso(props) {
    const idTurma = sessionStorage.getItem('idTurmaClicada');
    const [isLoading, setLoading] = useState(false);
    const [progressos, setProgressos] = useState([]);
    const [alertasGerados, setAlertasGerados] = useState([]);
    const [turmaBuscada] = useState(sessionStorage.getItem('idTurmaClicada'));
    const [groupedProgressos, setGroupedProgressos] = useState({});
    const [estudantes, setEstudantes] = useState([])
    const [mensagem, setMensagem] = useState("")
    const [mensagens, setMensagens] = useState([])



    const scrollRef = useRef(null);

    const scrollLeft = () => {
        console.log('Scroll Left');
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        console.log('Scroll Right');
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setLoading(true);
        api.get(`/progresso-aluno/turma/${idTurma}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            setLoading(false);
            setProgressos(response.data);
        }).catch(error => {
            setLoading(false);
            console.error(error);
        });
    }, [idTurma]);

    useEffect(() => {
        api.get(`/turmas/buscar-turma-por-id/${turmaBuscada}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            setEstudantes(json.data.alunos);
        }).catch((error) => {
            console.log(error);
        });
    }, [turmaBuscada]);

    useEffect(() => {
        if (estudantes.length > 0 && progressos.length > 0) {
            const novoGroupedProgressos = progressos.reduce((acc, progresso) => {
                const aulaId = progresso.aula.idAula;
                if (!acc[aulaId]) {
                    acc[aulaId] = {
                        aula: progresso.aula,
                        alunos: [],
                        totalPontuacao: 0
                    };
                }
                acc[aulaId].alunos.push(progresso);
                acc[aulaId].totalPontuacao += progresso.pontuacaoAluno;
                return acc;
            }, {});

            setGroupedProgressos(novoGroupedProgressos);

            const verificarProgressoAlunos = (estudantes, novoGroupedProgressos) => {
                const alertas = [];
                estudantes.forEach((aluno) => {
                    let encontrou = false;

                    Object.values(novoGroupedProgressos).forEach((group) => {
                        group.alunos.forEach((alunoProgresso) => {
                            if (aluno.apelido === alunoProgresso.aluno.apelido) {
                                encontrou = true;
                            }
                        });
                        if (!encontrou) {
                            alertas.push({
                                nomeAluno: aluno.nome,
                                descricao: `Não concluiu a aula ${group.aula.nome} (Condicional)`
                            });
                        }
                    });
                });

                return alertas;
            };

            const novosAlertas = verificarProgressoAlunos(estudantes, novoGroupedProgressos);
            setAlertasGerados(novosAlertas);
        }
    }, [estudantes, progressos]);
    
    useEffect(() => {
        getNovasMensagens()
    },[])


    const getNovasMensagens = async () => {
        api.get(`/mensagens/turma/${idTurma}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response.data);
            if(response.data.length == Array) {
            setMensagens(response.data);}
        }).catch(error => {
            console.error(error)
        })
    }


    const handleSave = async (event) => {
        event.preventDefault();
        api.post('/mensagens', {
            idTurma,
            texto: mensagem
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            // setIsLoading(false);
            console.log("Mensagem Cadastrada: "  + response.data);
            toast.success("Mensagem cadastrada com sucesso!");
            getNovasMensagens();
        }).catch((error) => {
            // setIsLoading(false);
            toast.error("Não foi possível cadastrar sua mensagem " + error.response.data.message);
            console.error(error);
        });
        
    }

    function formatarHorario(dataEnvio) {
        if (!dataEnvio) return '';
    
        const horas = parseInt(dataEnvio.slice(11, 13), 10);
        const minutos = dataEnvio.slice(14, 16);
    
        const periodo = horas >= 12 ? 'PM' : 'AM';
        const horas12 = horas % 12 || 12;
    
        return `${horas12}:${minutos} ${periodo}`;
    }
    
    {mensagens.map((mensagemNova, index) => (
        <Mensagem
            key={index}
            text={mensagemNova.mensagem}
            horario={formatarHorario(mensagemNova.dataEnvio)}
        />
    ))}

    return (
        <div className='progresso'>
            {isLoading && <LoadingSpinner />}
            <div className='lado-esquerdo-tela'>
                <div className='aulas'>
                    <div className='nomesLabels'>
                        <p id='pImportante'>Aula</p>
                        <div className='barraVertical'></div>
                        <p id='pImportante'>Tema</p>
                        <div className='barraVertical'></div>
                        <p>Qtd. Conclusão</p>
                        <div className='barraVertical'></div>
                        <p>Pont. Média</p>
                    </div>
                    <div className='barraHorizontal'></div>
                    {Object.values(groupedProgressos).map((group, index) => {
                        const alunosConclusao = group.alunos.filter(aluno => aluno.statusAula === 'Em andamento').length;
                        const pontuacaoMedia = group.alunos.length > 0 ? (group.aula.pontuacaoMaxima / estudantes.length).toFixed(2) : 'N/A';
                        return (
                            <DetalhesAula
                                key={group.aula.idAula || index}
                                aula={group.aula.nome || 'Nome não disponível'}
                                tema={'Condicional'}
                                alunosConclusao={alunosConclusao}
                                alunosTotal={estudantes.length}
                                pontuacaoMedia={pontuacaoMedia}
                            />
                        )
                    })}
                    <div className='barraHorizontal'></div>
                </div>
                <div className='containerKpis'>
                    <div className='tituloKpi'>
                        <h2>Questoes mais erradas</h2>
                        <div className='setaRolagem'>
                            <img src={SetaE} alt="seta rolagem esquerda" onClick={scrollLeft} />
                            <img src={SetaD} alt="seta rolagem direita" onClick={scrollRight} />
                        </div>
                    </div>
                    <div className='cardsKpi' ref={scrollRef}>
                        <div className="kpi"></div>
                        <div className="kpi" ></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                        <div className="kpi"></div>
                    </div>

                </div>
            </div>

            <div className='lado-direito-tela'>
                <div className='alertas'>
                    <h1>A L E R T A S</h1>
                    {alertasGerados.map((alerta, index) => (
                        <AlertaSala
                            key={index}
                            urgente={true}
                            nomeAluno={alerta.nomeAluno}
                            descricao={alerta.descricao}
                        />
                    ))}
                </div>
                <div className='mural'>
                    <div className='titulo-mural'>
                        <h1>M U R A L</h1>
                    </div>
                    <div className='mensagens'>
                        {mensagens.map((mensagemNova, index) => (
                            <Mensagem
                                text={mensagemNova.mensagem}
                                horario={formatarHorario(mensagemNova.dataEnvio)}
                            />
                        ))}
                    </div>

                    <div className='botoes'>
                        <Input
                            id='mensagem'
                            width='350px'
                            setMensagem={setMensagem}
                            onChange={typeof setMensagem === 'function' ? setMensagem : undefined}

                        />
                        <BotaoEnviar
                            onClick={handleSave}
                        />

                    </div>

                </div>
            </div>

        </div>
    )
}
