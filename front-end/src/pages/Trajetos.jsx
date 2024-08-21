import React from "react";
import styled from "styled-components";
import Trajeto from "../components/Trajeto";

const TrajetoContainer = styled.div`
  background-color: #252525;
  height: 100vh;
  padding: 50px;
`;

const Titulo = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: #FFFF;
  font-weight: 600;
  font-size: 40px;
  margin: 0; 
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #FFFF; 
  width: 100%; 
  margin: 10px 0; 
`;

const Botao = styled.button`
  background-color: #273740;
  color: #fff;
  padding: 12px 90px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
  &:hover{
    background-color:#2c4c5a;
    transform: scale(1.01);
  }
`;

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 10px; 
`;

const BotaoContainer = styled.div`
  align-self: flex-end; 
`;

const ListaTrajeto = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

const Trajetos = () => {
  return (
    <TrajetoContainer>
      <ContainerFlex>
        <Titulo>Trajetos</Titulo>
        <Hr />
        <BotaoContainer>
          <Botao>
            <img src="/botao-adc.png" alt="" /> Novo Trajeto
          </Botao>
        </BotaoContainer>
      </ContainerFlex>
      <ListaTrajeto>
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      <Trajeto
        nomeTrajeto= 'Entregas Semanais'
        rotas = '16'
      />
      </ListaTrajeto>
    </TrajetoContainer>
  );
};

export default Trajetos;
