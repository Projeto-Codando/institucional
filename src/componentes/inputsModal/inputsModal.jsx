import './inputsModal.css';

export default function InputsModal(props) {
  return (
    <div className="inputs">
      <label htmlFor={props.text}>{props.text}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
