import React from 'react'
import './footer.css'
import Logo from '../../imgs/LogoAmarela.svg'

export default function Footer() {

  return (
    <footer>
      <div className="container-footer container-fora">
        <div className="container-footer">
          <div className="ladoEsquerdo">
            <div className='topo'>
              <div>
                <h1>Projeto</h1>
                <p>Sobre nós</p>
                <p>Parceiros</p>
                <p>Review</p>
              </div>
              <div>
                <h1>Educadores</h1>
                <p>Estudantes</p>
                <p>Progresso</p>
              </div>
            </div>
            <div className='baixo'>
              <div>
                <h1>Suporte</h1>
                <p>Help Center</p>
                <p>FAQ</p>
              </div>
              <div>
                <h1>Alunos</h1>
                <p>Plataforma</p>
                <p>Ajuda</p>
              </div>
            </div>
          </div>
          <div className='ladoDireito'>
            <img src={Logo} alt="Logo Codando" />
            <p>Codando, especialista em proporcionar soluções inovadoras para o aprendizado de lógica de programação em escolas públicas.
              Garantimos um ambiente de aprendizado eficiente e aprimoramos as habilidades, tornando o processo educacional emocionante e seguro.  </p>
          </div>
        </div>
        <div className='linhaDivisoria'></div>
        <div className="copyright">© CODANDO Inc.</div>
      </div>
    </footer>
  )
}


