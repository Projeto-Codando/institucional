import './botaoConteudo.css'

export default function BotaoConteudo(props) {

    return (
        <div class="botao-modal">
            <button onClick={props.onClick} for={props.text}>{props.text}</button>
        </div>  
    )
}
