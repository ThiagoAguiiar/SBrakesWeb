import React from "react";
import SDashboard from "../../css/Dashboard.module.css";
import { Link } from "react-router-dom";

// Informações do Cards de apresentação do Dashboard
const cardConteudo = [
  {
    title: "Gerenciamento",
    desc: "Gerenciamento dos seus funcionários e da sua frota de veículos. Adicione ou remova usuários e caminhões a qualquer momento, facilitando o controle das operações da sua organização.",
  },
  {
    title: "Monitoramento",
    desc: "Auxiliando na localização dos seus funcionários e de seus veículos que estão em atividade. Auxiliamos na manutenção da segurança da sua empresa. ",
  },
  {
    title: "Resultados",
    desc: "Um sistema inteligente permite com que você obtenha resultados satisfatórios e melhore o desempenho de seus funcionários. SBrakes atuando no desenvolvimento do seu sistema corporativo.",
  },
];

const HomePage = () => {
    return (
      <div
        className={`${SDashboard.Container} animate__animated animate__fadeIn`}
      >
        <div className={`row ${SDashboard.Card}`}>
          <div className={SDashboard.CardItem}>
            <p>Bem vindo de volta ao</p>
            <h1>Painel do Administrador</h1>
            <Link to="cadastrar-funcionario">Começar</Link>
          </div>
        </div>

        <div className={`row ${SDashboard.Actions}`}>
          <div className={`col-12 ${SDashboard.ActionsTitle}`}>
            <h1>Sistema Inteligente</h1>
          </div>
          <div className={`row ${SDashboard.ActionsContainer}`}>
            {cardConteudo.map(({ title, desc }, index) => (
              <div className={`col-md-4 col-12`} style={{ height: "100%" }} key={index}>
                <div className={SDashboard.ActionsItem}>
                  <div className={SDashboard.ActionsItemTitle}>
                    <p>{title}</p>
                  </div>
                  <div className={SDashboard.ActionsItemBody}>
                    <p>{desc}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
};

export default HomePage;
