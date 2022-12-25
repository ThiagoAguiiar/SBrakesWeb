import React from "react";
import Dog from '../img/gifs/dog.gif'
import styled from "styled-components";
import { Link } from "react-router-dom";

const NoData = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 height: calc(100vh - 90px);
 gap: 2rem;

 h1 {
  font-size: 1.5rem;
  font-weight: 600;
 }

 button {
  width: 200px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 7px;
  background: black;
  color: white;
 }

 button:hover {
  box-shadow: 3px 3px 15px lightgray;
 }
`

const Empty = ({text, link}) => {
  return (
    <NoData>
      <img src={Dog} width="400px" alt='cachorro' />
      <h1>{text}</h1>
      <Link to={link}>
        <button>
          Adicionar <span style={{ fontSize: "20px" }}>+</span>
        </button>
      </Link>
    </NoData>
  );
};

export default Empty;
