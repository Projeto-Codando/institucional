import './jogo.css'
import React, { useState } from 'react';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png"
import Quiz from '../../componentes/quiz/quiz';
import TrianguloE from '../../imgs/triangulo-esquerda.png'
import TrianguloD from '../../imgs/triangulo-direita.png'
import CardNivelJogo from '../../componentes/cardNivelJogo/cardNivelJogo'
import IconStart from '../../imgs/iconStart.png'
import IconControle from '../../imgs/iconControle.png'
import IconControleRoxo from '../../imgs/iconControleRoxo.png'

function Jogo() {
    return (
        <div className='jogo'>
            <Header
                logo={Logo}
                statusEstrela="true"
                statusSerie="true"
                statusAvatar="true"
                statusLogin='true'
                statusLoginAluno='true'
            />
            <div className='sectionJogo'>
                <div className='niveisJogo'>
                    <img  className='trianguloD' src={TrianguloD} alt="Triangulo esquerda" />
                    <div className='cardsNivel'>
                        <CardNivelJogo 
                        backgroundColor='#7CB518'
                        statusTitulo='true'
                        titulo='Aula 2'
                        />
                        <CardNivelJogo 
                        backgroundColor= '#662E9B'
                        statusImg='true'
                        imagem={IconStart}
                        />
                        <CardNivelJogo 
                        backgroundColor= '#F3DE2C'
                        statusImg='true'
                        imagem={IconControle}
                        />
                        <CardNivelJogo 
                        backgroundColor= '#D9D9D9'
                        statusImg='true'
                        imagem={IconControleRoxo}
                        />
                    </div>
                    <img  className='trianguloE' src={TrianguloE} alt="Triangulo direita" />
                </div>
                <div className='containerJogo'>
                    <Quiz />
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