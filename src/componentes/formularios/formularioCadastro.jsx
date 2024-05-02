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
                            onChange={typeof props.setNome === 'function' ? props.setNome : undefined}
                        />
                        <InputsLogin
                            text='Sobrenome'
                            id='sobrenome'
                            width='200px'
                            onChange={typeof props.setSobrenome === 'function' ? props.setSobrenome : undefined}
                        />
                    </div>
                    <InputsLogin
                        text='Nickname'
                        id='nickname'
                        onChange={typeof props.setApelido === 'function' ? props.setApelido : undefined}
                    />
                    <InputsLogin
                        text='Senha da Turma'
                        id='senhaTurma'
                        onChange={typeof props.setSenhaTurma === 'function' ? props.setSenhaTurma : undefined}
                    />
                    <InputsLogin
                        text='Senha'
                        id='senha'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
                    />
                    <InputsLogin
                        text='Confirmação de Senha'
                        id='confirmacaoSenha'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
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
                onClick={props.onClick}
                />
            </div>

            <div className="image-container">
                <img src={MacacoOculos} alt="Imagem" />
            </div>
        </form>
    )
}
