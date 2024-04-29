import './headerLogin.css'
import Logo from "../../imgs/Logo.svg"
import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral.js'
import Background from '../../imgs/banner-bananas.png'

export default function HeaderLogin() {
    return (
            <header className="headerLogin">
            <BarraLateral />
            <div className="logo">
                <img src={Logo} alt="Logo codando" />
            </div>
            <div className="buttons">
            <div className="button">
                <Botao backgroundColor='#662E9B'
                    width='8vw'
                    texto='Entrar'
                    padding='15px' />
            </div>
            <div className="button">
                <Botao backgroundColor='#662E9B'
                    width='8vw'
                    texto='Cadastrar'
                    padding='15px' />
            </div>
            </div>
        </header>

    )
}