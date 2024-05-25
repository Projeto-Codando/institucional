import './botaoModal.css'

export default function InputsLogin(props) {

    return (
        <div class="botao-modal">
            <button for={props.text}>{props.text}</button>
    
        </div>
    )
}
