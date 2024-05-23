import './faixaTurma.css'
import Navegacao from '../turmaNavegacao/turmaNavegacao'
export default function FaixaTurma(props) {
    return(
        <div className='faixaTurma'>
            <div className='faixaEsquerda'>
            <h1>Turma {props.text}</h1>
            <div className='turmaNavegacoes'>
                    <Navegacao
                    text='Progresso'/>
                    <Navegacao
                    text='Conteúdo'/>
                    <Navegacao
                    text='Estudantes'/>
            </div>
            </div>
            <div className='faixaDireita'>
                <div className='infoSala'>
            <p>Escolaridade</p>
            <p style={{fontWeight: 'bolder'}}>{props.escolaridade}</p>   
            </div>
            <div className='infoSala'>
            <p>Código</p>
            <p style={{fontWeight: 'bolder'}}>{props.codigo}</p>   
            </div>
            </div>
        </div>
    )
}