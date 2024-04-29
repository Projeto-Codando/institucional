import './inputsLogins.css'

export default function InputsLogin(props) {

    return (
        <div class="input-wrapper">
            <label for={props.text}>{props.text}</label>
            <input type="text" id={props.id} style={{width: props.width || '433px'}}/>
        </div>
    )
}