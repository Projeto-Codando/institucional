import './cardConteudo.css'
import Tema from '../tema/tema'


export default function CardConteudo(props) {
    return (
        <div className='cardConteudo'>
            <div className='tituloConteudo'>
                <h1>{props.titulo}</h1>
            </div>
            <Tema
                tituloTema="Laço de Repetição"
            />
            <Tema
                tituloTema="Condicional"></Tema>
        </div>
    )
}