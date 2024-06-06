import './inputsModal.css'

export default function SelectBoxModal(props) {
    

    return (
        <div class="inputs">
           <label for={props.text}>{props.text}</label>
           <select name="" id="escolaridade-select" value={props.value} onChange={props.onChange}>
                        <option value="1">6º Ano</option>
                        <option value="2">7º Ano</option>
                        <option value="3">8º Ano</option>
                        <option value="4">9º Ano</option>
            </select>
        </div>
    )
}
