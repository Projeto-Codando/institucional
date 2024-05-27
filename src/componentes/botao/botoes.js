import React from 'react';
import './botao.css'


function Botao(props) {
  return (
    <button className='' style={{
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor || 'black',
      fontSize: props.fontSize || '18px',
      border: props.border || 'none',
      color: props.color || 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: props.padding || '',
      overflow: 'hidden',
      type: props.type || 'button'
    }} onClick={props.onClick}>
      {props.texto}
    </button>
  );
}

export default Botao;





