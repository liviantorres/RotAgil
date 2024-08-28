import React from 'react';
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
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 8px 4px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ModalButton = styled.button`
  background-color: ${(props) => props.bgColor || '#273740'};
  color: #fff;
  padding: 10px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#2c4c5a'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; 
`;

const ModalTrajeto = ({ onClose, onSave }) => {
  const [nomeTrajeto, setNomeTrajeto] = React.useState('');

  const handleSave = async () => {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      console.error('Token de acesso não encontrado!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/road', {
        name: nomeTrajeto,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      });

      if (response.status === 201) {
        onSave(response.data); 
        setNomeTrajeto('');
      } else {
        console.error('Falha ao criar o trajeto', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor', error);
    }
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Adicionar Trajeto:</ModalHeader>
        <ModalInput
          type="text"
          placeholder="Nome do Trajeto"
          value={nomeTrajeto}
          onChange={(e) => setNomeTrajeto(e.target.value)}
        />
        <ButtonContainer>
          <ModalButton 
            bgColor="#354B57" 
            hoverColor="#2a3b44"
            onClick={handleSave}
          >
            Salvar
          </ModalButton>
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

export default ModalTrajeto;
