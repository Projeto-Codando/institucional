import React, { useState } from 'react';
import './inputsLogins.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function InputsLogin(props) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="input-wrapper">
            <label htmlFor={props.id}>{props.text}</label>
            <div className="password-container">
                <input
                    type={isPasswordVisible ? 'text' : props.type}
                    id={props.id}
                    onChange={event => props.onChange(event.target.value)}
                    style={{ width: props.width || '433px' }}
                    placeholder={props.placeholder}
                />
                {props.type === 'password' && (
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </div>
        </div>
    );
}
