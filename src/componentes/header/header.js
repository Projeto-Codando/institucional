import React from 'react'
import Logo from "../../imgs/Logo.svg"
import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral.js'
import './header.css'
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate;

function redirectLogin(){
  navigate('/login');
}

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
        padding='15px'
        onClick={redirectLogin}
        />
        
      </div>
    </header>
  )
}

export default Header;
