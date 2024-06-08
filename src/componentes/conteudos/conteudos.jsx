import './conteudo.css'
import CardConteudo from '../cardConteudo/cardConteudo'
import api from '../../api'
import { useState, useEffect } from 'react'

export default function Conteudo(props) {

    const [modulos, setModulos] = useState()

    useEffect(() => {
        api.get(`/modulos/1`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            setModulos(json.data)
            console.log("Modulo Buscado")
            console.log(json.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [props.idTurma]);
    return (
        <div className='conteudo'>
            {modulos && <CardConteudo
                titulo={modulos.nome}
                temas={modulos.temas}
            />}
        </div>
    )
}