import './modalCriacao.css'
import Xzinho from '../../imgs/xModal.svg'
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group'
function modalCriacao({isOpen}){
    const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000'
    }
    const MODAL_STYLE = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        height: '550px',
        width: '450px',
        backgroundColor: '#fff',
        borderRadius: '10px',

    } 
    if(isOpen) {
    return(
        <div className='modalCriacao'>
            <div style={BACKGROUND_STYLE}>
                <div style={MODAL_STYLE}>
                    <div style={{display: 'flex',justifyContent: 'end', padding: '15px', paddingBottom: '0px'}}>
                    <img src={Xzinho} style={{width: '40px', cursor: 'pointer'}}></img>
                    </div>
               <h1 style={{color: '#476334', fontSize: '30px', textShadow: 'none', fontWeight: 'bold', marginTop: '0px'}}>Criar uma turma</h1>
               <div className='inputs'>
                <label>Nome da Turma</label>
                <input></input>
               </div>
               <div className='inputs'>
                <label>Escolaridade</label>
                <input></input>
               </div>
               <div className='inputs'>
                <label>Quantidade de Alunos</label>
                <input></input>
               </div>
               <button className='botãoCriar'>Criar turma</button>
               </div>
            </div>
                
            </div>    )
    }
    return null
}

export default modalCriacao;