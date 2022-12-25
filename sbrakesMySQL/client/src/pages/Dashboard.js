// Default imports
import React from "react";
import axios from "axios";
import SDashboard from "../css/Dashboard.module.css";
import Loading from "../components/Loading";
import Profile from "../components/Profile";
import { LoginContext } from "../hooks/useLoginContext";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineCar, AiOutlineUser } from "react-icons/ai";
import { BsKey, BsPeople } from "react-icons/bs";

const Dashboard = () => {
  // Controle das ações de Login do usuário
  const { getLocalStorage } = React.useContext(LoginContext);
  // Armazena dados do LocalStorage
  const [data, setData] = React.useState(null);
  // Armazena dados do Administrador do Banco
  const [adm, setAdm] = React.useState(null);

  // Coleta informações do LocalStorage
  React.useEffect(() => {
    setData(getLocalStorage());
  }, [getLocalStorage]);

  // Busca dados do usuário logado
  React.useEffect(() => {
    if (data !== null)
      axios
        .post("http://localhost:3001/buscar-dados-adm", {
          credencial: data.credencial,
        })
        .then((response) =>
          setAdm({
            nome: response.data.nome,
            credencial: response.data.num_funcionario,
            email: response.data.email,
            senha: response.data.senha,
            admin: response.data.adm,
            ativo: response.data.ativo,
            img: response.data.foto_perfil,
          })
        )
        .catch((error) => console.log(error));
  }, [data]);

  // Componente Dashboard
  if (data === null || adm === null) return <Loading />;
  else
    return (
      <div className={SDashboard.Container}>
        <div className={`row ${SDashboard.MenuContainer}`}>
          <div className={SDashboard.Menu}>
            <Link to="">
              <HiOutlineHome size={27} />
            </Link>

            <Link to="cadastrar-funcionario">
              <AiOutlineUser size={27} />
            </Link>

            <Link to="gerenciar-funcionario">
              <BsPeople size={27} />
            </Link>

            <Link to="cadastrar-caminhao">
              <AiOutlineCar size={27} />
            </Link>

            <Link to="gerenciar-caminhao">
              <BsKey size={27} />
            </Link>
          </div>
        </div>

        <div className={`row ${SDashboard.Body}`}>
          <div className={`col-12 ${SDashboard.Header}`}>
            <div className={`${SDashboard.Title}`}>
              <h1>Dashboard SBRAKES</h1>
            </div>

            <div className={SDashboard.User}>
              <Profile img={data.img} adm={adm} setAdm={setAdm} />
            </div>
          </div>

          <div className={SDashboard.Outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
