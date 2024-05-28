  import Header from '../../componentes/header/header';
  import CardTurmaCadastro from '../../componentes/cardTurmaCadastro/cardTurmaCadastro';
  import CardTurma from '../../componentes/cardTurma/cardTurma';
  import Ajuda from '../../componentes/ajuda/ajuda';
  import { useNavigate } from 'react-router-dom';
  import React, { useState } from 'react';
  import './portalProfessor.css';
  import * as Yup from 'yup';
  import { ErrorMessage } from 'formik';
  import { toast } from 'react-toastify';





  function Portal() {
    let navigate = useNavigate();

    const [nomeTurma, setNomeTurma] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [senhaTurma, setSenhaTurma] = useState('');
    const [turmas, setTurmas] = useState([]);

    const validationSchema = Yup.object().shape({
      nomeTurma: Yup.string().required('Campo Obrigatório'),
      escolaridade: Yup.string().required('Campo Obrigatório'),
      senhaTurma: Yup.string().required('Campo Obrigatório').min(6, 'No mínimo 6 digitos da senha da Turma!')

  });

    const handleSavePost = async (event) => {
      event.preventDefault();
      console.log("Clicou no botão");
      

      const novaTurma = {
        nomeTurma,
        escolaridade,
        senhaTurma,
      };

      try {
        await validationSchema.validate(novaTurma, {abortEarly: false});
        console.log("Dados válidos:", novaTurma);
        toast.success("Criação da sala realizada com sucesso!")
    

      setTurmas([...turmas, novaTurma]);
      console.log(turmas)

      setNomeTurma('');
      setEscolaridade('');
      setSenhaTurma('');
    
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Erros de validação:");
      error.inner.forEach((err) => {
        toast.error(err.message);
      })
    }
  }
    }
    return (
      <div className="portalProfessor" style={{ overflow: 'hidden' }}>
        <Header className="container" />
        <div className="portal">
          <h1 style={{ color: "#ffffff", fontSize: '32px' }}>Bem Vindo(a), Lisandra</h1>
          <div className="CardTurmas" style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
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
                key={index}
                turma={turma.nomeTurma}
                serie={`${turma.escolaridade}ª Ano`}
                qtdAlunos={`${turma.qtdAlunos} Alunos`}
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
    );
  }

  export default Portal;
