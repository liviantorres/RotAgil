import React, { useEffect } from 'react';
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
  font-family: 'Arial', sans-serif;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 10px;
  width: 350px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.3s ease-in-out;
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px;
  font-size: 1.5em;
  text-align: left;
  color: #222;
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
  background-color: ${(props) => props.bgColor || '#273740'};
  color: #fff;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2c4c5a'};
  }
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

const ModalPonto = ({ onClose, onSave, ponto }) => {
  const [nomePonto, setNomePonto] = React.useState('');
  const [enderecoPonto, setEnderecoPonto] = React.useState('');

  useEffect(() => {
    if (ponto) {
      setNomePonto(ponto.name || '');
      setEnderecoPonto(ponto.address || '');
    }
  }, [ponto]);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token de acesso não encontrado!');
      return;
    }

    try {
      if (ponto) {
        // Lógica de edição
        const response = await axios.put(`http://localhost:8080/deliverypoint/${ponto.id}`, {
          name: nomePonto,
          address: enderecoPonto,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.status === 200) {
          const updatedPonto = response.data;
          onSave({
            id: updatedPonto.id,
            name: updatedPonto.name,
            address: updatedPonto.address
          });
        } else {
          console.error('Falha ao editar o ponto', response.statusText);
        }
      } else {
        // Lógica de criação
        const response = await axios.post('http://localhost:8080/deliverypoint', {
          name: nomePonto,
          address: enderecoPonto,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.status === 201) {
          const newPonto = response.data;
          onSave({
            id: newPonto.id,
            name: newPonto.name,
            address: newPonto.address
          });
        } else {
          console.error('Falha ao criar o ponto', response.statusText);
        }
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor', error);
    }

    setNomePonto('');
    setEnderecoPonto('');
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        <ModalHeader>{ponto ? 'Editar Ponto de Entrega' : 'Adicionar Ponto de Entrega'}</ModalHeader>
        <ModalLabel htmlFor="nomePonto">Ponto de entrega *</ModalLabel>
        <ModalInput
          id="nomePonto"
          type="text"
          placeholder="Nome do Ponto"
          value={nomePonto}
          onChange={(e) => setNomePonto(e.target.value)}
        />
        <ModalLabel htmlFor="enderecoPonto">Endereço</ModalLabel>
        <ModalInput
          id="enderecoPonto"
          type="text"
          placeholder="Endereço"
          value={enderecoPonto}
          onChange={(e) => setEnderecoPonto(e.target.value)}
        />
        <ModalButton onClick={handleSave}>
          {ponto ? 'Salvar Alterações' : 'Adicionar'}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalPonto;
