import './turmaNavegacao.css';

export default function turmaNavegacao(props) {
    return (
        <div 
            className={`navegacao ${props.isSelected ? 'selected' : ''}`} 
            onClick={props.onClick}
        >
            <label>{props.text}</label>
        </div>
    );
}
