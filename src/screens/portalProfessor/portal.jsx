import React, { useEffect, useState } from 'react';
import Header from '../../componentes/header/header';
import CardTurmaCadastro from '../../componentes/cardTurmaCadastro/cardTurmaCadastro';
import CardTurma from '../../componentes/cardTurma/cardTurma';
import Ajuda from '../../componentes/ajuda/ajuda';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import api from '../../api';
import './portalProfessor.css';

function Portal() {
  let navigate = useNavigate();

  const [nomeTurma, setNomeTurma] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [senhaTurma, setSenhaTurma] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fkEducador = sessionStorage.getItem('userId');

  const validationSchema = Yup.object().shape({
    nomeTurma: Yup.string().required('Campo Obrigatório'),
    senhaTurma: Yup.string().required('Campo Obrigatório').min(6, 'No mínimo 6 digitos da senha da Turma!')
  });

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
          console.log(turma);
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
      console.error(error);
    });
  }, []);

  const handleSavePost = async (event) => {
    event.preventDefault();
    console.log("Clicou no botão");

    const novaTurma = {
      nomeTurma,
      escolaridade,
      senhaTurma,
    };

    const turmaAdicionada = {
      nome: nomeTurma,
      senha: senhaTurma,
      fkEscolaridade: escolaridade,
      fkEducador: fkEducador
    };

    try {
      await validationSchema.validate(novaTurma, { abortEarly: false });
      console.log("Dados válidos:", novaTurma);
      toast.success("Criação da sala realizada com sucesso!");

      api.post('/turmas', turmaAdicionada, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });

      setTurmas([...turmas, novaTurma]);
      console.log(turmas);

      setNomeTurma('');
      setEscolaridade('');
      setSenhaTurma('');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.error("Erros de validação:");
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="portalProfessor" style={{ overflow: 'hidden' }}>
      <Header className="container" />
      <div className="portal">
        <h1 style={{ color: "#ffffff", fontSize: '32px' }}>Bem vindo(a), {sessionStorage.getItem("nome")}</h1>
        <div className={`CardTurmas ${isModalOpen ? 'blur' : ''}`} style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
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
          {turmas.map((turma, index) => (
            <CardTurma
              setNomeTurma={setNomeTurma}
              setEscolaridade={setEscolaridade}
              setSenhaTurma={setSenhaTurma}
              edicaoNomeTurma={turma.nomeTurma}
              edicaoSenhaTurma={turma.senhaTurma}
              onClick={handleSavePost}
              key={index}
              turma={turma.nomeTurma}
              serie={turma.escolaridade}
              qtdAlunos={`${turma.qtdAlunos || 0} Alunos`}
              idCard={turma.idCard}
              configCardTurma={{
                backgroundColor: '#FFFFFF99',
                padding: '3px',
                width: '400px',
                color: '#476334'
              }}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </div>
        <Ajuda />
      </div>
    </div>
  );
}

export default Portal;
