import './progresso.css'
import AlertaSala from '../alertaSala/alertaSala'
import DetalhesAula from '../detalhesAula/detalhesAula'
import { useEffect, useState } from 'react'
import api from '../../api'
import LoadingSpinner from '../loadingSpinner/loadingSpinner'

export default function Progresso(props) {

    const idTurma = sessionStorage.getItem('idTurmaClicada');
    const [isloading, setLoading] = useState(false);
    const [progressos, setProgressos] = useState([]); // Adicionei estado para progressos

    useEffect(() => {
        setLoading(true);
        api.get(`/progresso-aluno/turma/${idTurma}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            setLoading(false);
            const progressos = response.data;
            setProgressos(progressos); // Armazenar progressos no estado
            console.log(progressos);
        }).catch(error => {
            setLoading(false); // Certificar que o loading para em caso de erro
            console.error(error);
        });

    }, [idTurma]);

    // Agrupar progressos por aula
    const groupedProgressos = progressos.reduce((acc, progresso) => {
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
    const alertas = [];
    Object.values(groupedProgressos).forEach((group) => {
        group.alunos.forEach((alunoProgresso) => {
            if (alunoProgresso.statusAula !== 'Finalizada') {
                alertas.push({
                    nomeAluno: alunoProgresso.aluno.nome,
                    descricao: `Não concluiu a aula ${group.aula.nome} (Condicional)`
                });
            }
        });
    });

    return (
        <div className='progresso'>
            {isloading && <LoadingSpinner />}
            <div className='aulas'>
                <div className='nomesLabels'>
                    <p>Aula</p>
                    <div className='barraVertical'></div>
                    <p>Tema</p>
                    <div className='barraVertical'></div>
                    <p>Qtd. Conclusão</p>
                    <div className='barraVertical'></div>
                    <p>Pontuação Média</p>
                </div>
                <div className='barraHorizontal'></div>
                {Object.values(groupedProgressos).map((group, index) => {
                     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + group.totalPontuacao);
                    const alunosConclusao = group.alunos.filter(aluno => aluno.statusAula === 'Finalizada').length;
                    const pontuacaoMedia = group.alunos.length > 0 ? (group.totalPontuacao / group.alunos.length).toFixed(2) : 'N/A';

                    return (
                        <DetalhesAula
                            key={group.aula.idAula || index}
                            aula={group.aula.nome || 'Nome não disponível'}
                            tema={'Condicional'}
                            alunosConclusao={alunosConclusao}
                            alunosTotal={group.alunos.length}
                            pontuacaoMedia={pontuacaoMedia}
                        />
                    )
                })}
                <div className='barraHorizontal'></div>
            </div>
            <div className='alertas'>
                <h1>A L E R T A S</h1>
                {alertas.map((alerta, index) => (
                    <AlertaSala
                        key={index}
                        urgente={true}
                        nomeAluno={alerta.nomeAluno}
                        descricao={alerta.descricao}
                    />
                ))}
            </div>
        </div>
    )
}
