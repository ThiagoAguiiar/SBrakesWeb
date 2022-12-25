// Imports
import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginContext } from "./hooks/useLoginContext";

// Components
import Listar from "./components/Adm/ListarFuncionarios";
import CadastrarFuncionario from "./components/Adm/CadastrarFuncionario";
import Caminhao from "./components/Adm/CadastrarCaminhao";
import Dados from "./components/Adm/DadosFuncionario";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import ListarCaminhao from "./components/Adm/ListarCaminhao";
import DadosCaminhao from "./components/Adm/DadosCaminhao";
import HomePage from "./components/Adm/HomePage";
import Duvidas from "./pages/Duvidas";
import Contato from "./pages/Contato";
import Empresa from "./pages/Empresa";

// Rotas Públicas
export const Public = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/duvidas" element={<Duvidas />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route
          path="/dashboard"
          element={
            <Private>
              {" "}
              <Dashboard />{" "}
            </Private>
          }
        >
          <Route path="" element={<HomePage />} />
          <Route
            path="cadastrar-funcionario"
            element={<CadastrarFuncionario />}
          />
          <Route path="gerenciar-funcionario" element={<Listar />} />
          <Route path="cadastrar-caminhao" element={<Caminhao />} />
          <Route path="gerenciar-funcionario/:id" element={<Dados />} />
          <Route path="gerenciar-caminhao" element={<ListarCaminhao />} />
          <Route path="gerenciar-caminhao/:id" element={<DadosCaminhao />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

// Rotas Privadas (acesso seguro ao Dashboard)
export const Private = ({ children }) => {
  const { user } = React.useContext(LoginContext);

  return user ? children : <Navigate to="/login" />;
};
