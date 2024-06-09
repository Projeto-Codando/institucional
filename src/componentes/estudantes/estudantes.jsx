import './estudantes.css';
import * as React from 'react';
import XzinCinza from '../../imgs/XzinhoCinza.svg';
import Lupazinha from '../../imgs/lupazinha.svg';
import Setinha from '../../imgs/setinhaEstudantes.svg';
import EstudantesInfo from '../estudantesInfo/estudantesInfo';

export default function Estudantes(props) {
    return (
        <div className="estudantes">
            <div className='barraNavegacao'>
                <div className='selecionar'>
                    <input type="checkbox" />
                    <label htmlFor="">Selecionar todos</label>
                </div>
                <div className='botoesDireita'>
                    <div className='botoesEstudantes'>
                        <div className='excluir'>
                            <p>Excluir</p>
                            <img src={XzinCinza} alt="" />
                        </div>
                    </div>
                    <div className='botoesEstudantes'>
                        <div className='pesquisarEstudante' onClick={{}}>
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
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />

                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />
                <EstudantesInfo nomeAluno='Guilherme Santos' apelido='@guido' qtdPontos='10' />

                
            </div>
        </div>
    );
}
