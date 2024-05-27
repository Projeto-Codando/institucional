/* eslint-disable no-restricted-globals */
import './cadastro.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Formulario from "../../componentes/formularios/formularioCadastroProfessor";
import api from '../../api';

function CadastroProfessor(){
  let navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senhaTurma, setSenhaTurma] = useState("")
  const [senha, setSenha] = useState("")

  const handleSavePost = (event) => {
    event.preventDefault();
    alert("Clicou no botão")
    const objetoAdicionado = {
        nome,
        sobrenome,
        email,
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

      <section className='sectionBackgroundCadastroProfessor' >
            <div className='buttom-voltar'>
                <button> &lt; Voltar </button>
            </div>
            <div className='container-background-cadastro' >

                <Formulario onClick={handleSavePost} setNome={setNome} setSobrenome={setSobrenome} setEmail={setEmail} setSenha={setSenha}/>

            </div>
        </section >

    </div>

  )
}

export default CadastroProfessor;
