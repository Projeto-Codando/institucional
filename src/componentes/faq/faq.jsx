import React, { useState } from "react";
import './faq.css';
import Seta from "../../imgs/Seta-faq.png";

export default function Faq() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard((prevActiveCard) => (prevActiveCard === index ? null : index));
  };

  const faqItems = [
    { question: "O QUE É CODANDO?", answer: "Codando é uma plataforma de aprendizado de programação." },
    { question: "PARA QUE IDADE É?", answer: "É para todas as idades, mas principalmente para jovens entre 10 e 18 anos." },
    { question: "QUE TÓPICOS ABORDA?", answer: "Aborda tópicos como HTML, CSS, JavaScript, e muito mais." }
  ];

  return (
    <div className="section-faq">
      <div className="container-faq">
        <div className="titulo-faq">
          <span>FAQ</span>
        </div>
        <div className="cards-faq">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`card-faq ${activeCard === index ? "active" : ""}`}
            >
              <div className="card-header">
                <span className="redirect">{item.question}</span>
                <img
                  className="redirect"
                  src={Seta}
                  alt="seta faq"
                  onClick={() => toggleCard(index)}
                />
              </div>
              {activeCard === index && (
                <div className="answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
          <div className="subtitulo-faq">
            <span>Veja todas as perguntas frequentes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
