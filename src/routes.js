import React from "react";
import Institucional from "./screens/siteInstitucional/siteInstitucional"
import Cadastro from "./screens/cadastro/cadastro"
import Login from "./screens/login/login"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Institucional />}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                    <Route path="/login" element={<Login /> }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;