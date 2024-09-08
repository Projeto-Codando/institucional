import './inputsModal.css'

export default function SelectBoxModal(props) {
    

    return (
        <div class="inputs" style={{paddingLeft: '45px'}}>
           <label for={props.text}>{props.text}</label>
           <select name="" id="escolaridade-select" value={props.value} onChange={props.onChange}>
                        <option disabled selected>Selecione uma escolaridade</option>
                        <option value="1">6º Ano</option>
                        <option value="2">7º Ano</option>
                        <option value="3">8º Ano</option>
                        <option value="4">9º Ano</option>
            </select>
        </div>
    )
}
