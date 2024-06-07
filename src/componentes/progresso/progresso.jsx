import './progresso.css'
import Alerta from '../../imgs/AlertaTeste.svg'
import Alerta2 from '../../imgs/AlertaTeste2.svg'
import AlertaSala from '../alertaSala/alertaSala'
import DetalhesAula from '../detalhesAula/detalhesAula'

export default function Progresso(props) {
    return (
        <div className='progresso'>
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
                <DetalhesAula
                    aula="Constantes"
                    tema="Variável"
                    alunosConclusao="18"
                    alunosTotal="30"
                    pontuacaoMedia="8"
                />
                <div className='barraHorizontal'></div>
                <DetalhesAula
                    aula="Constantes"
                    tema="Variável"
                    alunosConclusao="18"
                    alunosTotal="30"
                    pontuacaoMedia="8"
                />
                <div className='barraHorizontal'></div>
                <DetalhesAula
                    aula="Constantes"
                    tema="Variável"
                    alunosConclusao="18"
                    alunosTotal="30"
                    pontuacaoMedia="8"
                />
                <div className='barraHorizontal'></div>
                <DetalhesAula
                    aula="Constantes"
                    tema="Variável"
                    alunosConclusao="18"
                    alunosTotal="30"
                    pontuacaoMedia="8"
                />
                <div className='barraHorizontal'></div>
                <DetalhesAula
                    aula="Constantes"
                    tema="Variável"
                    alunosConclusao="18"
                    alunosTotal="30"
                    pontuacaoMedia="8"
                />
                <div className='barraHorizontal'></div>
            </div>
            <div className='alertas'>
                <h1>A L E R T A S</h1>
                <AlertaSala
                    urgente={true}
                    nomeAluno="Guilherme Santos"
                    descricao="Tirou uma nota abaixo da média da Turma 6C-2024 no tema Laço de Repetição."
                />
                <AlertaSala
                    urgente={false}
                    nomeAluno="Ana Silva"
                    descricao="Faltou à última aula da Turma 6C-2024 no tema Laço de Repetição."
                />

                
            </div>
        </div>
    )
}
