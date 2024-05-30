import './cardNivelJogo.css'

export default function cardNivelJogo(props) {
    return (
        <div>
            <div className='aulaCard' style={{
                backgroundColor: props.backgroundColor

            }}>
                {props.statusTitulo &&(
                <span>{props.titulo}</span>
                )}

                {props.statusImg && (
                    <img src={props.imagem} alt={props.altImg} />
                )}
            </div>
        </div>
    )

}