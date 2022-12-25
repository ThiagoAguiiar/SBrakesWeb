import React from "react";
import SResponsivo from "../css/Responsivo.module.css";
import { Link } from "react-router-dom";

// Menu Responsivo
const Responsivo = () => {
  return (
    <div className={` ${SResponsivo.Responsive}`}>
      <div className={SResponsivo.ResponsiveContainer}>
        <div className="row">
          <h1>Menu</h1>
        </div>

        <div className={`col-12 ${SResponsivo.ResponsiveLinks}`}>
          <Link to="duvidas">DÚVIDAS</Link> 
          <Link to="contato">CONTATO</Link>
          <Link to="empresa">EMPRESA</Link>
          <Link to="login">LOGIN</Link>
        </div>
      </div>
    </div>
  );
};

export default Responsivo;
