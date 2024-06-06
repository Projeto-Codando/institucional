import './lobby.css'
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/verde-logo.svg"
import Avatar from "../../imgs/img-avatar.png"
import MetadeFloresta from "../../imgs/background-floresta-cortado.png"
import Estrela from '../../imgs/estrela.png'
import Start from '../../imgs/start.png'


function Lobby() {

    return (
        <div className='rotaNiveis'>
            <Header
                logo={Logo}
                statusEstrela="true"
                statusSerie="true"
                statusAvatar="true"
                statusLogin='true'
                statusLoginAluno='true'
            />
            <div className='sectionRotas'>
                <div className='containerBemVindo'>
                    <img className='background-bemVindo' src={MetadeFloresta} alt="Background Floresta" />
                    <div className='cardsBemVindo'>
                        <div className='bemVindo'>
                            <img src={Avatar} alt="Imagem avatar" />
                            <span>Bem Vindo(a), <br />Lisandra!</span>
                        </div>
                        <div className='cardTema'>1
                            
                            <div className='tema'>
                                <span className='span1'>Tema atual:</span>
                                <span className='span2'>Laço de Repetição</span>
                                <button className='botaoBemVindo'> <img src={Start} alt="" />Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='containerRota'>
                    <div className='rota'>
                        <div className='cardNiveis1'>
                            <div className='nivel'> <span>1</span> </div>
                            <div className='nivel'> <span>2</span> </div>
                        </div>
                        <div className='containerNivel'>
                            <div className='cardNiveis2'>
                                <div className='nivel'> <span>3</span> </div>
                                <div className='nivel'> <span>4</span> </div>
                                <div className='nivel'> <span>5</span> </div>
                            </div>
                        </div>
                    </div>
                    <div className='containerAula'>
                        <div className='cardAula'>
                            <div className='materia'>
                                <span className='aula'>Aula 02</span>
                                <span className='tituloMateria'>Logica de Programação</span>
                            </div>
                            <div className='titulo'><span>Laço de Repetição</span>
                            </div>
                            <div className='subtituloAula'>
                                <span>Lorem ipsum dolor sit amet consec tetur. Nisi rhoncus diam magna ullamcorper Lorem ipsum dolor sit amet consectetur.</span>
                            </div>
                            <div className='estrelaAula'>
                                <img src={Estrela} alt="estrelaAula" /> <span>0 / 5</span>
                            </div>
                            <div className='botaoAula'> <button><img src={Start} alt="" />Iniciar</button></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
    

}

export default Lobby; 