import './progresso.css'
import Alerta from '../../imgs/AlertaTeste.svg'
import Alerta2 from '../../imgs/AlertaTeste2.svg'

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
                <img src={Alerta}
                 alt="" />
                  <img src={Alerta2}
                 alt="" />
            </div>
        </div>

    )

}

