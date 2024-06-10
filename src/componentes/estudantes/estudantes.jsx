import './estudantes.css';
import React, { useState, useEffect } from 'react';
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

const openExcluirModal = () => setIsExcluirModalOpen(true);
const closeExcluirModal = () => setIsExcluirModalOpen(false);

const openEditarModal = () => setIsEditarModalOpen(true);
const closeEditarModal = () => setIsEditarModalOpen(false);    
const idProfessor = sessionStorage.getItem('userId')
    const idTurma = sessionStorage.getItem('idTurmaClicada')
    const [loading, setLoading] = React.useState(false);

    // var listaDeProgresso = [];

    const handleDownloadCSV = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/turmas/gerarCSV/${idProfessor}/${idTurma}`, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
            })
            const blob = new Blob([response.data], { type: 'application/csv' })
            saveAs(blob, 'dadosTurma.csv');
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };

    const alunosTurma = props.listaEstudantes;
    const avatarGenerico = sessionStorage.getItem('defaultAvatar');

    const handleSelectAll = () => {
        const newAllSelected = !allSelected;
        setAllSelected(newAllSelected);
        setSelectedAlunos(newAllSelected ? alunosTurma.map(aluno => aluno.id) : []);
    };

    const handleSelectAluno = (id) => {
        if (selectedAlunos.includes(id)) {
            setSelectedAlunos(selectedAlunos.filter(alunoId => alunoId !== id));
        } else {
            setSelectedAlunos([...selectedAlunos, id]);
        }
    };

    // Sync the allSelected state with individual selections
    useEffect(() => {
        setAllSelected(alunosTurma.length === selectedAlunos.length);
    }, [selectedAlunos, alunosTurma]);


    // const handleFindTrofeus = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await api.get(`/progresso-aluno`, {
    //             headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
    //         })
    //         listaDeProgresso = (response.data)
    //         console.log(listaDeProgresso)
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)
    //         console.log(error)
    //     }
    // }



    return (
        <div className="estudantes">
            {loading && <LoadingSpinner />}
            <div className='barraNavegacao'>
            <div className='selecionar'>
                        <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                        <label>Selecionar todos</label>
                </div>
                <div className='botoesDireita'>
                    <div className='botoesEstudantes' onClick={handleDownloadCSV}>
                        <div className='excluir'>
                            <p>Download CSV</p>
                        </div>
                    </div>
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
                            <div className='pesquisarEstudante'>
                                <img src={Lupazinha} alt="" />
                            </div>
                        </div>
                        <div className='botoesEstudantes'>
                            <div className='ordernarEstudantes'>
                                <select name="" id="ordenacao-select" value={props.value} onChange={props.onChange}>
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
            <div className='estudantesInformacoes'>
                {alunosTurma.map((aluno) => (
                    <EstudantesInfo 
                        key={aluno.id}
                        nomeAluno={aluno.nome + ' ' + aluno.sobrenome}
                        apelido={'@' + aluno.apelido}
                        qtdPontos={aluno.pontuacao}
                        AvatarAluno={aluno.avatar[0]?.imagemURL || avatarGenerico}
                        openEditarModal={openEditarModal}
                        isSelected={selectedAlunos.includes(aluno.id)}
                        handleSelect={() => handleSelectAluno(aluno.id)}
                    />
                ))}
            </div>
            <ModalExcluirEstudante
                isOpen={isExcluirModalOpen}
                onClose={closeExcluirModal}
                nomeAluno='deixar dinamico'
                apelido='@dxDinamic'
                onClick={props.onClick}
            />
            <ModalEditarEstudante
                isOpen={isEditarModalOpen}
                onClose={closeEditarModal}
                escolaridade={props.escolaridade}
                setEscolaridade={props.setEscolaridade}
                edicaoNomeTurma={props.edicaoNomeTurma}
                setNomeTurma={props.setNomeTurma}
                edicaoSenhaTurma={props.edicaoSenhaTurma}
                setSenhaTurma={props.setSenhaTurma}
                onClick={props.onClick}
            />
        </div>
    );
}
