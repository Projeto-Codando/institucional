import './inputsModal.css'

export default function InputsModal(props) {

    return (
        <div class="inputs">
            <label for={props.text}>{props.text}</label>
            <input type="text" id={props.id}
            onChange={event => props.onChange(event.target.value)}
            />
        </div>
    )
}
