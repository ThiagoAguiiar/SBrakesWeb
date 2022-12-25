import React from "react";
import SDuvidas from "../css/Duvidas.module.css";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const duvidas = [
  {
    titulo: "Pergunta 1",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    titulo: "Pergunta 2",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    titulo: "Pergunta 3",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    titulo: "Pergunta 4",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    titulo: "Pergunta 5",
    desc: "Lorem ipsum dolor sit amet ",
  },
  {
    titulo: "Pergunta 6",
    desc: "Lorem ipsum dolor sit amet ",
  },
];

const Duvidas = () => {
  return (
    <div className={SDuvidas.Container}>
      <div className={`row ${SDuvidas.Background}`}>
        <div className={`col-12 ${SDuvidas.Title}`}>
          <p>Dúvidas</p>
          <h1>Central de Ajuda</h1>
          <p className={SDuvidas.Description}>
            Principais dúvidas de nossos clientes. Confira nossos tópicos abaixo.
          </p>
        </div>
      </div>

      <div className={`row ${SDuvidas.FiSection}`}>
        <div className={SDuvidas.Flex}>
          {duvidas.map(({ titulo, desc }, index) => (
            <Accordion allowToggle key={index}>
              <AccordionItem
                background="#1c1c1c"
                color="white"
                borderRadius="7px"
                border="none"
              >
                <h2>
                  <AccordionButton height="60px">
                    <Box
                      flex="1"
                      textAlign="left"
                      fontSize="1.2rem"
                      fontWeight="600"
                    >
                      {titulo}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{desc}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <div className={`row ${SDuvidas.SeSection}`}>
          <div className="col-md-6 col-12">
            <h1>Não encontrou sua dúvida?</h1>
            <p>
              Não se preocupe! Utilize nosso chatbot para encontrar mais
              respostas. Além disso, você pode acessar nosa página de contato e
              chamar a gente por algum de nossos canais de informação.{" "}
              <Link to="/contato">Clique aqui</Link>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Duvidas;
