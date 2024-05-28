import Botao from '../botao/botoes.js'
import './bannerComBotao.css'
import { useNavigate } from 'react-router-dom'

function BannerComBotao(){
  const navigate = useNavigate();
  return (
    <section className='banner'>
      <h1>É  <span className='font-ppp2'>CODANDO</span>  QUE <br/>SE APRENDE</h1>
      <h3>Plataforma de codificação para crianças</h3>
      <Botao 
      backgroundColor='#7CB518' 
      cor='#FFF' 
      texto='Cadastre-se'
      padding='15px'
      width='180px'
      onClick={() => navigate("/cadastro")}
       />
    </section>
  )
  
}

export default BannerComBotao;
