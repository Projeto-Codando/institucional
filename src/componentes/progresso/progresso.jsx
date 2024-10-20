import './progresso.css'
import AlertaSala from '../alertaSala/alertaSala'
import DetalhesAula from '../detalhesAula/detalhesAula'
import Mensagem from '../mensagemProfessor/mensagemProfessor'
import { useEffect, useState } from 'react'
import api from '../../api'
import LoadingSpinner from '../loadingSpinner/loadingSpinner'
import SetaE from '../../imgs/setaEsquerda.svg'
import SetaD from '../../imgs/setaDireita.svg'
import React, { useRef } from 'react';
import CardKpi from '../cardKpi/cardKpi'

export default function Progresso(props) {
    const idTurma = sessionStorage.getItem('idTurmaClicada');
    const [isLoading, setLoading] = useState(false);
    const [progressos, setProgressos] = useState([]);
    const [alertasGerados, setAlertasGerados] = useState([]);
    const [turmaBuscada] = useState(sessionStorage.getItem('idTurmaClicada'));
    const [groupedProgressos, setGroupedProgressos] = useState({});
    const [estudantes, setEstudantes] = useState([])
    const [perguntas, setPerguntas] = useState([]);

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
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
        api.get(`/perguntas/erros`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            console.log(response.data)
            const perguntasComAlunos = response.data.map(pergunta => {
                // Conjunto para armazenar os IDs únicos dos alunos que responderam
                const alunosUnicos = new Set();

                // Iterar sobre todas as respostas da pergunta
                pergunta.respostas.forEach(resposta => {
                    // Adicionar os IDs dos alunos de cada resposta ao conjunto (Set evita duplicatas)
                    resposta.alunos.forEach(aluno => {
                        alunosUnicos.add(aluno.idAluno);
                    });
                });

                // Retorna a pergunta com a nova propriedade `totalAlunosUnicos`
                return {
                    ...pergunta,
                    totalAlunosUnicos: alunosUnicos.size // Conta os alunos únicos
                };
            });

            setPerguntas(perguntasComAlunos); // Armazena as perguntas com a quantidade de alunos únicos
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.error(error);
        });
    }, []);


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
                        <h2>Questões mais erradas</h2>
                        <div className='setaRolagem'>
                            <img src={SetaE} alt="seta rolagem esquerda" onClick={scrollLeft} />
                            <img src={SetaD} alt="seta rolagem direita" onClick={scrollRight} />
                        </div>
                    </div>
                    <div className='cardsKpi' ref={scrollRef}>
                        {perguntas.map((pergunta, index) => (
                            <CardKpi
                                key={index}
                                questao={pergunta.idPergunta}
                                contador={pergunta.contador}
                                porcentagemCorretas={pergunta.porcentagemRespostasCorretas}
                                porcentagemErradas={pergunta.porcentagemRespostasIncorretas}
                                totalAlunos={pergunta.totalAlunosUnicos}
                                textoPergunta={pergunta.texto}
                                respostas={pergunta.respostas}
                            />
                        ))}
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
                        <Mensagem
                            text='ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu ashbasbsybdasyu '
                            horario='12:33 PM'
                        />

                    </div>
                    <div className='botoes'>

                    </div>

                </div>
            </div>

        </div>
    )
}
