import React from "react";
import SContato from "../css/Contato.module.css";
import ChatBot from "../img/chatbot.png";

const Contato = () => {
  return (
    <div className={SContato.Container}>
      <div className={`row ${SContato.Background}`}>
        <div className={`col-12 ${SContato.Title}`}>
          <p>Contato</p>
          <h1>Canais de Informação</h1>
          <p className={SContato.Description}>
            Entre em contato conosco para mais informações sobre nosso produto.
          </p>
        </div>
      </div>

      <div className={`row ${SContato.FiSection}`}>
        <div className={`col-md-4 col-12 ${SContato.Redes}`}>
          <div className={`${SContato.Icons} ${SContato.IconsInstagram}`}></div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className={SContato.Instagram}
          >
            <h1>Instagram</h1>
          </a>
        </div>

        <div className={`col-md-4 col-12 ${SContato.Redes}`}>
          <div className={`${SContato.Icons}`}></div>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className={SContato.Facebook}
          >
            <h1>Facebook</h1>
          </a>
        </div>

        <div className={`col-md-4 col-12 ${SContato.Redes}`}>
          <div className={SContato.Icons}></div>
          <a
            href="https://br.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className={SContato.Facebook}
          >
            <h1>LinkedIn</h1>
          </a>
        </div>
      </div>

      <div className={`row ${SContato.SeSection}`}>
        <div className={`col-md-6 col-12 ${SContato.SeImg}`}>
          <img src={ChatBot} alt="Chatbot" width={350} className='animate__animated animate__fadeInLeft'/>
        </div>
        <div className="col-md-6 col-12">
          <div className={SContato.SeTitle}>
            <h1>Novidades!!</h1>
            <p>
              SBrakes conta com um chatbot exclusivo para trazer a melhor
              experiência possível para você.
            </p>

            <p style={{fontSize: '16px'}}>Saiba mais sobre a assistente da SBrakes clicando no ícone inferior direito da sua tela</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
