import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  color: #252525;
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #252525;
`;

const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ModalButton = styled.button`
  background-color: ${(props) => props.bgColor || '#354B57'};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#2a3b44'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
          <ModalButton 
            bgColor="#6F6F6F" 
            hoverColor="#5a5a5a"
            onClick={onClose}
          >
            Cancelar
          </ModalButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAdicionarRota;
