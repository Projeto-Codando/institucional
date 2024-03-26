import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import './barra-lateral.css'

function BarraLateral(props) {
  const [open, setOpen] = useState(false);

  function changeStateBar() {
    setOpen(!open)
  }

  return (
    <div>
      <div className="menu-icon" style={{width: '150px'}}>
        <FontAwesomeIcon icon={faBars} onClick={changeStateBar} className='text-cor-roxa' />
      </div>
      <div className={`barra-lateral ${open ? 'aberto' : ''}`} style={{ opacity: open ? 1 : 0 }}>
        <FontAwesomeIcon icon={faTimes} onClick={changeStateBar} className='botao-fechar'/>
      </div>
    </div>
  );
}

export default BarraLateral;
