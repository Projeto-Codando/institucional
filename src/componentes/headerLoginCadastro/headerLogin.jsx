import './headerLogin.css'

import Botao from '../botao/botoes.js'
import BarraLateral from '../barra-lateral/barra-lateral'
import Estrela from '../../imgs/estrela.png'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Avatar from '../../imgs/img-avatar.png'

export default function HeaderLogin(props) {

    const [escolaridade, setEscolaridade] = useState("")
    const [moedas, setMoedas] = useState(0)
    const [avatar, setAvatar] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const handleStorageChange = () => {
          const escolaridade = sessionStorage.getItem("escolaridade");
          const moedas = sessionStorage.getItem("moedas");
          const avatar = sessionStorage.getItem("ImagemURL_AVATAR");
          setEscolaridade(escolaridade);
          setAvatar(avatar);
          setMoedas(moedas);
        };

        handleStorageChange();

        window.addEventListener("storage", handleStorageChange);

        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

    return (
        <header className="headerLogin">
            <BarraLateral 
            logoff={props.statusLogoff}
            loginAluno={props.statusLoginAluno}
            loginProfessor={props.statusLoginProfessor}
            login={props.statusLogin}
            listaAlunos={props.listaAlunos}
            listaEstudantes={props.listaEstudantes}
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
                    <div className='avatar'>
                        <img src={avatar || Avatar} alt="imagem do avatar" style={{width: "59px", height: "59px"}}/>
                    </div>
                )}
            </div>
        </header>

    )
}
