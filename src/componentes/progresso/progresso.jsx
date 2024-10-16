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
        setLoading(true);
        api.get(`/perguntas/erros`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            setLoading(false);
            console.log(response)
            
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
                        <CardKpi/>
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
