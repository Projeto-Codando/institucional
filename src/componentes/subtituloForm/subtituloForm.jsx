import './subtituloForm.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubtituloForm(props) {

    const [isChecked, setIsChecked] = useState(props.checked);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setTimeout(() => {
                const professorPath = `/${props.navigateProfessor}`;
                navigate(professorPath);
            }, 500);
        } else{
            setTimeout(() => {
                const alunoPath = `/${props.navigateAluno}`;
                navigate(alunoPath);
            }, 500);
        }
    };
    return (
        <div className='container-subtitulo'>
            <div className='subtitulo-login'>
                <span>Detalhes da conta</span>
            </div>
            <div className='botao-aluno-professor'>

                <input type='checkbox' id='toggle' class='toggleCheckbox'  checked={isChecked}
                    onChange={handleCheckboxChange} />
                <label for='toggle' class='toggleContainer'>
                    <div>Aluno</div>
                    <div>Professor</div>
                </label>

            </div>
        </div>
    )
}