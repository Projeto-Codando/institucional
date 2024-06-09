import './portalSala.css';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import FaixaTurma from '../../componentes/faixaTurma/faixaTurma';
import Progresso from '../../componentes/progresso/progresso';
import Conteudo from '../../componentes/conteudos/conteudos';
import Logo from '../../imgs/verde-logo.svg';
import { useEffect, useState } from 'react';
import Estudantes from '../../componentes/estudantes/estudantes';
import api from '../../api';
import { toast } from 'react-toastify';

function PortalSala() {
  const [turmaData, setTurmaData] = useState(null);
  const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
  const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
  const [estudantes, setEstudantes] = useState([]);
  const [visibleComponent, setVisibleComponent] = useState('Progresso'); 
  const [selectedNavegacao, setSelectedNavegacao] = useState('Progresso');
  const [turmaBuscada] = useState(sessionStorage.getItem('idTurmaClicada'));

  useEffect(() => {
    const apelido = sessionStorage.getItem("apelidoUser");
    const email = sessionStorage.getItem("email");

    if (apelido) {
      setIsAlunoLoggedIn(true);
    }
    if (email) {
      setIsProfessorLoggedIn(true);
    }

    api.get(`/turmas/buscar-turma-por-id/${turmaBuscada}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then((json) => {
      if (json.data === null) {
        toast.error("Não foi possível encontrar a turma!");
      } else {
        console.log(json.data);
        setTurmaData(json.data);
        setEstudantes(json.data.alunos);
      }
    }).catch((error) => {
      console.log(error)
    });
  }, [turmaBuscada]);

  if (!turmaData) {
    return null; 
  }

  console.log(estudantes);

  return (
    <div className='body'>
      <Header
        logo={Logo}
        statusLogoff={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
        statusLogin={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
        statusLoginAluno={isAlunoLoggedIn ? "true" : null}
        statusLoginProfessor={isProfessorLoggedIn ? "true" : null}
        statusEstrela={isAlunoLoggedIn ? "true" : null}
        statusSerie={isAlunoLoggedIn ? "true" : null}
        statusAvatar={isAlunoLoggedIn || isProfessorLoggedIn ? "true" : null}
        listaEstudantes={estudantes}
      />
      <div className='portalSala'>
        <FaixaTurma
          text={turmaData.nome}
          escolaridade={turmaData.fkEscolaridade.descricao}
          codigo={turmaData.senha}
          setVisibleComponent={setVisibleComponent}
          setSelectedNavegacao={setSelectedNavegacao}
          selectedNavegacao={selectedNavegacao}
        />
        <div className='telaPrincipal'>
          {visibleComponent === 'Conteudo' && <Conteudo />}
          {visibleComponent === 'Progresso' && <Progresso />}
          {visibleComponent === 'Estudantes' && <Estudantes />}
        </div>
      </div>
    </div>
  );
}

export default PortalSala;
