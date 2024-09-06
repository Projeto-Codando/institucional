import React from 'react';
import './modalEstudante.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Xzinho from '../../imgs/xModal.svg';
import InputsModal from '../inputsModal/inputsModal';
import Botao from '../botaoModal/botaoModal';
import api from '../../api';
import * as Yup from 'yup';

function ModalEditarEstudante({ isOpen, onClose, escolaridade, setEscolaridade, ...props }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000',
    };
    const MODAL_STYLE = {
        alignItems: 'center',
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box',
    };


    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [apelido, setApelido] = useState("")
    const [senha, setSenha] = useState("")

    const validadionSchema = Yup.object().shape({
        nome: Yup.string('Nome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Nome inválido').required('Todos os campos devem estar preenchidos'),
        sobrenome: Yup.string('Sobrenome inválido').matches(/^[A-Za-zÀ-ÿ]+$/, 'Sobrenome inválido').required('Todos os campos devem estar preenchidos'),
        apelido: Yup.string('Apelido inválido').required('Todos os campos devem estar preenchidos'),
        senha: Yup.string().required('Todos os campos devem estar preenchidos').min(8, 'Insira 8 ou mais caractéres')
    });

    const handleAtualizarAluno = async (event) => {
        event.preventDefault();
        console.log("Clicou no botão");

        const objetoAdicionado = {
            nome,
            sobrenome,
            senha,
            apelido
        }

        try {
            await validadionSchema.validate(objetoAdicionado, { abortEarly: false });
            console.log("Dados válidos:", objetoAdicionado);

            api.put(`/alunos/${props.idAluno}`, objetoAdicionado, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then((json) => {
                console.log(json)
                toast.success("Atualização realizada com sucesso!")
                onClose()
            }).catch(() => {
                console.log("Ocorreu um erro na sua Atualização!");
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.error("Erros de validação:");
                error.inner.forEach((err) => {
                    console.error(err.message);
                    toast.error(err.message);
                });
            }
        }


    }

    if (isOpen) {
        return (
            <div className="modalEditarEstudante">
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end', paddingBottom: '10px' }}>
                            <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close" />
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Editar aluno
                        </span>
                        <InputsModal
                            padding='20px'
                            text="Nome do Aluno"
                            id="nomeAluno"
                            value={nome}
                            onChange={setNome}
                        />
                        <InputsModal
                            padding='20px'
                            text="Sobrenome do Aluno"
                            id="sobrenomeAluno"
                            value={sobrenome}
                            onChange={setSobrenome}
                        />
                        <InputsModal
                            padding='20px'
                            text="Apelido do Aluno"
                            id="apelidoAluno"
                            value={apelido}
                            onChange={setApelido}
                        />
                        <InputsModal
                            padding='20px'

                            text="Senha do aluno"
                            id="senhaAluno"
                            value={senha}
                            onChange={setSenha}
                        />
                        <Botao
                            text="Editar aluno"
                            id="editarAluno"
                            onClick={handleAtualizarAluno}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalEditarEstudante;
