import './alertaSala.css'
import Exclamacao from '../../imgs/Exclaimation.svg'
import Sino from '../../imgs/Bell.svg'

export default function AlertaSala(props) {
    const isUrgente = props.urgente;
    const backgroundColor = isUrgente ? '#F2BDBD' : '#F8BE85';
    const imageSrc = isUrgente ? Exclamacao : Sino;

    return (
        <div className='alertaSala' style={{ backgroundColor: backgroundColor }}>
            <div className='textos'>
                <div className='tituloAlerta'>
                    <p style={{ fontWeight: 'bold' }}>Aluno</p><p>{props.nomeAluno}</p>
                </div>
                <div className='descricao' style={{ fontSize: '12px' }}>
                    {props.descricao}
                </div>
            </div>
            <div className='imagemAlerta'>
                <img src={imageSrc} alt="" />
            </div>
        </div>
    )
}
