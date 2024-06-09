import './faixaTurma.css';
import Navegacao from '../turmaNavegacao/turmaNavegacao';

export default function FaixaTurma(props) {
    const handleNavegacaoClick = (component) => {
        props.setVisibleComponent(component);
        props.setSelectedNavegacao(component);
    };

    return (
        <div className='faixaTurma'>
            <div className='faixaEsquerda'>
                <h1>Turma {props.text}</h1>
                <div className='turmaNavegacoes'>
                    <Navegacao
                        text='Progresso'
                        onClick={() => handleNavegacaoClick('Progresso')}
                        isSelected={props.selectedNavegacao === 'Progresso'}
                    />
                    <Navegacao
                        text='Conteúdo'
                        onClick={() => handleNavegacaoClick('Conteudo')}
                        isSelected={props.selectedNavegacao === 'Conteudo'}
                    />
                    <Navegacao
                        text='Estudantes'
                        onClick={() => handleNavegacaoClick('Estudantes')}
                        isSelected={props.selectedNavegacao === 'Estudantes'}
                    />
                </div>
            </div>
            <div className='faixaDireita'>
                <div className='infoSala'>
                    <p>Escolaridade</p>
                    <p style={{ fontWeight: 'bolder' }}>{props.escolaridade}</p>
                </div>
                <div className='infoSala'>
                    <p>Código</p>
                    <p style={{ fontWeight: 'bolder' }}>{props.codigo}</p>
                </div>
            </div>
        </div>
    );
}
