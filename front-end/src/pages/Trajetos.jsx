import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Trajeto from '../components/Trajeto';
import Modal from '../components/ModalTrajeto';
import { useNavigate } from 'react-router-dom';

const TrajetoContainer = styled.div`
  background-color: #252525;
  height: 100vh;
  padding: 50px;
`;

const Titulo = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: #FFFF;
  font-weight: 600;
  font-size: 40px;
  margin: 0;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid #FFFF;
  width: 100%;
  margin: 10px 0;
`;

const Botao = styled.button`
  background-color: #273740;
  color: #fff;
  padding: 12px 90px;
  border: none;
  border-radius: 6px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2c4c5a;
    transform: scale(1.01);
  }
`;

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const BotaoContainer = styled.div`
  align-self: flex-end;
`;

const ListaTrajeto = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

const Trajetos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [trajetos, setTrajetos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrajetos = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Token de acesso não encontrado!');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/road', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        
        setTrajetos(response.data); 
        console.log('Trajetos recebidos:', response.data); 
      } catch (error) {
        console.error('Erro ao buscar trajetos do servidor', error);
      }
    };

    fetchTrajetos();
  }, []);

  const handleAddTrajeto = (newTrajeto) => {
    console.log('Novo trajeto recebido:', newTrajeto);
    
    if (newTrajeto && newTrajeto.id && newTrajeto.name) {
      setTrajetos((prevTrajetos) => [newTrajeto, ...prevTrajetos]); // Adicione o novo trajeto ao início da lista
    } else {
      console.error('Trajeto inválido:', newTrajeto);
    }
    setModalOpen(false);
  };
  
  

  const handleTrajetoClick = (id) => {
    navigate(`/rotas/${id}`); 
  };

  return (
    <TrajetoContainer>
      <ContainerFlex>
        <Titulo>Trajetos</Titulo>
        <Hr />
        <BotaoContainer>
          <Botao onClick={() => setModalOpen(true)}>
            <img src="/botao-adc.png" alt="" /> Novo Trajeto
          </Botao>
        </BotaoContainer>
      </ContainerFlex>
      <ListaTrajeto>
        {trajetos.map((trajeto) => (
          <Trajeto
            key={trajeto.id} 
            nomeTrajeto={trajeto.name}
            onClick={() => handleTrajetoClick(trajeto.id)} 
          />
        ))}
      </ListaTrajeto>
      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onSave={handleAddTrajeto}
        />
      )}
    </TrajetoContainer>
  );
};

export default Trajetos;
