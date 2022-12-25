// Imports
import React from "react";
import styled from "styled-components";
import { FaRegEye } from "react-icons/fa";

// Componente olho de mostrar senha
export const Eye = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 17px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

// Componente de texto que mostra a senha
export const Text = styled.p`
  position: absolute;
  right: 2rem;
`;

// Componente para mostrar senha
const MostrarSenha = ({ password, eye, text, disabled }) => {
  const [toggle, setToggle] = React.useState(false);
  // Função que mostra e oculta a senha
  function handleShow() {
    if (disabled === false) {
      setToggle(!toggle);
    } else {
      setToggle(false);
    }
  }

  // Componente JSX
  return (
    <Eye onClick={handleShow} style={eye}>
      <FaRegEye size={20} color={toggle ? "gray" : ""} />
      <Text style={{ text }}>{toggle && password}</Text>
    </Eye>
  );
};

export default MostrarSenha;
