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
            api.post(`/alunos/login`, objetoAdicionado)
                .then((json) => {

                    sessionStorage.clear()
                    console.log(json.data)
                    toast.success("Login efetuado com sucesso")
                    sessionStorage.setItem("token", json.data.token)
                    sessionStorage.setItem("userId", json.data.userId)
                    sessionStorage.setItem("apelidoUser", json.data.apelido)
                    sessionStorage.setItem("nomeUser", json.data.nome)
                    sessionStorage.setItem("moedas", json.data.alunoListagemDTO.moedas)
                    sessionStorage.setItem("idTurma", json.data.alunoListagemDTO.idTurma)
                    sessionStorage.setItem("ImagemURL_AVATAR", json.data.alunoListagemDTO.avatares[json.data.alunoListagemDTO.idAvatar].imagemURL)

                    api.get(`/turmas/buscar-turma-por-id/${sessionStorage.getItem("idTurma")}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }).then((json) => {
                        sessionStorage.setItem("escolaridade", json.data.fkEscolaridade.descricao)
                        sessionStorage.setItem("nomeTurma", json.data.nome)
                        sessionStorage.setItem("senhaTurma", json.data.senha)
                        navigate("/lobby")
                    }).catch(() => {
                        toast.error("Não foi possível encontrar a turma!");
                    })

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
