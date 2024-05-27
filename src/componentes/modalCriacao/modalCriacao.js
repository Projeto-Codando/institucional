import './modalCriacao.css';
import Xzinho from '../../imgs/xModal.svg';
import Inputs from '../inputsModal/inputsModal';
import Botao from '../botaoModal/botaoModal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
    nomeTurma: Yup.string().required('Campo Obrigatório'),
    escolaridade: Yup.string().required('Campo Obrigatório'),
    qtdAlunos: Yup.string().required('Campo Obrigatório')

 })

function modalCriacao({ isOpen, onClose, ...props }) {
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000'
    };
    const MODAL_STYLE = {
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '500px',
        width: '450px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        flexDirection: 'column'
    };

    if (isOpen) {
        return (
            <div className='modalCriacao'>
                <div style={BACKGROUND_STYLE}>
                    <div style={MODAL_STYLE}>
                        <div style={{ display: 'flex', justifyContent: 'end', padding: '15px', paddingBottom: '0px' }}>
                            <img src={Xzinho} onClick={onClose} style={{ width: '40px', cursor: 'pointer' }} alt="close"></img>
                        </div>
                        <span style={{ color: '#476334', fontSize: '30px', textShadow: 'none', fontWeight: 'bold', marginTop: '0px' }}>Criar uma turma</span>
                        <Formik
                            initialValues={{ nomeTurma: '', escolaridade: '', qtdAlunos: '' }}
                            onSubmit={values => {
                                console.log(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Inputs
                                        text='Nome da Turma'
                                        id='nomeTurma'
                                        onChange={typeof props.setNomeTurma === 'function' ? props.setNomeTurma : undefined}
                                    />
                                    <Inputs
                                        text='Escolaridade'
                                        id='escolaridade'
                                        onChange={typeof props.setEscolaridade === 'function' ? props.setEscolaridade : undefined}
                                    />
                                    <Inputs
                                        text='Quantidade de Alunos'
                                        id='qtdAlunos'
                                        onChange={typeof props.setQtdAlunos === 'function' ? props.setQtdAlunos : undefined}
                                    />
                                    <Botao
                                        text='Criar turma'
                                        id='criarTurma'
                                        onClick={props.onClick}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default modalCriacao;
