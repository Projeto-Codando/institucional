import './conteudo.css'
import CardConteudo from '../cardConteudo/cardConteudo'
import api from '../../api'
import { useState, useEffect } from 'react'

export default function Conteudo(props) {

    const [modulos, setModulos] = useState([])

    useEffect(() => {
        api.get(`/grades/${props.idTurma}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            setModulos(json.data.modulo)
            console.log(json.data.modulo[0].nome)
        }).catch((error) => {
            console.log(error)
        })
    }, [props.idTurma]);

    return (
        <div className='conteudo'>
            {modulos.map((modulo, index) => (
                <CardConteudo
                    key={index}
                    titulo={modulo.nome}
                    temas={modulo.temas}
                />
            ))}
        </div>
    )
}