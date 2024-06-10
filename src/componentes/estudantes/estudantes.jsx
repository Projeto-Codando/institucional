import './estudantes.css';
import * as React from 'react';
import XzinCinza from '../../imgs/XzinhoCinza.svg';
import Lupazinha from '../../imgs/lupazinha.svg';
import Setinha from '../../imgs/setinhaEstudantes.svg';
import EstudantesInfo from '../estudantesInfo/estudantesInfo';
import api from '../../api';
import { saveAs } from 'file-saver';

export default function Estudantes(props) {
    const idProfessor = sessionStorage.getItem('userId')
    const idTurma = sessionStorage.getItem('idTurmaClicada')

    const handleDownloadCSV = async () => {
        try{
            const response = await api.get(`/turmas/gerarCSV/${idProfessor}/${idTurma}`, { responseType: 'blob', 
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } 
            })
            const blob = new Blob([response.data], { type: 'application/csv' })
            saveAs(blob, 'dadosTurma.csv');
        } catch (error) {
            console.log(error)
        }
    }

    const alunosTurma = props.listaEstudantes
    const avatarGenerico = sessionStorage.getItem('defaultAvatar')

    return (
        <div className="estudantes">
            <div className='barraNavegacao'>
                <div className='selecionar'>
                    <input type="checkbox" />
                    <label htmlFor="">Selecionar todos</label>
                </div>
                <div className='botoesDireita'>
                    <div className='botoesEstudantes' onClick={handleDownloadCSV}>
                        <div className='excluir'>
                            <p>Download CSV</p>
                        </div>
                    </div>
                    <div className='botoesEstudantes'>
                        <div className='excluir'>
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
            <div className='estudantesInformacoes'>
                {alunosTurma.map((aluno) => {
                    return (
                        <EstudantesInfo nomeAluno={aluno.nome + ' ' + aluno.sobrenome} apelido={'@' + aluno.apelido} qtdPontos={aluno.pontuacao} AvatarAluno={aluno.avatar[0]?.imagemURL || avatarGenerico} />
                    )
                }
                )}
            </div>
        </div>
    );
}
