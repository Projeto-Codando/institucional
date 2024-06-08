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

sessionStorage.setItem("ImagemURL_AVATAR", "https://previews.dropbox.com/p/thumb/ACQrgeBBcui9gljnEFhmCTgAXZbSMILhpwZmjNgKRXnTMwDJ9qlA6mQBF0G9ZJVpWu6xiQ3QGzryGAj9uUdXrqGklSeUamwWjddiMPqmW4o33M_rNz-EeiiDnoDPXmn2wYutrh9rJP7SdC3GDJoQOWwDkkLsi-bxZ57tyLw473qgZiQJY40h6GeuAaFihrvPS_8rNypaMFi7pp8rA1V691XudMtN5AhYw05xuMd178c3eDXGPklR3LM7cf1V5owUWdlyCv4g_n6hSKQWRmjR3NmSDjcgmoc4fzBjJ3yly4UdbIrNRWqd8Se7w--7NNSn2X2PB34I5RqoG8QrcT6SR4ac/p.png")

function PortalSala() {
  const [turmaData, setTurmaData] = useState(null);
  const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
  const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
  const [estudantes, setEstudantes] = useState([]);
  const [turmaBuscada, setTurmaBuscada] = useState(sessionStorage.getItem('idTurmaClicada'));

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
        setTurmaData(json.data);
        setEstudantes(json.data.alunos);
      }
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  if (!turmaData) {
    return null; 
  }

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
        />
        <div className='telaPrincipal'>
          <Conteudo
          idTurma={turmaBuscada}
          />
        </div>
      </div>
    </div>
  );
}

export default PortalSala;