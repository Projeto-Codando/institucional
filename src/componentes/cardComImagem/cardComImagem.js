import Botao from '../botao/botoes.js'
import './cardComImagem.css'


function CardComIMG(props) {
    return (
        <div className="cardComImg" style={{
            justifyContent: 'space-evenly',
        }}>
            <div className="imagemCard" style={{borderRadius: '360px', backgroundColor: props.backgroundColor}}>
                <img src={props.img} alt={props.alt}/>
            </div>
            <div style={{
                overflow: 'hidden',
            }}>
                <h1 style={{
                    color: props.color || 'white',
                }}>{props.titulo}</h1>
                <p style={{
                    color: props.color || 'white',
                    fontSize: '18px',
                }}>{props.descricao}</p>
            </div>
            {props.showButton && (
                <Botao
                    backgroundColor='#662E9B'
                    width="12vw"
                    height="8vh"
                    texto="Cadastre-se"
                    fontSize="20px"
                    padding="20px"
                    onClick={() => {
                        window.location.href = "cadastro.html"
                    }}
                />
            )}
        </div>
    )
}


export default CardComIMG;
