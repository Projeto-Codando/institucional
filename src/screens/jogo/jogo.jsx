import './jogo.css'
import React, { useState } from 'react';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png"
import Quiz from '../../componentes/quiz/quiz';
import TrianguloE from '../../imgs/triangulo-esquerda.png'
import TrianguloD from '../../imgs/triangulo-direita.png'

function Jogo() {
    return (
        <div className='jogo'>
            <Header
                logo={Logo}
                statusEstrela="true"
                statusSerie="true"
                statusAvatar="true"
            />
            <div className='sectionJogo'>
                <div className='niveisJogo'>
                        <img src={TrianguloD} alt="Triangulo esquerda" />
                        <div></div>
                        <img src={TrianguloE} alt="Triangulo direita" />
                </div>
                <div className='containerJogo'>
                    <Quiz/>
                    <div className='telaQuiz'>  
                        <div className='imagemQuiz'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Jogo; 