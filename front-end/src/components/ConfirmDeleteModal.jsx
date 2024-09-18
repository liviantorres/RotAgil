import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
  max-width: 90%;
  font-family: 'Roboto', sans-serif; 
`;

const ModalHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #000000;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 10px 0;
`;

const ModalBody = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  color: #000000;
`;

const Button = styled.button`
  background: #354B57; 
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  transition: background 0.3s, transform 0.3s;
  font-family: 'Roboto', sans-serif; 
  
  &:hover {
    background: #2c3e50; 
    transform: scale(1.05);
  }
`;

const CancelButton = styled(Button)`
  background: #6F6F6F; 
  &:hover {
    background: #5c5c5c; 
  }
`;

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <ModalContainer>
    <ModalContent>
      <ModalHeader>Você tem certeza?</ModalHeader>
      <Divider />
      <ModalBody>Esta ação não pode ser desfeita.</ModalBody>
      <div>
        <Button onClick={onConfirm}>Confirmar</Button>
        <CancelButton onClick={onCancel}>Cancelar</CancelButton>
      </div>
    </ModalContent>
  </ModalContainer>
);

export default ConfirmDeleteModal;
