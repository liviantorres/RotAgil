import React from "react";
import styled from "styled-components";

const TrajetoContainer = styled.div`
  background-color: #1F2121;
  height: 100vh;
  margin: 0;
  padding: 0;
`

const Trajetos = () => {
  return (
    <TrajetoContainer>
      
        <h1 className="trajetos">Trajetos</h1>
        <button className="newPath">
          <img className="botao-adc" src="/botao-adc.png" alt="" /> Novo Trajeto
        </button>
      
    </TrajetoContainer>
  );
};

export default Trajetos;
