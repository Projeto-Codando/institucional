import './detalhesAula.css'
import Certinho from '../../imgs/ic_round-check.svg'
import Trofeu from '../../imgs/Trofeu.svg'
export default function DetalhesAula(props) {
    return(
        <div className='detalhesAula'>
         <p>{props.aula}</p>
         <p>{props.tema}</p>
         <div className='qtdConclusao'>
         <p>{props.alunosConclusao}/{props.alunosTotal}</p>
         <img src={Certinho} alt="" /> 
            </div> 
            <div className='mediaPoints'>
         <p>{props.pontuacaoMedia}</p>
         <img src={Trofeu} alt="" /> 
            </div>
            
        </div>
    )
}