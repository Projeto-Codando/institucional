import React from "react";
import Institucional from "./screens/siteInstitucional/siteInstitucional"
import Cadastro from "./screens/cadastro/cadastro"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Institucional />}/>
                    <Route path="/cadastro" element={<Cadastro />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;