import './botaoModal.css'

export default function InputsLogin(props) {

    return (
        <div class="botao-modal">
            <button onClick={props.onClick} for={props.text}>{props.text}</button>
    
        </div>
    )
}
