import React from "react";
import SEmpresa from "../css/Empresa.module.css";

const Empresa = () => {
  return (
    <div className={`${SEmpresa.Container}`}>
      <div className={`row ${SEmpresa.Background}`}>
        <div className={`col-12 ${SEmpresa.Title}`}>
          <p>Empresa</p>
          <h1>Saiba Mais</h1>
          <p style={{color: '#808080'}}>Conheça os motivos que nos levaram ao desejo de inovar</p>
        </div>
      </div>

      <div className={`row ${SEmpresa.FiSection}`}>
        <div className={`col-md-4 col-12 ${SEmpresa.FiInfo}`}>
          <div className={SEmpresa.FiTitle}>
            <h1>Missão</h1>
          </div>
          <p>
            Desenvolver um sistema capaz de trazer maior segurança aos motoristas de caminhões no Brasil e no mundo, evitando acidentes que comprometam a integridade das pessoas.
          </p>
        </div>

        <div className={`col-md-4 col-12 ${SEmpresa.FiInfo}`}>
          <div className={SEmpresa.FiTitle}>
            <h1>Visão</h1>
          </div>
          <p>
            Ser a maior empresa brasileira que atua no setor automobilístico garantindo a segurança dos cidadãos e que expanda seus negócios para as mais regiões do planeta.
          </p>
        </div>

        <div className={` col-md-4 col-12 ${SEmpresa.FiInfo}`}>
          <div className={SEmpresa.FiTitle}>
            <h1>Valores</h1>
          </div>
          <p>
            A energia que nos move está pautada em inovação, qualidade, responsabilidade e, principalmente, a paixão ao prestar serviços que colaboram com a sociedade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Empresa;
