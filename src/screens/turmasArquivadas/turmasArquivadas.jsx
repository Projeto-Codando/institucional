import Header from '../../componentes/headerLoginCadastro/headerLogin'
import CardTurma from '../../componentes/cardTurma/cardTurma'
import Ajuda from '../../componentes/ajuda/ajuda'
import Logo from '../../imgs/verde-logo.svg'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './turmasArquivadas.css'
import api from '../../api';

function TurmasArquivadas() {
  let navigate = useNavigate()

  const [turmas, setTurmas] = useState([])
  const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
  const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);

  useEffect(() => {
    api.get(`/turmas/${sessionStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      const updatedTurmas = response.data
        .filter(turma => turma.statusTurma === "Inativa")
        .map(turma => {
          console.log(turma)
          return {
            ...turma,
            nomeTurma: turma.nome,
            escolaridade: turma.fkEscolaridade.descricao,
            senhaTurma: turma.senha,
            qtdAlunos: turma.alunos.length,
            idCard: turma.idTurma
          };
        });
      setTurmas(updatedTurmas);
    }).catch(error => {
      console.error(error)
    })

    const apelido = sessionStorage.getItem("apelidoUser");
    const email = sessionStorage.getItem("email");

    if(apelido){
      setIsAlunoLoggedIn(true);
    }
    if(email){
      setIsProfessorLoggedIn(true);
    }

  }, [])

  const handleClickCard = (idCard) => {
    sessionStorage.setItem('idTurmaClicada', idCard)
    navigate(`/portal/sala`)
  }

  return (
    <div className="portalProfessor" style={{ overflow: 'hidden' }}>
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
      <div className="portal">
        <h1 style={{ color: "#ffffff", fontSize: '32px' }}>Bem vindo(a), {sessionStorage.getItem("nome")}</h1>
        <div className="CardTurmas" style={{ display: 'flex', flexDirection: 'row', gap: '50px', overflowY: 'hidden'}}>
         
          {turmas.map((turma, index) => (
            <CardTurma
              key={index}
              turma={turma.nomeTurma}
              serie={turma.escolaridade}
              qtdAlunos={`${turma.qtdAlunos || 0} Alunos`}
              idCard={index + 1}
              onClick={() => handleClickCard(turma.idCard)}
              configCardTurma={{
                backgroundColor: '#FFFFFF99',
                padding: '3px',
                width: '400px',
                color: '#476334'
              }}
            />
          ))}
        </div>
        {/* <Ajuda /> */}
      </div>
    </div>
  )
}

export default TurmasArquivadas
