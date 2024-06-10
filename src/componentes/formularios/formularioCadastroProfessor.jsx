import './formularioCadastro.css'
import MacacoOculos from '../../imgs/macacoCadastroPro.png'
import InputsLogin from '../inputsLogins/inputsLogins'
import Botao from '../botao/botoes'
import SubtituloForm from '../subtituloForm/subtituloForm'
export default function Formulario(props) {
    return (
        <form className='section-formulario'>

            <SubtituloForm 
            checked={true}
            navigateProfessor='cadastroProfessor'
            navigateAluno='cadastro'
            />
            <div className='container-formulario'>
                <div className='forms'>
                    <div className='nomes'>
                        <InputsLogin
                            text='Nome'
                            id='nome'
                            width='200px'
                            onChange={typeof props.setNome === 'function' ? props.setNome : undefined}
                            placeholder='Digite seu nome'
                        />
                        <InputsLogin
                            text='Sobrenome'
                            id='sobrenome'
                            width='200px'
                            onChange={typeof props.setSobrenome === 'function' ? props.setSobrenome : undefined}
                            placeholder='Digite seu sobrenome'
                        />
                    </div>
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
                        placeholder='Crie uma senha'
                    />
                    <InputsLogin
                        text='Confirmação de senha'
                        id='confirmacaoSenha'
                        type='password'
                        width='97%'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
                        placeholder='Confirme a senha'
                    />
                </div>
            </div>
            <div className='buttom'>

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
