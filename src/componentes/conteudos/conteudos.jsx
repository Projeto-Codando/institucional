import './conteudo.css'
import CardConteudo from '../cardConteudo/cardConteudo'
import api from '../../api'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../loadingSpinner/loadingSpinner'

export default function Conteudo(props) {

    const [modulos, setModulos] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        api.get(`/modulos/1`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((json) => {
            setModulos(json.data)
            setIsLoading(false)
            console.log("Modulo Buscado")
            console.log(json.data)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    }, [props.idTurma]);
    return (
        <div className='conteudo'>
            {isLoading && <LoadingSpinner />}
            {modulos && <CardConteudo
                titulo={modulos.nome}
                temas={modulos.temas}
            />}
        </div>
    )
}