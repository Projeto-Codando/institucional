import './portalSala.css'
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import FaixaTurma from '../../componentes/faixaTurma/faixaTurma';
import Progresso from '../../componentes/progresso/progresso';
import Conteudo from '../../componentes/conteudos/conteudos';
import Logo from '../../imgs/verde-logo.svg'
import { useEffect, useState } from 'react';
import Estudantes from '../../componentes/estudantes/estudantes';
import api from '../../api';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';

function PortalSala() {

    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);

    useEffect(() => {

        const apelido = sessionStorage.getItem("apelido");
        const email = sessionStorage.getItem("email");

        if (apelido) {
            setIsAlunoLoggedIn(true);
        }
        if (email) {
            setIsProfessorLoggedIn(true);
        }

    }, []);

<<<<<<< HEAD
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
=======
    return (
        <div >
            <Header
                logo={Logo}
                statusLogoff={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
                statusLogin={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
                statusLoginAluno={isAlunoLoggedIn ? "true" : null}
                statusLoginProfessor={isProfessorLoggedIn ? "true" : null}
                statusEstrela={isAlunoLoggedIn ? "true" : null}
                statusSerie={isAlunoLoggedIn ? "true" : null}
                statusAvatar={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
            />
            <div className='portalSala'>
                <FaixaTurma
                    text="6C-2024"
                    escolaridade="6º ano"
                    codigo="31204"
                />
                <div className='telaPrincipal'>
                <Progresso
                
                />
                </div>
             
                
            </div>
>>>>>>> 03001fffd3cf084827424451f6f6d2565e2b35a3
        </div>
      </div>
    </div>
  );
}

export default PortalSala;