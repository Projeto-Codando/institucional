import Header from '../../componentes/headerLoginCadastro/headerLogin'
import CardTurmaCadastro from '../../componentes/cardTurmaCadastro/cardTurmaCadastro'
import CardTurma from '../../componentes/cardTurma/cardTurma'
import Ajuda from '../../componentes/ajuda/ajuda'
import Logo from '../../imgs/verde-logo.svg'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './portalProfessor.css'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import api from '../../api';

function Portal() {
  let navigate = useNavigate()

  const [nomeTurma, setNomeTurma] = useState('')
  const [escolaridade, setEscolaridade] = useState('')
  const [senhaTurma, setSenhaTurma] = useState('')
  const [turmas, setTurmas] = useState([])
  const fkEducador = sessionStorage.getItem('userId')
  const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
  const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);

  const validationSchema = Yup.object().shape({
    nomeTurma: Yup.string().required('Campo Obrigatório'),
    senhaTurma: Yup.string().required('Campo Obrigatório').min(6, 'No mínimo 6 digitos da senha da Turma!'),
    escolaridade: Yup.string().required('Campo Obrigatório')
  })

  useEffect(() => {
    api.get(`/turmas/${sessionStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data);
      const updatedTurmas = response.data
        .filter(turma => turma.statusTurma === "Ativa")
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

  const handleSavePost = async (event) => {
    event.preventDefault()
    console.log("Clicou no botão")

    const novaTurma = {
      nomeTurma,
      escolaridade,
      senhaTurma,
    }

    const turmaAdicionada = {
      nome: nomeTurma,
      senha: senhaTurma,
      fkEscolaridade: escolaridade,
      fkEducador: fkEducador,
      fkModulo: 1
    }

    try {
      await validationSchema.validate(novaTurma, { abortEarly: false })

      api.post('/turmas', turmaAdicionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(response => {
        toast.success("Criação da sala realizada com sucesso!")
        setTurmas([...turmas, novaTurma])
        window.location.reload()
      }
      ).catch(error => {
        console.error(error)
      })

      setNomeTurma('')
      setEscolaridade('')
      setSenhaTurma('')


    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.error("Erros de validação:")
        error.inner.forEach((err) => {
          toast.error(err.message)
        })
      }
    }
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
        <div className="CardTurmas" style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
          <div className='cardCadastro'>
          <CardTurmaCadastro
            onClick={handleSavePost}
            setNomeTurma={setNomeTurma}
            setEscolaridade={setEscolaridade}
            setSenhaTurma={setSenhaTurma}
            text="Criar turma"
            configCardTurmaCadastro={{
              backgroundColor: '#FFFFFF99',
              padding: '3px',
              width: '400px',
              color: '#476334'
            }}
          />
          </div>
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
        <Ajuda />
      </div>
    </div>
  )
}

export default Portal
