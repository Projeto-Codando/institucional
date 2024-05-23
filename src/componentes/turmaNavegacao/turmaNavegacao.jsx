import './turmaNavegacao.css'

export default function turmaNavegacao(props) {

    return (
        <div class="navegacao">
            <label for={props.text}>{props.text}</label>
        </div>
    )
}
