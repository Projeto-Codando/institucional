import './estudantes.css';
import * as React from 'react';
import XzinCinza from '../../imgs/XzinhoCinza.svg'




export default function Estudantes() {
    return (
        <div className="estudantes">
            <div className='barraNavegacao'>
                <div className='selecionar'>
                <input type="checkbox" />
                <label htmlFor="">Selecionar todos</label>
                <div className='excluir'>
                    <p>Excluir</p>
                    <img src={XzinCinza} alt="" />
                </div>
                </div>
            


            </div>

        </div>
    )
}