import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #e6e6e6;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box; /* Inclui padding e border na largura total */
  font-family: 'Roboto', sans-serif;
`;

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Garante que os filhos usem toda a largura disponível */
  width: 100%;
`;

const Logo = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  border-bottom: 1px solid #1f2121;
  padding-bottom: 10px;
  font-weight: bold;
`;

const FormField = styled.div`
  margin-top: 30px;
`;

const Label = styled.label`
  font-family: 'Roboto', sans-serif;
  margin-bottom: 2px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 0px;
  border-radius: 6px;
  padding: 12px;
  border: none;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; 
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  margin-top: 40px;
  margin-bottom: 20px;
  background-color: #354b57;
  color: #fff;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border: none; 
  box-sizing: border-box;

  &:hover {
    background-color: #273740;
    color: #ece8e8db;
    cursor: pointer;
  }
`;

const Paragraph = styled.p`
  margin-top: 5px;
  text-align: center;
  font-size: smaller;
`;

const LinkStyled = styled.a`
  text-decoration: none;
  color: #5499ae;
  font-weight: bold;

  &:hover {
    color: #41798b;
  }
`;

const Forms = ({ type }) => {
  const isLogin = type === "Login";

  return (
    <FormContainer>
      <Logo src="/logo.png" alt="Logo" />
      <Title>{isLogin ? "Login" : "Registro"}</Title>
      
      <ContainerInputs>
        {!isLogin && (
          <FormField>
            <Label htmlFor="dominio">Domínio:</Label>
            <Input id="dominio" type="text" placeholder="Universidade Federal do Ceará" />
          </FormField>
        )}
        
        <FormField>
          <Label htmlFor="email">Email:</Label>
          <Input id="email" type="email" placeholder="ufc@crateus.ufc.br" />
        </FormField>
        
        <FormField>
          <Label htmlFor="password">Senha:</Label>
          <Input id="password" type="password" placeholder="UFC@78$Ki!" />
        </FormField>
        
        <Button>{isLogin ? "Entrar" : "Registrar"}</Button>
      </ContainerInputs>

      <Paragraph>
        {isLogin ? (
          <>
            Não tem uma conta? <LinkStyled href="/register">Cadastre-se</LinkStyled>
          </>
        ) : (
          <>
            Já tem uma conta? <LinkStyled href="/login">Entre aqui</LinkStyled>
          </>
        )}
      </Paragraph>
    </FormContainer>
  );
};

export default Forms;
