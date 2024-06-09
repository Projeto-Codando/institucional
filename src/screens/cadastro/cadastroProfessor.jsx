/* eslint-disable no-restricted-globals */
import './cadastro.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Formulario from "../../componentes/formularios/formularioCadastroProfessor";
import api from '../../api';
import Logo from "../../imgs/Logo.svg";
import * as Yup from 'yup';

function CadastroProfessor() {
  let navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senhaTurma, setSenhaTurma] = useState("")
  const [senha, setSenha] = useState("")

  const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);

    useEffect(() => {

        const apelido = sessionStorage.getItem("apelidoUser");
        const email = sessionStorage.getItem("email");

        if (apelido) {
            setIsAlunoLoggedIn(true);
        }
        if (email) {
            setIsProfessorLoggedIn(true);
        }

    }, []);


  const validadionSchema = Yup.object().shape({
    nome: Yup.string('Nome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Nome inválido').required('Todos os campos devem estar preenchidos'),
    email: Yup.string('E-mail invalido').email('E-mail invalido').required('Todos os campos devem estar preenchidos'),
    sobrenome: Yup.string('Sobrenome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Sobrenome inválido').required('Todos os campos devem estar preenchidos'),
    senha: Yup.string().required('Todos os campos devem estar preenchidos').min(8, 'Insira 8 ou mais caractéres')
  });

  const handleSavePost = async (event) => {
    event.preventDefault();
    const objetoAdicionado = {
      nome,
      sobrenome,
      email,
      senhaTurma,
      senha,
      "status": "ativo"
    }

    try {
      await validadionSchema.validate(objetoAdicionado, { abortEarly: false });
      console.log("Dados válidos:", objetoAdicionado);

      api.post(`/educadores`, objetoAdicionado, {
      })
        .then((json) => {
          toast.success("Cadastro realizado com sucesso!")
          sessionStorage.setItem("token", json.data.token)
          console.info("A requisição foi um sucesso")
          navigate("/loginProfessor")
        }).catch(() => {
          console.log("Ocorreu um erro ao tentar realizar o login, por favor, tente novamente.");
        })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.error("Erros de validação:");
        error.inner.forEach((err) => {
          console.error(err.message);
          toast.error(err.message);
        });
      }
    }

  }

  return (
    <div>
      <Header
        logo={Logo}
        justifyContent="center"
        statusBotao1={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
        statusLogoff={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
      />

      <section className='sectionBackgroundCadastroProfessor' >
        <div className='buttom-voltar'>
          <button onClick={() => navigate("/")}> &lt; VOLTAR </button>
        </div>
        <div className='container-background-cadastro' >

          <Formulario onClick={handleSavePost} setNome={setNome} setSobrenome={setSobrenome} setEmail={setEmail} setSenha={setSenha} />

        </div>
      </section >

    </div>

  )
}

export default CadastroProfessor;
