import Notebook from '../../imgs/Notebook.svg';
import MacacoFofoOculos from '../../imgs/macacooclinfofo.svg';
import SetaCurva from '../../imgs/seta-curva.png'
import './sobreProjeto.css';

export function SobreProjeto() {
    return (
        <div className="container sobre-projeto">

            <div className='section-sobre-projeto'>
                <h1>Sobre o projeto</h1>
                <div className='row-cards'>
                <div className='lado-esquerdo'>
                    <p>
                        Codando é uma empresa inovadora que visa transformar o ensino de lógica de programação para crianças de
                        escolas públicas, especificamente do Fundamental 2 (idade de 11 a 14 anos), por meio da gamificação. Nosso
                        principal objetivo é tornar o aprendizado de conceitos fundamentais de programação uma experiência envolvente,
                        motivadora e acessível a todos os alunos.
                    </p>
                    <img src={Notebook} alt="Notebook"
                        style=
                        {{
                            width: '50%',
                            height: '50%'
                        }} />
                </div>
                <img src={SetaCurva}
                    style={{
                        width: '180px',
                        height: '200px'
                    }}
                />
                <div className='lado-direito'>
                    <img src={MacacoFofoOculos} alt='Macaco fofinho usando oculos'
                        style={{
                            width: '50%',
                            height: '50%'
                        }} />
                    <p>
                        Com a crescente importância das habilidades digitais, a necessidade de um método educacional mais envolvente e
                        eficaz tornou-se crucial. Nosso projeto visa atender essa demanda, oferecendo uma abordagem abrangente de aprendizado
                        gamificado que permite aos alunos otimizarem seu desempenho, prevenindo-se de dificuldades na compreensão de conceitos
                        fundamentais de programação.
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}