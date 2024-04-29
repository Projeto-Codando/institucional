import './formularioCadastro.css'
import MacacoOculos from '../../imgs/macaco-oculos.png'
import InputsLogin from '../inputsLogins/inputsLogins'
import Botao from '../botao/botoes'
export default function Formulario(props) {
    return (
        <form className='section-formulario'>

            <div className='subtitulo'>
                <span>Detalhes da conta</span>
            </div>
            <div className='container-formulario'>
                <div className='forms'>
                    <div className='nomes'>
                        <InputsLogin
                            text='Nome'
                            id='nome'
                            width='200px'
                        />
                        <InputsLogin
                            text='Sobrenome'
                            id='sobrenome'
                            width='200px'
                        />
                    </div>
                    <InputsLogin
                        text='Nickname'
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
                    <InputsLogin
                        text='Confirmação de Senha'
                        id='sobrenome'
                    />
                </div>
            </div>
            <div className='buttom'>
                
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
                texto="Cadastrar"
                />
            </div>

            <div className="image-container">
                <img src={MacacoOculos} alt="Imagem" />
            </div>
        </form>
    )
}