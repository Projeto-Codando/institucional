import './headerLogin.css'

import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral.js'
import Estrela from '../../imgs/estrela.png'
import Avatar from '../../imgs/img-avatar.png'
import { useNavigate } from 'react-router-dom'

const escolaridade = sessionStorage.getItem("Escolaridade")
const moedas = sessionStorage.getItem("moedas")

export default function HeaderLogin(props) {
    const navigate = useNavigate();
    return (
        <header className="headerLogin">
            <BarraLateral />
            <div className="logo">
                <img src={props.logo} alt="Logo codando" />
            </div>
            <div className="buttons" style={{
                justifyContent: props.justifyContent || "space-between"
            }}>
                {props.statusBotao1 && (
                    <div className="button">

                        <Botao backgroundColor='#662E9B'
                            width='8vw'
                            texto='Entrar'
                            padding='15px'
                            onClick={() => navigate("/login")}
                        />
                    </div>
                )}
                {props.statusBotao2 && (
                    <div className="button">

                        <Botao backgroundColor='#662E9B'
                            width='8vw'
                            texto='Cadastrar'
                            padding='15px'
                            onClick={() => navigate("/cadastro")}
                        />

                    </div>
                )}
                {props.statusEstrela && (
                    <div className='estrela'>
                        <img src={Estrela} alt="imagem estrela" />
                        <span>{moedas}</span>
                    </div>
                )}
                {props.statusSerie && (
                    <div className='serie'>
                        <span>{escolaridade}</span>
                    </div>
                )}
                {props.statusAvatar && (
                    <div className='avatar'>
                        <img src={Avatar} alt="imagem do avatar" />
                    </div>
                )}
            </div>
        </header>

    )
}
