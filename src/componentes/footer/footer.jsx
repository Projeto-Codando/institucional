import React from 'react'
import './footer.css'
import Logo from '../../imgs/LogoAmarela.svg'
import Background from '../../imgs/background-footer.png'

export default function Footer() {
  return (
    <footer>

      <div className="container-footer container-fora" >
        <img className="img-back" src={Background} alt="Img de fundo" />
        <div className="container-footer">
          <div className="ladoEsquerdo">
            <div className='topo'>
              <div className='card-footer'>
                <h1>Projeto</h1>
                  <span>Sobre nós</span>
                  <span>Parceiros</span>
                  <span>Review</span>
              </div>
              <div className='card-footer'>
                <h1>Educadores</h1>
                <span>Estudantes</span>
                <span>Progresso</span>
              </div>
            </div>
            <div className='baixo'>
              <div className='card-footer'>
                <h1>Suporte</h1>
                <span>Help Center</span>
                <span>FAQ</span>
              </div>
              <div className='card-footer'>
                <h1>Alunos</h1>
                <span>Plataforma</span>
                <span>Ajuda</span>
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


