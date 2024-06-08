import './portalSala.css'
import Header from '../../componentes/header/header'
import FaixaTurma from '../../componentes/faixaTurma/faixaTurma';
import Progresso from '../../componentes/progresso/progresso';
import Conteudo from '../../componentes/conteudos/conteudos';
import Estudantes from '../../componentes/estudantes/estudantes';
import api from '../../api';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';


function PortalSala() {
  const [turmaData, setTurmaData] = useState(null);

  useEffect(() => {
    const turmaBuscada = sessionStorage.getItem('idTurmaClicada');

    api.get(`/turmas/buscar-turma-por-id/${turmaBuscada}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then((json) => {
      if(json.data === null){
        toast.error("Não foi possível encontrar a turma!");
      } else {
        setTurmaData(json.data);
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  if (!turmaData) {
    return null; // or return a loading spinner
  }

  return (
    <div className='body'>
      <Header className='container'/>
      <div className='portalSala'>
        <FaixaTurma
          text={turmaData.nome}
          escolaridade={turmaData.fkEscolaridade.descricao}
          codigo={turmaData.senha}
        />
        <div className='telaPrincipal'>
          <Progresso />
        </div>
      </div>
    </div>
  );
}

export default PortalSala;