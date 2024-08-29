import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
`;

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const Logo = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  border-bottom: 1px solid #1f2121;
  padding-bottom: 10px;
  font-weight: bold;
`;

const FormField = styled.div`
  margin-top: 30px;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
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
  margin-top: 20px;
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

const ErrorList = styled.ul`
  color: #FF0000;
  font-size: smaller;
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ErrorItem = styled.li`
  margin-bottom: 5px;
`;

const Paragraph = styled.p`
  margin-top: 5px;
  text-align: center;
  font-size: smaller;
`;

const LinkStyled = styled(Link)`
  color: #5499AE;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Forms = ({ type, onSubmit, errors: propErrors }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(propErrors || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];

    if (type === "Register" && !name) newErrors.push("O nome é obrigatório");
    if (!email) newErrors.push("O email é obrigatório");
    if (!password) newErrors.push("A senha é obrigatória");
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]); 
      onSubmit({ name, email, password }).catch((err) => {
        setErrors(err.response?.data?.errors || ["Erro ao enviar dados."]);
      });
    }
  };

  return (
    <FormContainer>
      <Logo src="/logo.png" alt="Logo" />
      <Title>{type === "Login" ? "Login" : "Registro"}</Title>

      <form onSubmit={handleSubmit}>
        <ContainerInputs>
          {type === "Register" && (
            <FormField>
              <Label htmlFor="name">Nome:</Label>
              <Input
                id="name"
                type="text"
                placeholder="Universidade Federal do Ceará"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>
          )}

          <FormField>
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="ufc@crateus.ufc.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="password">Senha:</Label>
            <Input
              id="password"
              type="password"
              placeholder="UFC@78$Ki!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          {errors.length > 0 && (
            <ErrorList>
              {errors.map((error, index) => (
                <ErrorItem key={index}>{error}</ErrorItem>
              ))}
            </ErrorList>
          )}
          <Button type="submit">
            {type === "Login" ? "Entrar" : "Registrar"}
          </Button>
        </ContainerInputs>
      </form>

      <Paragraph>
        {type === "Login" ? (
          <>
            Não tem uma conta? <LinkStyled to="/register">Cadastre-se</LinkStyled>
          </>
        ) : (
          <>
            Já tem uma conta? <LinkStyled to="/login">Entre aqui</LinkStyled>
          </>
        )}
      </Paragraph>
    </FormContainer>
  );
};

export default Forms;
