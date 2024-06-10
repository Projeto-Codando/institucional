import './estudantesInfo.css';
import Trofeu from '../../imgs/Trophy.svg';
import BotaoEditar from '../botaoEditar/botaoEditar';

export default function EstudantesInfo(props) {
    return (
        <div className="estudantesInfo">
            <div className='selectImagem'>
            <input type="checkbox" />
            <div className='avatarAtividade'>
            <img src={props.AvatarAluno} alt="imagem do aluno" style={{width: '50px', borderRadius: 360}}/>
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
            <div className='finalCard'>
                <BotaoEditar
                    text='Editar'
                    onClick={props.openEditarModal} 
                />
            </div>
        </div>
    );
}
