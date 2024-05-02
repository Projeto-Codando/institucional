import './inputsLogins.css'

export default function InputsLogin(props) {

    return (
        <div class="input-wrapper">
            <label for={props.text}>{props.text}</label>
            <input type="text" id={props.id}
            onChange={event => props.onChange(event.target.value)}
            style={{width: props.width || '433px'}}/>
        </div>
    )
}
