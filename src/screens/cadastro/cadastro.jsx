/* eslint-disable no-restricted-globals */
import './cadastro.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Formulario from "../../componentes/formularios/formularioCadastro";
import api from '../../api';

function Cadastro(){
  let navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [apelido, setApelido] = useState("")
  const [senhaTurma, setSenhaTurma] = useState("")
  const [senha, setSenha] = useState("")

  const handleSavePost = (event) => {
    event.preventDefault();
    alert("Clicou no botão")
    const objetoAdicionado = {
        nome,
        sobrenome,
        apelido,
        senhaTurma,
        senha,
        "status": "ativo"
    }
    api.post(`/alunos`, objetoAdicionado, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then((json) => {
        toast.success("Login efetuado com sucesso")
        sessionStorage.setItem("token", json.data.token)
        console.info("A requisição foi um sucesso")
        navigate("/")
    }).catch(() => {
        toast.error("Ocorreu um erro ao tentar realizar o login, por favor, tente novamente.");
    })
  }

  return(
    <div>
      <Header />

      <section className='sectionBackgroundCadastro' >
            <div className='buttom-voltar'>
                <button> &lt; Voltar </button>
            </div>
            <div className='container-background-cadastro' >

                <Formulario onClick={handleSavePost} setNome={setNome} setSobrenome={setSobrenome} setApelido={setApelido} setSenhaTurma={setSenhaTurma} setSenha={setSenha}/>

            </div>
        </section >

    </div>

  )
}

export default Cadastro;
