import React from "react";
import styled from "styled-components";
import { Spinner } from "@chakra-ui/react";

// Estilos da Div
const LoadingPage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  p {
    color: gray;
  }
`;

// Componente de Loading (aguardando envio de dados do banco)
function Loading() {
  return (
    <LoadingPage>
      <Spinner size="lg" />
      <p>Carregando</p>
    </LoadingPage>
  );
}

export default Loading;
