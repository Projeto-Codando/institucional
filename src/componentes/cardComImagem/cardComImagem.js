import Botao from '../botao/botoes.js'
import './cardComImagem.css'


function CardComIMG(props) {
    return (
        <div className="cardComImg" style={{
            justifyContent: 'space-around'
        }}>
            <div className="imagemCard" style={{borderRadius: '360px'}}>
                <img src={props.img} alt={props.alt}/>
            </div>
            <div style={{
                overflow: 'hidden',
            }}>
                <h1>{props.titulo}</h1>
                <p style={{
                    color:'white',
                    fontSize: '18px',
                }}>{props.descricao}</p>
            </div>
            <Botao 
            backgroundColor="#662E9B" 
            width="12vw" 
            height="8vh" 
            texto="Cadastre-se" 
            fontSize="20px"
            padding="20px"
            onClick={()=>{
                window.location.href = "cadastro.html"
            }}/>
        </div>
    )
}

export default CardComIMG;