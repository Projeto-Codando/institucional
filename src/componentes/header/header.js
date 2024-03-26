import React from 'react'
import Logo from "../../imgs/Logo.svg"
import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral.js'
import './header.css'

function Header() {
  return (
    <header className="header">
      <BarraLateral/>
      <div className="logo">
        <img src={Logo} alt="Logo codando" />
      </div>
      <div className="button">
        <Botao backgroundColor= '#662E9B'
        width='8vw'
        texto='Entrar'
        padding='15px'/>
      </div>
    </header>
  )
}

export default Header;
