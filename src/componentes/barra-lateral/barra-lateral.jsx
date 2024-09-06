import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './barra-lateral.css';
import BotaoClose from '../../imgs/closeButton.png';
import LogoC from '../../imgs/Logo-C.svg';
import IconHome from '../../imgs/IconHome.png';
import IconBox from '../../imgs/IconBox.png';
import IconFaq from '../../imgs/IconInfo.png';
import IconUser from '../../imgs/IconUser.png';
import IconPay from '../../imgs/IconPlay.png';
import IconGlobe from '../../imgs/IconGlobe.png';
import IconQuestion from '../../imgs/IconQuestion.png';
import IconClip from '../../imgs/IconClip.png';
import IconUsers from '../../imgs/IconUsers.png';
import IconExit from '../../imgs/IconExit.png'
import { useNavigate } from 'react-router-dom';
import ModalEscolhaAvatar from '../modalEscolhaAvatar/modalEscolhaAvatar';
import ModalComprarAvatar from '../modalComprarAvatar/modalComprarAvatar';
import ModalAjuda from '../modalAjuda/modalAjuda';

const apelidoAluno = sessionStorage.getItem("apelidoUser");
const avatarGenerico = 'https://qxztjedmqxjnfloewgbv.supabase.co/storage/v1/object/public/macaco/chimpaZe_default.png'
function BarraLateral(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCompraOpen, setIsModalCompraOpen] = useState(false);
    const [isModalAjudaOpen, setIsModalAjudaOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModalCompra = () => {
        setIsModalCompraOpen(true);
    };

    const closeModalCompra = () => {
        setIsModalCompraOpen(false);
    };

    const openModalAjuda = () => {
        setIsModalAjudaOpen(true);
    };

    const closeModalAjuda = () => {
        setIsModalAjudaOpen(false);
        changeStateBar(open)
    };    

    function changeStateBar() {
        setOpen(!open);
    }

    return (
        <div>
            <div className="menu-icon" style={{ width: '150px', display: 'flex' }}>
                <FontAwesomeIcon icon={faBars} onClick={changeStateBar} className='text-cor-roxa' />
            </div>
            <div className={`section-barra-lateral ${open ? 'aberto' : ''}`}>
                <div className={`barra-lateral ${open ? 'aberto' : ''}`} style={{ opacity: open ? 1 : 0 }}>
                    <div className='container-menu'>
                        <img src={BotaoClose} alt="menu" onClick={changeStateBar} className='botao-fechar' />
                        <img src={LogoC} alt="logo c" className='logoC' />
                    </div>
                    {props.logoff && (
                        <div>
                            <div className='row' onClick={() => { navigate("/"); }} style={{ marginTop: '20px' }}>
                                <img src={IconHome} alt="Home" />
                                <span>Inicio</span>
                            </div>
                            <div className='row' onClick={() => navigate("/")}>
                                <img src={IconBox} alt="Planos" />
                                <span>Planos</span>
                            </div>

                            {/* <ModalEscolhaAvatar
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                onAvatarChange={props.onUpdateAvatar}
                            /> */}

                            <div className='row' onClick={() => navigate("/")}>
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
                            <div className='row' onClick={() => { navigate("/"); }} style={{ marginTop: '20px' }}>
                                <img src={IconHome} alt="Home" />
                                <span>Inicio</span>
                            </div>
                        </div>
                    )}
                    {props.loginAluno && (
                        <div>
                            <div className='row' onClick={openModalCompra}>
                                <img src={IconBox} alt="Banana" />
                                <span>Banana Points</span>
                            </div>
                            <ModalComprarAvatar
                                isOpen={isModalCompraOpen}
                                onClose={closeModalCompra}
                            />
                            <div className='row' onClick={openModal}>
                                <img src={IconUser} alt="Perfil" />
                                <span>Perfil</span>
                            </div>
                            <ModalEscolhaAvatar
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                listaAvatares={props.listaAvatares}
                            />
                            <div className='row' onClick={() => { 
                                navigate("/"); 
                                sessionStorage.clear(); 
                            }}>
                                <img src={IconExit} alt="Sair" />
                                <span>Sair</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRowTitulo'>
                                <span className='nameCodando'>Codando</span>
                            </div>
                            <div className='row'>
                                <img src={IconPay} alt="Play" />
                                <span>Continuar jogo</span>
                            </div>
                            <div className='row' onClick={() => { navigate("/lobby"); }}>
                                <img src={IconGlobe} alt="Globe" />
                                <span>Mapa</span>
                            </div>
                            <div className='row' onClick={openModalAjuda}>
                                <img src={IconQuestion} alt="Question" />
                                <span>Ajuda</span>
                            <ModalAjuda
                                isOpen={isModalAjudaOpen}
                                onClose={closeModalAjuda}
                            />
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            {props.statusAlunosAtivos && (
                                <div>
                                    <div className='containerRowTitulo'>
                                        <span className='nameCodando'>Colegas</span>
                                    </div>
                                    <div className='containerScroll' id="listaAlunosLogados">
                                        {Array.isArray(props.listaAlunos) && (
                                            props.listaAlunos
                                                .filter(aluno => aluno.apelido !== apelidoAluno)
                                                .map((aluno) => {
                                                    return (
                                                        <div className='rowAluno' key={aluno.id}>
                                                            <img src={aluno.avatar[0]?.imagemURL || avatarGenerico} style={{ width: '24px', height: '24px' }} alt="Avatar do Aluno" />
                                                            <span>@{aluno.apelido}</span>
                                                            <div className={'statusAluno' + aluno.status}></div>
                                                        </div>
                                                    );
                                                })
                                        )}
                                    </div>
                                </div>
                            )

                            }

                        </div>
                    )}
                    {props.loginProfessor && (
                        <div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            <div className='containerRowTitulo'>
                                <span className='nameCodando'>Codando</span>
                            </div>
                            <div className='row' onClick={() => { navigate("/portal"); }}>
                                <img src={IconUsers} alt="Users" />
                                <span>Turmas</span>
                            </div>
                            <div className='row' onClick={() => { navigate("/portal/arquivadas"); }}>
                                <img src={IconClip} alt="Clip" />
                                <span>Turmas Arquivadas</span>
                            </div>
                            <div className='row'>
                                <img src={IconQuestion} alt="Question" />
                                <span>Ajuda</span>
                            </div>
                            <div className='row' onClick={() => { 
                                navigate("/"); 
                                sessionStorage.clear(); 
                            }}>
                                <img src={IconExit} alt="Sair" />
                                <span>Sair</span>
                            </div>
                            <div className='containerRow'>
                                <div className='lineDivisoria'></div>
                            </div>
                            {props.statusAula && (
                                <div>
                                    <div className='containerRowTitulo'>
                                        <span className='nameCodando'>Estudantes</span>
                                    </div>
                                    <div className="containerScroll">
                                        {props.listaEstudantes && Array.isArray(props.listaEstudantes) && (
                                            props.listaEstudantes.map((estudante) => {
                                                return (
                                                    <div className='rowAluno' key={estudante.id}>
                                                        <img src={(estudante.avatar[0]?.imagemURL) || avatarGenerico} style={{ width: '24px', height: '24px' }} alt="Avatar do Aluno" />
                                                        <span>{estudante.nome + " " + estudante.sobrenome}</span>
                                                        <div className={'statusAluno' + estudante.status}></div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )
                            }


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BarraLateral;
