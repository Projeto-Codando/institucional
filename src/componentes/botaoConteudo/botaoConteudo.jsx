import './botaoConteudo.css'

export default function BotaoConteudo(props) {

    return (
        <div class="botao-conteudo">
            <button onClick={props.onClick} for={props.text}>{props.text}</button>
        </div>  
    )
}
