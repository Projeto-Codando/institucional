/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import FormularioLoginProfessor from "../../componentes/formularios/formularioLoginProfessor";
import Header from "../../componentes/header/header";
import './login.css'

function LoginProfessor() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleSave = () => {
        event.preventDefault();
        console.log(email, senha + "Teste usuarios")
        alert("Clicou no botão")
        const objetoAdicionado = {
            email,
            senha
        }
        api.post(`/professores/login`, objetoAdicionado)
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
            <Header />
            <section className='sectionBackgroundLoginProfessor' >
                <div className='buttom-voltar'>
                    <button> &lt; Voltar </button>
                </div>
                <div className='container-backgroundProfessor' >
                <FormularioLoginProfessor setEmail={setEmail} setSenha={setSenha} onClick={handleSave} />
                </div>
            </section >
        </div>
    )
}

export default LoginProfessor;
