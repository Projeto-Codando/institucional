import './cardConteudo.css'
import Tema from '../tema/tema'

export default function CardConteudo(props) {
    const temas = props.temas;

    return (
        <div className='cardConteudo'>
            <div className='tituloConteudo'>
                <h1>{props.titulo}</h1>
            </div>
            {temas && temas.map((tema, index) => (
                <Tema
                    qtdAulas={tema.aulas.length}
                    tituloTema={tema.nome}
                    temas={tema.aulas}
                />
            ))}
        </div>
    )
}