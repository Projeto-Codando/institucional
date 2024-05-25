import './jogo.css'
import React, { useState } from 'react';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/logo-roxo.png"
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
                    
                </div>
                <div className='containerJogo'>
                    
                </div>
            </div>
        </div>
    )
    

}

export default Jogo; 