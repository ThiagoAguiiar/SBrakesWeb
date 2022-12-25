import React from "react";
import SHeader from "../css/Header.module.css";
import Responsivo from "./Responsivo";
import Kommunicate from "../API/Kommunicate";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  // Verificar caminho do usuário
  const { pathname } = useLocation();
  // Mostar Menu Responsivo
  const [menu, setMenu] = React.useState(false);
  // Alterar estilos do Header
  const [style, setStyle] = React.useState(false);
  // Alterar display do Header
  const [display, setDisplay] = React.useState(false);

  // Ao mudar a rota, atualiza o estado do componente
  React.useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/duvidas" ||
      pathname === "/contato" ||
      pathname === "/empresa" ||
      pathname === "/projeto"
    ) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [pathname]);

  // Alterar estilos do Header ao rolar a página
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 7) {
      setStyle(true);
    } else {
      setStyle(false);
    }
  });

  // Função que mostra o menu Responsivo
  function handleMenu() {
    setMenu(!menu);
  }

  // Componente JSX - Header
  return (
    <div
      className={`row ${SHeader.Header} ${
        style ? SHeader.HeaderBackground : null
      }`}
      style={{ display: display ? "none" : "flex" }}
    >
      <div className={`col-2 ${SHeader.HideMenu}`}>
        <AiOutlineMenu
          size={30}
          cursor="pointer"
          color="white"
          onClick={handleMenu}
          className={menu ? SHeader.MenuRotate : null}
        />
      </div>

      {/* Mostrando Menu Responsivo */}
      {menu && <Responsivo />}

      <div className={`col-md-2 col-8 ${SHeader.Logo}`}>
        <Link to="/">SBRAKES</Link>
      </div>

      <div className={`col-md-8 ${SHeader.Links}`}>
        <Link to="duvidas">DÚVIDAS</Link>
        <Link to="contato">CONTATO</Link>
        <Link to="empresa">EMPRESA</Link>
      </div>

      <div className={`col-2 ${SHeader.Login}`}>
        <Link to="login">LOGIN</Link>
      </div>
      <Kommunicate />
    </div>
  );
};

export default Header;
