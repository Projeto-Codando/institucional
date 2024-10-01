import './botaoEnviar.css'
import Aviaozinho from '../../imgs/Aviaozinho.svg'


export default function InputsLogin(props) {

    return (
        <div class="botao-enviar">
            <button onClick={props.onClick}><img src={Aviaozinho} alt="" /></button>
        </div>  
    )
}
