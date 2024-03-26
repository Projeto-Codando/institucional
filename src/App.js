import './App.css'
import './componentes/botao/botoes'
import './componentes/header/header'
import Header from './componentes/header/header'
import Card from './componentes/card/card'
import VideoPlayer from './componentes/videoPlayer/videoPlayer'
import BannerComBotao from './componentes/bannerComBotao/bannerComBotao'
import imgProf from './imgs/prof_img.svg'
import imgAluno from './imgs/aluno_img.svg'
import CardComIMG from './componentes/cardComImagem/cardComImagem'


function App() {
  return (
    <div className="App">
      <Header />
      <BannerComBotao />
      <h1 style={{ color: "#662E9B", fontSize: '48px' }}>Escreva o codigo!</h1>
      <div className='section escreva-codigo'>
        <div className='lado-esquerdo-section'>
          <Card text="Desbloquear o potencial de cada aluno, tornando o aprendizado de lógica de programação acessível,
           envolvente e inspirador, promovendo uma revolução na forma como a tecnologia é incorporada à educação."
            configCard={{
              backgroundColor: '#662E9B',
              padding: '3vw',
              width: '18vw',
              color: 'white'
            }} />
        </div>
        <div className='lado-direito-section video-container'>
          <VideoPlayer width='60%' height='60%' />
        </div>
      </div>
      <div className='section-cards'>
        <CardComIMG style={{
          overflow: 'hidden',
          height: '300px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
        img={imgProf}
        alt="Imagem professor ensinando os alunos"
        titulo='Professores'
        descricao='Descubra como pode ser divertido ensinar programação de computadores! O currículo de codificação Codando promove o desenvolvimento de habilidades de funcionamento executivo, como resolução de problemas e planejamento, bem como pensamento geométrico e matemático.'
           />
        <CardComIMG
          img={imgAluno}
          alt="Imagem aluno estudando no seu notebook"
          titulo='Alunos'
          descricao='Com a abordagem de gamificação da Codando, o aluno se mantém engajado enquanto aprende, encontrando diversão no processo de desenvolvimento de suas habilidades. Através dessa metodologia, ele é incentivado a explorar conceitos complexos de programação de uma maneira envolvente e cativante, tornando o aprendizado uma experiência dinâmica e divertida.'
        />
      </div>
    </div>
  )
}

export default App
