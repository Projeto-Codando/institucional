import React from "react";
import './faq.css'
import Seta from "../../imgs/Seta-faq.png"
export default function Faq() {
    return (
        <div className="section-faq">
            <div className="container-faq">
                <div className="titulo-faq">
                    <span>FAQ</span>
                </div>
                <div className="cards-faq">
                    <div className="card-faq">
                        <span className="redirect">O QUE É CODANDO?</span> 
                        <img className="redirect" src={Seta} alt="seta faq"/>
                    </div>
                    <div className="card-faq">
                        <span className="redirect">PARA QUE IDADE É?</span>
                        <img className="redirect" src={Seta} alt="seta faq" />
                    </div>
                    <div className="card-faq">
                        <span className="redirect">QUE TÓPICOS ABORDA?</span>  
                        <img className="redirect" src={Seta} alt="seta faq" />  
                    </div>
                    <div className="subtitulo-faq">
                    <span>Veja todas as perguntas frequentes</span>
                </div>
                </div>

                
            </div>
        </div>
    )
}