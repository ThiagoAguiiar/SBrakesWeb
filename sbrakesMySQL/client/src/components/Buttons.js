import React from 'react'
import styled from 'styled-components'

// Componente Action (editar ou excluir dados)
export const Action = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    color: black !important;
  }
`

const Buttons = ({children}) => {
  return <Action>
    {children}
  </Action>
}

export default Buttons