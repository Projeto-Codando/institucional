import './cardConteudo.css'

export default function CardConteudo(props) {
    return (
        <div className='cardConteudo'>
            <div className='tituloConteudo'>
                <h1>{props.titulo}</h1>
            </div>
        </div>
    )
}