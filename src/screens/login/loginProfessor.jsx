/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import FormularioLoginProfessor from "../../componentes/formularios/formularioLoginProfessor";
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import Logo from "../../imgs/Logo.svg";
import * as Yup from 'yup';
import './login.css'
import Jogo from '../jogo/jogo'

function LoginProfessor() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const validadionSchema = Yup.object().shape({
        email: Yup.string('E-mail invalido').email('E-mail invalido').required('Todos os campos devem estar preenchidos'),
        senha: Yup.string().required('Todos os campos devem estar preenchidos').min(8, 'Insira 8 ou mais caractéres')
    });

    const handleSave = async (event) => {
        event.preventDefault();
        console.log(email, senha + "Teste usuarios")
        const objetoAdicionado = {
            email,
            senha
        }

        try {
            await validadionSchema.validate(objetoAdicionado, { abortEarly: false });
            console.log("Dados válidos:", objetoAdicionado);

            api.post(`/educadores/login`, objetoAdicionado)
                .then((json) => {
                    toast.success("Login realizado com sucesso")
                    sessionStorage.clear();
                    console.log(json.data);
                    sessionStorage.setItem("token", json.data.token)
                    sessionStorage.setItem("userId", json.data.userId)
                    sessionStorage.setItem("email", json.data.email)
                    sessionStorage.setItem("nome", json.data.nome)
                    navigate("/portal")
                }).catch(() => {
                    toast.error("Ocorreu um erro ao tentar realizar o login, por favor, tente novamente.");
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
                statusBotao2="true"
                logo={Logo}
                justifyContent="center"
            />
            <section className='sectionBackgroundLoginProfessor' >
                <div className='buttom-voltar'>
                    <button onClick={() => navigate("/")}> &lt; Voltar </button>
                </div>
                <div className='container-backgroundProfessor' >
                    <FormularioLoginProfessor setEmail={setEmail} setSenha={setSenha} onClick={handleSave} />
                </div>
            </section >
        </div>
    )
}

export default LoginProfessor;
