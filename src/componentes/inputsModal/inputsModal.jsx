import './inputsModal.css'

export default function InputsModal(props) {

    return (
        <div class="inputs" style={{paddingLeft: props.padding || '45px'}}>
            <label for={props.text}>{props.text}</label>
            <input type="text" id={props.id}
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
            />
        </div>
    )
}
