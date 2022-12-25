import React from "react";
import SHome from "../css/Home.module.css";
import APP from "../img/app.png";
import { BsTrophy, BsShieldLock, BsFlag } from "react-icons/bs";

// Títulos e Textos dos Cards
const cardField = [
  {
    title: "RESPONSÁEVL",
    text: "Responsabilidade para atuar na segurança dos veículos e de seus funcionários na empresa. Atuando no setor automobilístico para facilitar a administração da sua corporação.",
    icon: <BsFlag size={25} color="black" />,
  },
  {
    title: "SEGURO",
    text: "Sistema que permite o monitoramente da frota de veículos e dos funcionários de sua empresa. Nosso objetivo é previnir acidentes e fazer o trânsito brasileiro mais seguro.",
    icon: <BsShieldLock size={25} color="black" />,
  },
  {
    title: "CONFIÁVEL",
    text: "Garantimos às empresas que nosso sistema é confiável. Estamos sempre realizando revisões periódicas para o aperfeiçoamento do nosso sistema.",
    icon: <BsTrophy size={25} color="black" />,
  },
];

// Componente JSX
const Home = () => {
  return (
    <div className={`${SHome.Container}`}>
      <div className={`row ${SHome.Background}`}>
        <div className={`col-12 ${SHome.Title}`}>
          <div>
            <h1>POR UMA VIAGEM MAIS SEGURA</h1>
            <p>
              Sistema inteligente que previne acidentes. Monitore sua frota de
              veículos e faça o trânsito brasileiro mais seguro
            </p>
          </div>
        </div>
      </div>

      <div className={`row ${SHome.FiSection}`}>
        <div className={`row ${SHome.CardsContainer}`}>
          {cardField.map(({ title, text, icon }, index) => (
            <div className={`col-md-4 col-12 ${SHome.Cards}`} key={index}>
              <div className={`${SHome.CardsItem}`}>
                <div className={SHome.CardTitle}>
                  <h1>{title}</h1>
                  <div className={SHome.Icons}>{icon}</div>
                </div>

                <div className={`col-12 ${SHome.CardBody}`}>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`row ${SHome.SeSection}`}>
        <div className={`col-md-6 col-12 ${SHome.App}`}>
          <div className={`row ${SHome.BaixarApp}`}>
            <img src={APP} alt="download" />
          </div>
        </div>

        <div className={`col-md-6 col-12 ${SHome.Info}`}>
          <div className={`row ${SHome.InfoTitleContainer}`}>
            <h1 className={SHome.FiTitle}>Segurança na palma da sua mão</h1>
            <h1>Disponível para Android</h1>
            <h1 className={SHome.Download}>Baixe Agora</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
