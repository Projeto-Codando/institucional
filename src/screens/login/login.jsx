import Header from "../../componentes/headerLoginCadastro/headerLogin";
import FormularioLogin from "../../componentes/formularios/formularioLogin"
import './login.css'
function Login() {
    return (
        <div>
            <Header />
            <section className='sectionBackgroundLogin' >
                <div className='buttom-voltar'>
                    <button> &lt; Voltar </button>
                </div>
                <div className='container-background' >

                    <FormularioLogin />

                </div>
            </section >
        </div>

    )
}

export default Login;