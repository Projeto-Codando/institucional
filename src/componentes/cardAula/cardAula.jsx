import './cardAula.css'
import api from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../componentes/loadingSpinner/loadingSpinner';
import Estrela from '../../imgs/estrela.png';
import Start from '../../imgs/start.png';
import { useEffect, useState } from 'react';

export default function CardAula(props) {

    const [nivelSelecionado, setNivelSelecionado] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const body = {
        fkAluno: sessionStorage.getItem("userId"),
        fkAula: nivelSelecionado
    };

    useEffect(() => {
        const fkAula = parseInt(sessionStorage.getItem("nivel"));
        if (fkAula) {
            setNivelSelecionado(fkAula + 1);
        }
    }, []); 

    const handleCreateNewProgressGame = () => {
        setIsLoading(true);
        api.post(`/progresso-aluno`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            setIsLoading(false);
            console.log(response.data);
            toast.success("Quiz iniciado com sucesso!");
            navigate(`/jogo/${nivelSelecionado}`);
        }).catch((error) => {
            setIsLoading(false);
            toast.error("Não foi possível iniciar o quiz! " + error.response.data.message);
            console.error(error);
        });
    }

    return(
        
        
        <div className='cardAula'>
        {isLoading && <LoadingSpinner />}
            <div className='materia'>
                <span className='aula'>Aula {props.numeroAula}</span>
                <span className='tituloMateria'>{props.tema}</span>
            </div>
            <div className='titulo'><span>{props.titulo}</span></div>
            <div className='subtituloAula'>
                <span>{props.descricao}</span>
            </div>
            <div className='estrelaAula'>
                <img src={Estrela} alt="estrelaAula" /> <span>{props.numEstrela} / {props.numTotalEstrela}</span>
            </div>
            <div className='botaoAula'><button onClick={() => {
                sessionStorage.setItem("nivel", nivelSelecionado);
                handleCreateNewProgressGame()
            }}><img src={Start} alt="" />Iniciar</button></div>
        </div>
   
    )

    
}

