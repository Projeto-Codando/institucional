import './backgroundLogin.css'
import Formulario from '../formularios/formularioCadastro'

export default function BackgroundLogin() {
    return (
        <section className='sectionBackgroundLogin'>
            <div className='buttom-voltar'>
                <button> &lt; Voltar </button>
            </div>
            <div className='container-background'>
            
                <Formulario />
                
            </div>
        </section >
    )
}