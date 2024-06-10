import './estudantes.css';
import * as React from 'react';
import XzinCinza from '../../imgs/XzinhoCinza.svg';
import Lupazinha from '../../imgs/lupazinha.svg';
import Setinha from '../../imgs/setinhaEstudantes.svg';
import EstudantesInfo from '../estudantesInfo/estudantesInfo';
import api from '../../api';
import { saveAs } from 'file-saver';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

export default function Estudantes(props) {
    const idProfessor = sessionStorage.getItem('userId')
    const idTurma = sessionStorage.getItem('idTurmaClicada')
    const [loading, setLoading] = React.useState(false);
    const alunosTurma = props.listaEstudantes
    const avatarGenerico = 'https://qxztjedmqxjnfloewgbv.supabase.co/storage/v1/object/public/macaco/chimpaZe_default.png'

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
    }

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
