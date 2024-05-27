import Header from '../../componentes/header/header';
import CardTurmaCadastro from '../../componentes/cardTurmaCadastro/cardTurmaCadastro';
import CardTurma from '../../componentes/cardTurma/cardTurma';
import Ajuda from '../../componentes/ajuda/ajuda';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './portalProfessor.css';


function Portal() {
  let navigate = useNavigate();

  const [nomeTurma, setNomeTurma] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [qtdAlunos, setQtdAlunos] = useState('');
  const [turmas, setTurmas] = useState([]);

  const handleSavePost = () => {
    const novaTurma = {
      nomeTurma,
      escolaridade,
      qtdAlunos,
    };

    setTurmas([...turmas, novaTurma]);
    alert("Clicou no botão")
    console.log(turmas)

    setNomeTurma('');
    setEscolaridade('');
    setQtdAlunos('');
  };

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
            setQtdAlunos={setQtdAlunos}
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
