import './headerLogin.css'
import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral'
import Estrela from '../../imgs/estrela.png'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ModalEscolhaAvatar from '../modalEscolhaAvatar/modalEscolhaAvatar.jsx'

export default function HeaderLogin(props) {

    const [escolaridade, setEscolaridade] = useState("")
    const [moedas, setMoedas] = useState(0)
    const [avatar, setAvatar] = useState()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const escolaridadeSession = sessionStorage.getItem("escolaridade");
    const moedasSession = sessionStorage.getItem("moedas");
    const avatarSession = 'https://qxztjedmqxjnfloewgbv.supabase.co/storage/v1/object/public/macaco/chimpaZe_default.png'
    const avatarUsuario = sessionStorage.getItem("ImagemURL_AVATAR")

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setEscolaridade(escolaridadeSession);

            if(!avatarUsuario){
                setAvatar(avatarSession);
            } else {
                setAvatar(avatarUsuario);
            }
            setMoedas(moedasSession);
        };

        handleStorageChange();

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [avatar, avatarSession, escolaridadeSession, moedasSession, avatarUsuario]);

    return (
        <header className="headerLogin">
            <BarraLateral
                logoff={props.statusLogoff}
                loginAluno={props.statusLoginAluno}
                loginProfessor={props.statusLoginProfessor}
                login={props.statusLogin}
                listaAlunos={props.listaAlunos}
                listaEstudantes={props.listaEstudantes}
                onUpdateAvatar={props.onUpdateAvatar}
                statusAula={props.statusAulaProfessor}
                statusAlunosAtivos={props.alunosAtivos}
            />
            <div className="logo">
                <img src={props.logo} alt="Logo codando" />
            </div>
            <div className="buttons" style={{
                justifyContent: props.justifyContent || "space-between"
            }}>
                {props.statusBotao1 && (
                    <div className="button">

                        <Botao backgroundColor='#662E9B'
                            width='8vw'
                            texto='Entrar'
                            padding='15px'
                            onClick={() => navigate("/login")}
                        />
                    </div>
                )}
                {props.statusBotao2 && (
                    <div className="button">

                        <Botao backgroundColor='#662E9B'
                            width='8vw'
                            texto='Cadastrar'
                            padding='15px'
                            onClick={() => navigate("/cadastro")}
                        />

                    </div>
                )}
                {props.statusEstrela && (
                    <div className='estrela'>
                        <img src={Estrela} alt="imagem estrela" />
                        <span>{moedas}</span>
                    </div>
                )}
                {props.statusSerie && (
                    <div className='serie'>
                        <span>{escolaridade}</span>
                    </div>
                )}
                {props.statusAvatar && (
                    <div className='avatar' onClick={props.statusLoginProfessor ? undefined : openModal}>
                        <img src={avatar} alt="imagem do avatar" style={{ width: "59px", height: "59px" }} />
                    </div>
                )}
                <ModalEscolhaAvatar
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        </header>

    )
}
