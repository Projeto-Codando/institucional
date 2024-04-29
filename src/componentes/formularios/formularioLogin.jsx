import './formularioLogin.css'
import MacacoOculos from '../../imgs/macaco-oculos-esq.png'
import InputsLogin from '../inputsLogins/inputsLogins'
import Botao from '../botao/botoes'
export default function Formulario() {
    return (
        <form className='section-formulario-login'>

            <div className='subtitulo-login'>
                <span>Detalhes da conta</span>
            </div>
            <div className='container-formulario-login'>
                <div className='forms-login'>
                    
                    <InputsLogin
                        text='Nickname (Apelido)'
                        id='nickname'
                    />
                    <InputsLogin
                        text='Senha da Turma'
                        id='sobrenome'
                    />
                    <InputsLogin
                        text='Senha'
                        id='sobrenome'
                    />
                </div>
            </div>
            <div className='buttom-login'>
                
                <Botao
                backgroundColor= "#662E9B"
                fontSize= "20px"
                border= "2px solid black"
                color= "white"
                display= "flex"
                align-items= "center"
                justify-content= "center"
                overflow= "hidden"
                width= "240px"
                height= "35px"
                padding= "0px"
                texto="Entrar"
                />
            </div>

            <div className="image-Container">
                <img src={MacacoOculos} alt="Imagem" />
            </div>
        </form>
    )
}