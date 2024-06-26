import './formularioLogin.css'
import MacacoOculos from '../../imgs/macaco-professor.png'
import InputsLogin from '../inputsLogins/inputsLogins'
import Botao from '../botao/botoes'
import SubtituloForm from '../subtituloForm/subtituloForm'
export default function Formulario(props) {
    return (
        <form className='section-formulario-login'>
            <SubtituloForm 
            checked={true}
            navigateProfessor='loginProfessor'
            navigateAluno='login'
            />
            <div className='container-formulario-login'>
                <div className='forms-login'>
                    <InputsLogin
                        text='Email'
                        id='email'
                        width='97%'
                        onChange={typeof props.setEmail === 'function' ? props.setEmail : undefined}
                        placeholder='Digite seu email'
                    />
                    <InputsLogin
                        text='Senha'
                        id='senha'
                        type='password'
                        width='97%'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
                        placeholder='Digite sua senha'
                    />
                </div>
            </div>
            <div className='buttom-login'>

                <Botao
                    backgroundColor="#662E9B"
                    fontSize="20px"
                    border="2px solid black"
                    color="white"
                    display="flex"
                    align-items="center"
                    justify-content="center"
                    overflow="hidden"
                    width="240px"
                    height="35px"
                    padding="0px"
                    texto="Entrar"
                    onClick={props.onClick}
                />
            </div>

            <div className="image-Container">
                <img src={MacacoOculos} alt="Imagem" />
            </div>
        </form>
    )
}
