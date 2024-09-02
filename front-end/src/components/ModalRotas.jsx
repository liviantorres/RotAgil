import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease-in-out;
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px;
  font-size: 1.5em;
  text-align: left;
  color: #252525;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const ModalLabel = styled.label`
  display: block;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 5px;
  margin-top: 10px;
`;

const ModalSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.9em;
  color: #333;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.9em;
  color: #333;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ModalButton = styled.button`
  background-color: ${(props) => props.bgColor || '#354B57'};
  color: #fff;
  padding: 12px;
  width: 70%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1em;
  margin-top: 10px;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2a3b44'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  font-size: 20px;
  transition: color 0.3s;

  &:hover {
    color: #333;
  }
`;

const ModalAdicionarRota = ({ onClose, onSave, pontos }) => {
  const [ponto1, setPonto1] = useState('');
  const [ponto2, setPonto2] = useState('');
  const [distancia, setDistancia] = useState('');

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token de acesso não encontrado!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/route', {
        ponto1,
        ponto2,
        distancia,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        onSave(response.data);
        setPonto1('');
        setPonto2('');
        setDistancia('');
      } else {
        console.error('Falha ao adicionar a rota', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor', error);
    }
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <ModalHeader>Adicionar Rota</ModalHeader>
        <ModalLabel htmlFor="ponto1">Ponto de Entrega 1 *</ModalLabel>
        <ModalSelect
          id="ponto1"
          value={ponto1}
          onChange={(e) => setPonto1(e.target.value)}
        >
          <option value="">Selecione um ponto</option>
          {pontos.map((ponto, index) => (
            <option key={index} value={ponto}>{ponto}</option>
          ))}
        </ModalSelect>

        <ModalLabel htmlFor="ponto2">Ponto de Entrega 2 *</ModalLabel>
        <ModalSelect
          id="ponto2"
          value={ponto2}
          onChange={(e) => setPonto2(e.target.value)}
        >
          <option value="">Selecione um ponto</option>
          {pontos.map((ponto, index) => (
            <option key={index} value={ponto}>{ponto}</option>
          ))}
        </ModalSelect>

        <ModalLabel htmlFor="distancia">Distância em Quilômetros *</ModalLabel>
        <ModalInput
          id="distancia"
          type="number"
          placeholder="Distância (km)"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
        />

        <ButtonContainer>
          <ModalButton onClick={handleSave}>Salvar</ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAdicionarRota;
