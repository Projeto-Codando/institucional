import './mensagemProfessor.css'
import Perninha from './../../imgs/perninha.svg'

export default function Mensagem(props) {

    return (
        <div class="inputs">
            <div class="mensagem">
            <label>{props.text}</label>
            </div>
            <div class="perninha">
            <label>{props.horario}</label>
            <img src={Perninha} alt="" />
            </div>
        </div>
    )
}
