/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import FormularioLogin from "../../componentes/formularios/formularioLogin";
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import './login.css'
import Logo from "../../imgs/Logo.svg"


function Login() {
    let navigate = useNavigate()
    const [apelido, setApelido] = useState("")
    const [senha, setSenha] = useState("")

    const handleSave = () => {
        event.preventDefault();
        console.log(apelido, senha + "Teste usuarios")
        alert("Clicou no botão")
        const objetoAdicionado = {
            apelido,
            senha
        }
        api.post(`/alunos/login`, objetoAdicionado)
        .then((json) => {
            toast.success("Login efetuado com sucesso")
            sessionStorage.setItem("token", json.data.token)
            navigate("/")
        }).catch(() => {
            toast.error("Ocorreu um erro ao tentar realizar o login, por favor, tente novamente.");
        })
    }

    return (
        <div>
            <Header 
               statusBotao2="true"
               logo={Logo}
               justifyContent="center"
            />
            <section className='sectionBackgroundLogin' >
                <div className='buttom-voltar'>
                    <button onClick={() => navigate("/")}> &lt; Voltar </button>
                </div>
                <div className='container-background' >
                <FormularioLogin setApelido={setApelido} setSenha={setSenha} onClick={handleSave} />
                </div>
            </section >
        </div>
    )
}

export default Login;
