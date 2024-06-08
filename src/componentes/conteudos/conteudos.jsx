import './conteudo.css'
import CardConteudo from '../cardConteudo/cardConteudo'

export default function Conteudo(props) {
    return (
        <div className='conteudo'>
            <CardConteudo
                titulo="Lógica de Programação"
            />
        </div>
    )
}