import React, { useState } from 'react';
import './descricaoAula.css';
import Triangulo from '../../imgs/TrianguloAula.svg';

export default function DescricaoAula(props) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`descricaoAula ${expanded ? 'expanded' : ''}`}>
            <div className='numeroAula'>
                <p>Aula {props.numeroAula}</p>
            </div>
            <div className='descricaoTitulo'>
                <div className='abrirDetalhes'>
                    <div className='triangulo'>
                        <img src={Triangulo} alt="Triangulo" onClick={toggleExpanded} />
                    </div>
                    <div className='detalhesAbrir'> 
                    <div className='nomeAula'>
                        <p>{props.nomeAula}</p>
                    </div>
                    {expanded && <p id='descricao' className="descricaoTexto">{props.descricaoTexto}</p>}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}
