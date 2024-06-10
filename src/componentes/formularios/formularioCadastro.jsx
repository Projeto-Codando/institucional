import './formularioCadastro.css'
import MacacoOculos from '../../imgs/macaco-oculos.png'
import InputsLogin from '../inputsLogins/inputsLogins'
import Botao from '../botao/botoes'
import SubtituloForm from '../subtituloForm/subtituloForm'
export default function Formulario(props) {
    return (
        <form className='section-formulario'>

            <SubtituloForm 
            checked={false}
            navigateProfessor='cadastroProfessor'
            navigateAluno='cadastro'
            />
            <div className='container-formulario'>
                <div className='forms'>

                    <div className='nomes'>
                        <InputsLogin
                            text='Nome'
                            type='text'
                            id='nome'
                            width='200px'
                            onChange={typeof props.suetNome === 'function' ? props.setNome : undefined}
                            placeholder='Digite seu nome'
                        />
                        <InputsLogin
                            text='Sobrenome'
                            type='text'
                            id='sobrenome'
                            width='200px'
                            onChange={typeof props.setSobrenome === 'function' ? props.setSobrenome : undefined}
                            placeholder='Digite seu sobrenome'
                        />
                    </div>
                    <InputsLogin
                        text='Nickname'
                        type='text'
                        width='97%'
                        id='nickname'
                        onChange={typeof props.setApelido === 'function' ? props.setApelido : undefined}
                        placeholder='Escolha um nickname'
                    />
                    <InputsLogin
                        text='Senha da turma'
                        type='text'
                        width='97%'
                        id='senhaTurma'
                        onChange={typeof props.setSenhaTurma === 'function' ? props.setSenhaTurma : undefined}
                        placeholder='Senha da turma'
                    />
                    <InputsLogin
                        text='Sua senha'
                        type='password'
                        id='senha'
                        width='97%'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
                        placeholder='Crie uma senha'
                    />
                    <InputsLogin
                        text='Confirmação de senha'
                        type='password'
                        width='97%'
                        id='confirmacaoSenha'
                        onChange={typeof props.setSenha === 'function' ? props.setSenha : undefined}
                        placeholder='Confirme sua senha'
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
                    type="submit"
                    onClick={props.onClick}
                />
            </div>

            <div className="image-container">
                <img src={MacacoOculos} alt="Imagem" />
            </div>
        </form>
    )
}
