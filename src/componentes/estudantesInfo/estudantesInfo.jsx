import './estudantesInfo.css'
import Trofeu from '../../imgs/Trophy.svg'
export default function estudantesInfo(props) {

    return (
        <div class="estudantesInfo">
            <div className='selectImagem'>
            <input type="checkbox" />
            <div className='avatarAtividade'>
            <img src={props.AvatarAluno} alt="imagem do aluno" />
            </div>
                        </div>

            <div className='infosPrincipais'>
                <span>{props.nomeAluno}</span>
                <span>{props.apelido}</span>
                <div className='pontosAluno'>
                    <span>{props.qtdPontos}</span>
                    <img src={Trofeu} alt="" />
                </div>
            </div>
           
            
        </div>  
    )
}
