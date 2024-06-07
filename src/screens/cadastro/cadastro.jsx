/* eslint-disable no-restricted-globals */
import './cadastro.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../imgs/Logo.svg"
import { toast } from 'react-toastify';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Formulario from "../../componentes/formularios/formularioCadastro";
import api from '../../api';
import * as Yup from 'yup';

function Cadastro() {
  let navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [apelido, setApelido] = useState("")
  const [senhaTurma, setSenhaTurma] = useState("")
  const [senha, setSenha] = useState("")

  const validadionSchema = Yup.object().shape({
    nome: Yup.string('Nome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Nome inválido').required('Todos os campos devem estar preenchidos'),
    sobrenome: Yup.string('Sobrenome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Sobrenome inválido').required('Todos os campos devem estar preenchidos'),
    apelido: Yup.string('Apelido inválido').required('Todos os campos devem estar preenchidos'),
    senha: Yup.string().required('Todos os campos devem estar preenchidos').min(8, 'Insira 8 ou mais caractéres')
  });

  const handleSavePost = async (event) => {
    event.preventDefault();
    console.log("Clicou no botão");

    const objetoAdicionado = {
      nome,
      sobrenome,
      apelido,
      senhaTurma,
      senha,
      "status": "ativo"
    }

    try {
      await validadionSchema.validate(objetoAdicionado, { abortEarly: false });
      console.log("Dados válidos:", objetoAdicionado);

      api.post(`/alunos`, objetoAdicionado)
        .then((json) => {
          console.log(json)
          toast.success("Cadastro realizado com sucesso!")
          sessionStorage.setItem("token", json.data.token)
  
          navigate("/login") // Adicionar rota lobby
        }).catch(() => {
          console.log("Ocorreu um erro no seu cadastro!");
        });

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
        statusBotao1="true"
        logo={Logo}
        justifyContent="center"
      />

      <section className='sectionBackgroundCadastro' >
        <div className='buttom-voltar'>
          <button onClick={() => navigate("/")}> &lt; Voltar </button>
        </div>
        <div className='container-background-cadastro'>
          <Formulario onClick={handleSavePost} setNome={setNome} setSobrenome={setSobrenome} setApelido={setApelido} setSenhaTurma={setSenhaTurma} setSenha={setSenha} />
        </div>
      </section >

    </div>

  )
}

export default Cadastro;
