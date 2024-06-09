/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
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

    const [isAlunoLoggedIn, setIsAlunoLoggedIn] = useState(false);
    const [isProfessorLoggedIn, setIsProfessorLoggedIn] = useState(false);
    const [listaAvatares, setListaAvatares] = useState([])

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
            await validadionSchema.validate(objetoAdicionado, { abortEarly: false });
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
                    sessionStorage.setItem("ïdAvatar", json.data.alunoListagemDTO.idAvatar)
                    sessionStorage.setItem("avatares", JSON.stringify(json.data.alunoListagemDTO.avatares))

                    for (let i = 0; i < json.data.alunoListagemDTO.avatares.length; i++) {
                        if (json.data.alunoListagemDTO.avatares[i].idAvatar === json.data.alunoListagemDTO.idAvatar) {
                            sessionStorage.setItem("ImagemURL_AVATAR", json.data.alunoListagemDTO.avatares[i].imagemURL)
                        }
                    }

                    if(json.data.alunoListagemDTO.avatares.length === 0){
                        sessionStorage.setItem("ImagemURL_AVATAR", "https://previews.dropbox.com/p/thumb/ACQrgeBBcui9gljnEFhmCTgAXZbSMILhpwZmjNgKRXnTMwDJ9qlA6mQBF0G9ZJVpWu6xiQ3QGzryGAj9uUdXrqGklSeUamwWjddiMPqmW4o33M_rNz-EeiiDnoDPXmn2wYutrh9rJP7SdC3GDJoQOWwDkkLsi-bxZ57tyLw473qgZiQJY40h6GeuAaFihrvPS_8rNypaMFi7pp8rA1V691XudMtN5AhYw05xuMd178c3eDXGPklR3LM7cf1V5owUWdlyCv4g_n6hSKQWRmjR3NmSDjcgmoc4fzBjJ3yly4UdbIrNRWqd8Se7w--7NNSn2X2PB34I5RqoG8QrcT6SR4ac/p.png")
                    }

                    api.get(`/turmas/buscar-turma-por-id/${sessionStorage.getItem("idTurma")}`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }).then((json) => {
                        sessionStorage.setItem("escolaridade", json.data.fkEscolaridade.descricao)
                        sessionStorage.setItem("nomeTurma", json.data.nome)
                        sessionStorage.setItem("senhaTurma", json.data.senha)
                        navigate("/lobby")
                    }).catch((error) => {
                        console.log(error)
                        toast.error("Não foi possível encontrar a turma!");
                    })

                }).catch((error) => {
                    console.log(error)
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
                statusLogoff={isAlunoLoggedIn || isProfessorLoggedIn ? null : "true"}
                listaAvatares={setListaAvatares}
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
