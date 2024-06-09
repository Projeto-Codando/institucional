import './modalEscolhaAvatar.css';
import Close from '../../imgs/botao-close.png';
import Avatar from '../../imgs/avatar-gato.png';
import Botao from '../../componentes/botao/botoes';
import { useState, useContext } from 'react';
import { AvatarContext } from '../../componentes/modalEscolhaAvatar/avatarContext';
import api from '../../api';
import { toast } from 'react-toastify';

function ModalEscolhaAvatar({ isOpen, onClose, onAvatarChange }) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [nomeAvatar, setNomeAvatar] = useState("Avatar");
    const avatares = useContext(AvatarContext);
    const [atualizarAvatar, setAtualizarAvatar] = useState();

    if (!isOpen) {
        return null;
    }

    const handleSave = async () => {
        const idAluno = sessionStorage.getItem("userId");
        const selectedAvatarData = avatares.find(avatar => avatar.imagemURL === selectedAvatar);

        if (selectedAvatarData) {
            const idAvatar = selectedAvatarData.id;

            try {
                const response = await api.put(`avatares/aluno/${idAluno}/avatar-escolhido/${idAvatar}`, {}, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                console.log(response);
                sessionStorage.setItem('idAvatar', idAvatar);
                sessionStorage.setItem('ImagemURL_AVATAR', selectedAvatar);
                window.location.reload();
                setAtualizarAvatar(onAvatarChange)
                toast.success("Avatar alterado com sucesso!");
                onClose();
            } catch (error) {
                toast.error("Não foi possível alterar o avatar! " + (error.response?.data?.message || ''));
            }
        }
    };


    return (
        <div className='section-avatar'>
            <div className='container-avatar'>
                <div className='card-avatar'>
                    <div className='linha-avatar'>
                        <div className='titulo-avatar'>
                            <span>Escolha o Avatar!</span>
                        </div>
                        <img src={Close} alt="botao fechar" onClick={onClose} style={{cursor: 'pointer'}} />
                    </div>
                    <div className='linha-avatar'>
                        <div className='imagem-avatar'>
                            <img src={selectedAvatar || Avatar} alt="avatar" style={{ borderRadius: '360px' }} />
                            <div className='texto-avatar'>{nomeAvatar}</div>
                        </div>
                        <div className='avatares'>
                            {avatares && avatares.map((avatar, index) => (
                                <img
                                    src={avatar.imagemURL}
                                    alt=""
                                    key={index}
                                    className='avatar'
                                    onClick={() => {
                                        setSelectedAvatar(avatar.imagemURL);
                                        setNomeAvatar(avatar.descricao);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='linha-botao'>
                        <div className='container-botao'>
                            <Botao
                                backgroundColor='#FB6107'
                                cor='#FFF'
                                texto='Salvar'
                                padding='5px'
                                width='150px'
                                border='white 1px solid'
                                fontSize='22px'
                                onClick={handleSave}
                            />
                            <Botao
                                backgroundColor='#FB6107'
                                cor='#FFF'
                                texto='Cancelar'
                                padding='5px'
                                width='150px'
                                border='white 1px solid'
                                fontSize='22px'
                                onClick={onClose}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEscolhaAvatar;
