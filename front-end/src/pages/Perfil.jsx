import React, { useState } from "react";
import styled from "styled-components";

const ContainerPerfil = styled.div`
  background-color: #252525;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
`;

const FormPerfil = styled.div`
  background-color: #e6e6e6;
  width: 30%;
  height: 90%;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
`;

const Titulo = styled.h2`
  margin-bottom: 10px;
`;

const Hr = styled.hr`
  margin: 10px 0;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  background: #e6e6e6;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const OverlayButton = styled.button`
  background-color: #354b57;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a3a40;
  }
`;

const Label = styled.label`
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  font-size: 16px;
  border: none;
  padding: 10px 8px;
  border-radius: 4px;
  color: #7f7f7f;
  outline: none;
  &:focus {
    border-color: #354b57;
    box-shadow: 0 0 5px rgba(53, 75, 87, 0.5);
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Botao = styled.button`
  color: #fff;
  font-weight: 400;
  padding: 10px 75px;
  border-radius: 4px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BotaoEditar = styled(Botao)`
  background-color: #354b57;
`;

const BotaoSair = styled(Botao)`
  background-color: #6f6f6f;
`;

const LinkExcluir = styled.a`
  display: block;
  text-align: center;
  color: #5499ae;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ConfirmacaoExcluir = styled(OverlayContent)`
  width: 300px;
`;

const Perfil = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleImgClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  const handleConfirmDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteClose = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteConfirm = () => {
    alert("Conta excluída!");
    setShowConfirmDelete(false);
  };

  return (
    <ContainerPerfil>
      <FormPerfil>
        <Titulo>Domínio</Titulo>
        <Hr />
        <ImgContainer>
          <Img src="/perfil.svg" alt="Imagem de Perfil" onClick={handleImgClick} />
        </ImgContainer>
        <InputGroup>
          <Label>Domínio:</Label>
          <Input type="text" placeholder="Universidade Federal do Ceará" />
          <Label>Email:</Label>
          <Input type="text" placeholder="ufc@crateus.ufc.br" />
          <Label>Senha:</Label>
          <Input type="text" value="" placeholder="UFC@78$Ki!" />
        </InputGroup>
        <ButtonGroup>
          <BotaoEditar>Editar</BotaoEditar>
          <BotaoSair>Sair</BotaoSair>
        </ButtonGroup>
        <LinkExcluir onClick={handleConfirmDeleteClick}>Excluir conta</LinkExcluir>
      </FormPerfil>

      {showOverlay && (
        <Overlay onClick={handleOverlayClose}>
          <OverlayContent onClick={handleOverlayClick}>
            <Label>URL:</Label>
            <Input placeholder="url" />
            <OverlayButton onClick={handleOverlayClose}>Salvar</OverlayButton>
          </OverlayContent>
        </Overlay>
      )}

      {showConfirmDelete && (
        <Overlay onClick={handleDeleteClose}>
          <ConfirmacaoExcluir onClick={handleOverlayClick}>
            <Label>Tem certeza que deseja excluir sua conta definitivamente?</Label>
            <ButtonGroup>
              <OverlayButton onClick={handleDeleteConfirm}>Confirmar</OverlayButton>
              <OverlayButton onClick={handleDeleteClose}>Cancelar</OverlayButton>
            </ButtonGroup>
          </ConfirmacaoExcluir>
        </Overlay>
      )}
    </ContainerPerfil>
  );
};

export default Perfil;
