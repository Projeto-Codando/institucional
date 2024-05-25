import Header from '../../componentes/header/header'
import Card from '../../componentes/card/card'
import VideoPlayer from '../../componentes/videoPlayer/videoPlayer'
import BannerComBotao from '../../componentes/bannerComBotao/bannerComBotao'
import Footer from '../../componentes/footer/footer.jsx'
import Faq from '../../componentes/faq/faq.jsx'
import imgProf from '../../imgs/prof_img.svg'
import imgAluno from '../../imgs/aluno_img.svg'
import macacoFofo from '../../imgs/MacacoFofo.svg'
import macacoOculos from '../../imgs/MacacoOculos.svg'
import controleImg from '../../imgs/Controle.svg'
import CardComIMG from '../../componentes/cardComImagem/cardComImagem'
import './siteInstitucional.css'
import { SobreProjeto } from '../../componentes/sobreProjeto/sobreProjeto.js'



function SiteInstitucional(){
  return(
    <div className="siteInstitucional">
      <Header className='container' />
      <BannerComBotao className='container' />
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
      <div className='section-cards container'>
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
          descricao='Descubra como pode ser divertido ensinar programação de computadores!
          O currículo de codificação Codando promove o desenvolvimento de habilidades de
          funcionamento executivo, como resolução de problemas e planejamento, bem como
          pensamento geométrico e matemático.'
          statusBotao="false"
        />

        <CardComIMG
          img={imgAluno}
          alt="Imagem aluno estudando no seu notebook"
          titulo='Alunos'
          descricao='Com a abordagem de gamificação da Codando, o aluno se mantém engajado enquanto aprende,
          encontrando diversão no processo de desenvolvimento de suas habilidades. Através dessa metodologia,
          ele é incentivado a explorar conceitos complexos de programação de uma maneira envolvente e cativante,
          tornando o aprendizado uma experiência dinâmica e divertida.'
          statusBotao="false"
        />
      </div>
      <div className='container' >
        <h1  style={{color: 'black', fontSize: '48px'}}>
        As crianças vão amar aprender a codificar
        </h1>
      </div>
      <div className='container section-valores'>
        <CardComIMG
          img={macacoFofo}
          color="black"
          backgroundColor="#FB6107"
          alt="Imagem 8-Bti de um macaco muito fofinho"
          titulo="Aprenda com cursos"
          descricao="Com o kit do professor e a equipe de suporte do Codando, qualquer pessoa pode ensinar o básico da lógica de programação."
        />
        <CardComIMG
          img={macacoOculos}
          color="black"
          backgroundColor="#662E9B"
          alt="Imagem 8-Bti de um macaco usando oculos e utilizando um notebook"
          titulo="Código de verdade"
          descricao="Os cursos do Codando ensinam codificação baseada em texto para que os alunos aprendam a programar como um desenvolvedor real."
        />
        <CardComIMG
          img={controleImg}
          color="black"
          backgroundColor="#7CB518"
          alt="Imagem 8-BIT de um macaco muito fofinho"
          titulo="Gameficação"
          descricao="As crianças aprendem a programar em um ambiente envolvente e gratificante, com elementos de jogos que tornam a experiência educacional estimulante."
        />
      </div>
      <SobreProjeto/>
      <Faq/>
      <Footer />
    </div>

  )
}

export default SiteInstitucional;

