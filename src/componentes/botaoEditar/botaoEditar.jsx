import './botaoEditar.css';
import Caneta from '../../imgs/caneta.svg';

export default function BotaoEditar(props) {
    return (
        <div className="botao-editar">
            <button onClick={props.onClick}>
                {props.text}
                <img src={Caneta} alt="" />
            </button>
        </div>
    );
}
