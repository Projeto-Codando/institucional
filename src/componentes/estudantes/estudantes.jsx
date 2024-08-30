import React, { useState, useEffect } from 'react';
import './estudantes.css';
import XzinCinza from '../../imgs/XzinhoCinza.svg';
import Lupazinha from '../../imgs/lupazinha.svg';
import Setinha from '../../imgs/setinhaEstudantes.svg';
import EstudantesInfo from '../estudantesInfo/estudantesInfo';
import ModalExcluirEstudante from '../modalEditarEstudante/modalExcluirEstudante';
import ModalEditarEstudante from '../modalEditarEstudante/modalEditarEstudante';
import api from '../../api';
import { saveAs } from 'file-saver';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

export default function Estudantes(props) {
    const [isExcluirModalOpen, setIsExcluirModalOpen] = useState(false);
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedAlunos, setSelectedAlunos] = useState([]);
    const [sortOption, setSortOption] = useState("1");
    const [loading, setLoading] = useState(false);
    const [idAlunoEditando, setIdAlunoEditando] = useState(0);
    const [filtroPesquisa, setFiltroPesquisa] = useState('');

    const idProfessor = sessionStorage.getItem('userId');
    const idTurma = sessionStorage.getItem('idTurmaClicada');
    const alunosTurma = props.listaEstudantes;
    const avatarGenerico = sessionStorage.getItem('defaultAvatar');

    const openExcluirModal = () => setIsExcluirModalOpen(true);
    const closeExcluirModal = () => setIsExcluirModalOpen(false);

    const openEditarModal = () => setIsEditarModalOpen(true);
    const closeEditarModal = () => setIsEditarModalOpen(false);

    const handleFilter = (filtro) => {
        setFiltroPesquisa(filtro);
        filtro = filtro.toLowerCase()

        let novaLista = props.listaEstudantes.filter(aluno => {
            return (aluno.nome.toLowerCase().includes(filtro)) || (aluno.sobrenome.toLowerCase().includes(filtro)) || (aluno.apelido.toLowerCase().includes(filtro));
        })

        novaLista = sortEstudantes(novaLista)

        setSortedEstudantes(novaLista)
    }

    const handleDownloadCSV = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/turmas/gerarCSV/${idProfessor}/${idTurma}`, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            });
            const blob = new Blob([response.data], { type: 'application/csv' });
            saveAs(blob, 'dadosTurma.csv');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleSelectAll = () => {
        const newAllSelected = !allSelected;
        setAllSelected(newAllSelected);
        if (newAllSelected) {
            setSelectedAlunos(alunosTurma.map(aluno => aluno.idAluno));
        } else {
            setSelectedAlunos([]);
        }
    };

    const handleSelectAluno = (id) => {
        let newSelectedAlunos = [];
        if (selectedAlunos.includes(id)) {
            newSelectedAlunos = selectedAlunos.filter(alunoId => alunoId !== id);
        } else {
            newSelectedAlunos = [...selectedAlunos, id];
        }
        setSelectedAlunos(newSelectedAlunos);
        setAllSelected(newSelectedAlunos.length === alunosTurma.length);
    };

    useEffect(() => {
        setAllSelected(alunosTurma.length === selectedAlunos.length);
    }, [selectedAlunos, alunosTurma]);

    const handleSortChange = (event) => {
        console.log('target: ' + event.target.value);
        setSortOption(event.target.value);
        handleFilter(filtroPesquisa)
        setSortedEstudantes(sortEstudantes(sortedEstudantes))
    };

    const sortEstudantes = (students) => {
        console.log('Studantds: ' + students)
        console.log('Sort: ' + sortOption)
        return students.sort((a, b) => {
            if (sortOption === "1") {
                return a.nome.localeCompare(b.nome);
            } else if (sortOption === "2") {
                return b.pontuacao - a.pontuacao;
            } else if (sortOption === "3") {
                return a.pontuacao - b.pontuacao;
            }
            return 0;
        });
    };

    const [sortedEstudantes, setSortedEstudantes] = useState(sortEstudantes(props.listaEstudantes));

    return (
        <div className="estudantes">
            {loading && <LoadingSpinner />}
            <div className='barraNavegacao'>
                <div className='navigationBar'>
                    <div className='selecionar'>
                        <input
                            className="checkboxEstudantes"
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                        />
                        <label>Selecionar todos</label>
                    </div>
                    <div className='botoesDireita'>
                        <div className='botoesDireita'>
                            <div className='botoesEstudantes' onClick={handleDownloadCSV}>
                                <div className='excluir'>
                                    <p>Download CSV</p>
                                </div>
                            </div>
                            <div className='botoesEstudantes'>
                                <div className='excluir' onClick={openExcluirModal}>
                                    <p>Excluir</p>
                                    <img src={XzinCinza} alt="" />
                                </div>
                            </div>
                            <div className='botoesEstudantes'>
                                <div className='pesquisarEstudante' style={{display: 'flex', gap: '5px'}}>
                                    <input type="text" value={filtroPesquisa} onChange={event => handleFilter(event.target.value)} />
                                    <img src={Lupazinha} alt="" />
                                </div>
                            </div>
                            <div className='botoesEstudantes'>
                                <div className='ordernarEstudantes'>
                                    <select
                                        name=""
                                        id="ordenacao-select"
                                        value={sortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option value="1">Ordem Alfabética</option>
                                        <option value="2">Mais Troféus</option>
                                        <option value="3">Menos Troféus</option>
                                        <img src={Setinha} alt="" />
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='estudantesInformacoes'>
                {sortedEstudantes.map((aluno) => (
                    <EstudantesInfo
                        key={aluno.idAluno}
                        nomeAluno={aluno.nome + ' ' + aluno.sobrenome}
                        apelido={'@' + aluno.apelido}
                        qtdPontos={aluno.pontuacao || 0}
                        AvatarAluno={aluno.avatar[0]?.imagemURL || avatarGenerico}
                        openEditarModal={() => setIdAlunoEditando(aluno.idAluno) || openEditarModal()}
                        isSelected={selectedAlunos.includes(aluno.idAluno)}
                        handleSelect={() => handleSelectAluno(aluno.idAluno)}
                    />
                ))}
            </div>
            <ModalExcluirEstudante
                isOpen={isExcluirModalOpen}
                onClose={closeExcluirModal}
                alunos={alunosTurma.filter(aluno => selectedAlunos.includes(aluno.idAluno))}

            />
            <ModalEditarEstudante
                isOpen={isEditarModalOpen}
                onClose={closeEditarModal}
                idAluno={idAlunoEditando}
                nomeAluno={props.edicaoNomeAluno}
                senhaAluno={props.edicaoSenhaAluno}
                onClick={props.onClick}
            />
        </div>
    );
}