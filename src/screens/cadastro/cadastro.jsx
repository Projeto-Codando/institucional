import './cadastro.css'
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Formulario from "../../componentes/formularios/formularioCadastro"
function Cadastro(){
  return(
    <div>
      <Header />
      
      <section className='sectionBackgroundCadastro' >
            <div className='buttom-voltar'>
                <button> &lt; Voltar </button>
            </div>
            <div className='container-background-cadastro' >
            
                <Formulario />
                
            </div>
        </section >
      
    </div>
    
  )
}

export default Cadastro;
