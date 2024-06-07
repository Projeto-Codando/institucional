import './tema.css'
import Bolinhas from '../bolinhas/bolinhas'
export default function Tema(props) {
    return (
        <div className='tema'>
            <div className='tituloTema'>
                {props.tituloTema}
                <div className='linhaFina'></div>
            </div>
            <div className='detalhes'>
                <div className='bolinhasTotais'>
                    <Bolinhas
                    numeroAula='1'/>
                    <Bolinhas
                    numeroAula='2'/>
                    <Bolinhas
                    numeroAula='3'/>
                    <Bolinhas
                    numeroAula='4'/>

                </div>
                <div className='verMais'>
                    Ver Mais
                </div>
            </div>
        </div>

    )
}