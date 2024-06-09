import './modalEscolhaAvatar.css';
import Close from '../../imgs/botao-close.png';
import Avatar from '../../imgs/avatar-gato.png';
import Botao from '../../componentes/botao/botoes';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import LoadingSpinner from '../../componentes/loadingSpinner/loadingSpinner';

function ModalEscolhaAvatar({ isOpen, onClose, onAvatarChange }) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [nomeAvatar, setNomeAvatar] = useState("Avatar");

    const avatares = JSON.parse(sessionStorage.getItem("avatares"));

    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleSave = async () => {
        const idAluno = sessionStorage.getItem("userId");
        const selectedAvatarData = avatares.find(avatar => avatar.imagemURL === selectedAvatar);

        setIsLoading(true);

        console.log(selectedAvatarData)

        if (selectedAvatarData) {
            const idAvatar = selectedAvatarData.idAvatar || selectedAvatarData.id;

            try {
                await api.put(`avatares/aluno/${idAluno}/avatar-escolhido/${idAvatar}`, {}, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                sessionStorage.setItem('idAvatar', idAvatar);
                sessionStorage.setItem('ImagemURL_AVATAR', selectedAvatar);
                window.location.reload();
                setIsLoading(false);
                onAvatarChange();
                toast.success("Avatar alterado com sucesso!");
                onClose();
            } catch (error) {
                setIsLoading(false);
                console.error("Erro ao escolher avatar:", error);
            }
        } else {
            setIsLoading(false);
            toast.error("Avatar não selecionado ou inválido!");
        }
    };

    return (
        <div className='section-avatar'>
            {isLoading && <LoadingSpinner />}
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
