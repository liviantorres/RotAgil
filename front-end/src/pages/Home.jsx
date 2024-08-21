import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #252525;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw; 
  height: auto; 
  max-height: 80vh; 
  transform: translate(-50%, -50%); 
  object-fit: cover; 
  z-index: -1; 
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  font-size: 90px;
  text-shadow: 0px 4px 3px rgb(0, 0, 1);
`;

const Description = styled.h3`
  width: 50%;
  margin: 0 auto;
  margin-top: 40px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 20px;
`;

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  background-color: #d9d9d9;
  border-radius: 20px;
  box-shadow: 0px 4px 3px rgb(0, 0, 1);
  margin-top: 40px;
  width: 30%;
  height: 50%;
  padding: 8px;

  &:hover {
    background-color: #a7a7a7;
    color: #252525;
    cursor: pointer;
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <HomeContainer>
        <Image src="/telaInicial.png" alt="Imagem de fundo" />
        <TextOverlay>
          <Title>A revolução da logística de entrega está aqui!</Title>
          <Description>
            O Rotágil é uma solução inteligente e intuitiva para planejamento de
            rotas, projetada para ajudar empresas a otimizar suas operações de
            logística.
          </Description>
          <Link to="/register">
            <Button>Inscreva-se</Button>
          </Link>
        </TextOverlay>
      </HomeContainer>
    </>
  );
};

export default Home;
