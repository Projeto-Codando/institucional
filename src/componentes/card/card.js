import './card.css'
function Card(props){

    const cardStyle = {
        backgroundColor: props.configCard.backgroundColor,
        padding: props.configCard.padding,
        width: props.configCard.width,
        color: props.configCard.color,
      };

    return (
        <p className='card' style={cardStyle}>
            {props.text}
          </p>
    )
}

export default Card;