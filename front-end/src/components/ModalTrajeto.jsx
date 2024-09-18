import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

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

const ModalLabel = styled.label`
  display: block;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 5px;
  margin-top: 10px;
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
    
        const newTrajeto = response.data;
       
        const trajetoFormatado = {
          id: newTrajeto.id, 
          name: newTrajeto.name
        };
  
        onSave(trajetoFormatado); 
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
      <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <ModalHeader>Adicionar Trajeto:</ModalHeader>
        <ModalLabel>Nome do trajeto:</ModalLabel>
        <ModalInput
          type="text"
          placeholder="Nome do Trajeto"
          value={nomeTrajeto}
          onChange={(e) => setNomeTrajeto(e.target.value)}
        />
        
          <ButtonContainer>
          <ModalButton onClick={handleSave}>Salvar</ModalButton>
        </ButtonContainer>
       
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalTrajeto;
