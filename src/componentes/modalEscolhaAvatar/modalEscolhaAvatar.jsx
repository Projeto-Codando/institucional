import './modalEscolhaAvatar.css';
import Close from '../../imgs/botao-close.png';
import Avatar from '../../imgs/avatar-gato.png';
import Botao from '../../componentes/botao/botoes';

function ModalEscolhaAvatar({ isOpen, onClose }) {
    if (isOpen) {
        return (
            <div className='section-avatar'>
                <div className='container-avatar'>
                    <div className='card-avatar'>
                        <div className='linha-avatar'>
                            <div className='titulo-avatar'>
                                <span>Escolha o Avatar!</span>
                            </div>
                            <img src={Close} alt="botao fechar" onClick={onClose} style={{cursor:'pointer'}}/>
                        </div>
                        <div className='linha-avatar'>
                            <div className='imagem-avatar'>
                                <img src={Avatar} alt="avatar" />
                            </div>
                            <div className='avatares'>
                                {/* Avatares */}
                                {[...Array(26)].map((_, index) => (
                                    <div key={index} className='avatar'></div>
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

                                />
                                <Botao
                                    backgroundColor='#FB6107'
                                    cor='#FFF'
                                    texto='Cancelar'
                                    padding='5px'
                                    width='150px'
                                    border='white 1px solid'
                                    fontSize='22px'

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalEscolhaAvatar;