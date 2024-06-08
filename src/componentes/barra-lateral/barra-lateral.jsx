import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './barra-lateral.css';
import MenuAmarelo from '../../imgs/menuAmarelo.png';
import LogoC from '../../imgs/Logo-C.svg';
import IconHome from '../../imgs/IconHome.png';
import IconBox from '../../imgs/IconBox.png';
import IconFaq from '../../imgs/IconInfo.png';
import IconUser from '../../imgs/IconUser.png';
import IconPay from '../../imgs/IconPlay.png';
import IconGlobe from '../../imgs/IconGlobe.png';
import IconQuestion from '../../imgs/IconQuestion.png';
import AvatarZebra from '../../imgs/avatarAlunoZebra.png';
import IconClip from '../../imgs/IconClip.png';
import IconPasta from '../../imgs/IconPasta.png';
import IconUsers from '../../imgs/IconUsers.png';
import { useNavigate } from 'react-router-dom';
import ModalEscolhaAvatar from '../modalEscolhaAvatar/modalEscolhaAvatar';

function BarraLateral(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function changeStateBar() {
        setOpen(!open);
    }

    console.log('Rendering BarraLateral', { isModalOpen, open });

    return (
        <div>
            <div className="menu-icon" style={{ width: '150px', display: 'flex' }}>
                <FontAwesomeIcon icon={faBars} onClick={changeStateBar} className='text-cor-roxa' />
            </div>
            <div className={`section-barra-lateral ${open ? 'aberto' : ''}`}>
                <div className={`barra-lateral ${open ? 'aberto' : ''}`} style={{ opacity: open ? 1 : 0 }}>
                    <div className='container-menu'>
                        <img src={MenuAmarelo} alt="menu" onClick={changeStateBar} className='botao-fechar' />
                        <img src={LogoC} alt="logo c" className='logoC' />
                    </div>
                    {props.logoff && (
                        <div>
                            <div className='row' style={{ marginTop: '50px' }}>
                                <img src={IconHome} alt="Home" />
                                <span>Inicio</span>
                            </div>
                            <div className='row' onClick={openModal}>
                                <img src={IconBox} alt="Planos" />
                                <span>Planos</span>
                            </div>
                            <ModalEscolhaAvatar 
                                isOpen={isModalOpen} 
                                onClose={closeModal} />
                            <div className='row'>
                                <img src={IconFaq} alt="F.A.Q" />
                                <span>F.A.Q</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRow'>
                                <button className='botaoLogin' onClick={() => navigate("/login")}>
                                    <img src={IconUser} alt="icone usuario" />Fazer login
                                </button>
                            </div>
                        </div>
                    )}
                    {props.login && (
                        <div>
                            <div className='row' style={{ marginTop: '50px' }}>
                                <img src={IconHome} alt="Home" />
                                <span>Inicio</span>
                            </div>
                            <div className='row'>
                                <img src={IconBox} alt="Banana" />
                                <span>Banana Points</span>
                            </div>
                            <div className='row'>
                                <img src={IconUser} alt="Perfil" />
                                <span>Perfil</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRowTitulo'>
                                <span className='nameCodando'>Codando</span>
                            </div>
                        </div>
                    )}
                    {props.loginAluno && (
                        <div>
                            <div className='row'>
                                <img src={IconPay} alt="Play" />
                                <span>Continuar jogo</span>
                            </div>
                            <div className='row'>
                                <img src={IconGlobe} alt="Globe" />
                                <span>Mapa</span>
                            </div>
                            <div className='row'>
                                <img src={IconQuestion} alt="Question" />
                                <span>Ajuda</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRowTitulo'>
                                <span className='nameCodando'>Colegas</span>
                            </div>
                        </div>
                    )}
                    {props.loginProfessor && (
                        <div>
                            <div className='row'>
                                <img src={IconUsers} alt="Users" />
                                <span>Turmas</span>
                            </div>
                            <div className='row'>
                                <img src={IconClip} alt="Clip" />
                                <span>Turmas Arquivadas</span>
                            </div>
                            <div className='row'>
                                <img src={IconPasta} alt="Pasta" />
                                <span>Meus Projetos</span>
                            </div>
                            <div className='row'>
                                <img src={IconQuestion} alt="Question" />
                                <span>Ajuda</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRowTitulo'>
                                <span className='nameCodando'>Estudantes</span>
                            </div>
                        </div>
                    )}
                    {props.login && (
                        <div className='containerScroll'>
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className='rowAluno'>
                                    <img src={AvatarZebra} alt="avatar do aluno" />
                                    <span>Nome Aluno</span>
                                    <div className='statusAluno'></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BarraLateral;
