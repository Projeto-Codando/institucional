import './modalComprarAvatar.css'
import Close from '../../imgs/botao-close.png'
import Avatar from '../../imgs/avatar-gato.png'
import Botao from '../../componentes/botao/botoes'
import { useContext, useState } from 'react'
import { AvatarContext } from '../../componentes/avatarContext/avatarContext'
import api from '../../api'
import { toast } from 'react-toastify'

function ModalCompraAvatar({ isOpen, onClose }) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [nomeAvatar, setNomeAvatar] = useState("Compre seu avatar!");
    const [precoAvatar, setPrecoAvatar] = useState(0);

    const avataresPossuidos = JSON.parse(sessionStorage.getItem("avatares"));

    const avatares = useContext(AvatarContext);

    const avataresParaComprar = avatares.filter(avatar =>
        !avataresPossuidos.some(avatarPossuido => avatarPossuido.idAvatar === avatar.id)
    );

    const handleBuyAvatar = async () => {
        const idAluno = sessionStorage.getItem("userId");
        const selectedAvatarData = avatares.find(avatar => avatar.imagemURL === selectedAvatar);

        console.log(selectedAvatarData)

        const idAvatarComprado = selectedAvatarData.id;

        api.put(`avatares/aluno/${idAluno}/avatar/${idAvatarComprado}`, {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((json) => {
            toast.success("Avatar comprado com sucesso!");
            const listaAvataresSession = JSON.parse(sessionStorage.getItem('avatares'));
            console.log("Lista de avatares session storage")
            console.log(listaAvataresSession)
            listaAvataresSession.push(selectedAvatarData);
            sessionStorage.setItem("avatares", JSON.stringify(listaAvataresSession));
            window.location.reload();
            onClose();
        }).catch((error) => {
            console.error("Erro ao comprar avatar:", error);
        }
        );
    };

        if (!isOpen) {
            return null;
        }

        return (
            <div className='section-avatar'>
                <div className='container-avatar'>
                    <div className='card-avatar'>
                        <div className='linha-avatar'>
                            <div className='titulo-avatar'>
                                <span>Loja de Avatares!</span>
                            </div>
                            <img src={Close} alt="botao fechar" onClick={onClose} />
                        </div>
                        <div className='linha-avatar'>
                            <div className='imagem-avatar'>
                                <img src={selectedAvatar || Avatar} alt="Avatar" style={{ borderRadius: '360px' }} />
                                <div className='texto-avatar'>{nomeAvatar}</div>
                                <div className='texto-preco-avatar'>{precoAvatar}</div>
                            </div>
                            <div className='avatares'>
                                {avataresParaComprar && avataresParaComprar.map((avatar) => (
                                    <img
                                        src={avatar.imagemURL}
                                        className='avatar'
                                        alt={avatar.descricao}
                                        onClick={() => {
                                            setSelectedAvatar(avatar.imagemURL);
                                            setNomeAvatar(avatar.descricao);
                                            setPrecoAvatar(avatar.preço);
                                        }
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='linha-botao'>
                            <div className='container-botao'>
                                <Botao
                                    backgroundColor='#FB6107'
                                    cor='#FFF'
                                    texto='Comprar'
                                    padding='5px'
                                    width='150px'
                                    border='white 1px solid'
                                    fontSize='22px'
                                    onClick={handleBuyAvatar}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default ModalCompraAvatar;
