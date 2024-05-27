/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import FormularioLogin from "../../componentes/formularios/formularioLogin";
import Header from "../../componentes/headerLoginCadastro/headerLogin";
import './login.css'
import Logo from "../../imgs/Logo.svg";
import * as Yup from 'yup';

function Login() {
    let navigate = useNavigate()
    const [apelido, setApelido] = useState("")
    const [senha, setSenha] = useState("")

    const validadionSchema = Yup.object().shape({
        apelido: Yup.string('Apelido inválido').required('Todos os campos devem estar preenchidos'),
        senha: Yup.string().required('Todos os campos devem estar preenchidos').min(8, 'Insira 8 ou mais caractéres')
    });

    const handleSave = async (event) => {
        event.preventDefault();
    
        const objetoAdicionado = {
            apelido,
            senha
        }
        try {
            await validadionSchema.validate(objetoAdicionado, {     abortEarly: false });
            console.log("Dados válidos:", objetoAdicionado);

            api.post(`/alunos/login`, objetoAdicionado)
                .then((json) => {
                    toast.success("Login efetuado com sucesso")
                    sessionStorage.setItem("token", json.data.token)
                    navigate("/lobby")
                }).catch(() => {
                    toast.error("Não possui cadastro na plataforma!");
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
