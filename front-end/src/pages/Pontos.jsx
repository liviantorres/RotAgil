
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../components/ModalPonto';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'; 
import { FiEdit2 } from 'react-icons/fi';
import { FaRegTrashAlt } from "react-icons/fa";

const PontoContainer = styled.div`
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

const TabelaPontos = styled.div`
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #343838;
    color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    padding: 10px;
    border: none; 
    text-align: left;
  }

  th {
    background-color: #354B57;
    font-weight: bold;
  }

  td {
    background-color: #2c2f2f;
  }

  .action-icons {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  .action-icons svg {
    color: #ffffff;
    transition: color 0.3s;
  }

  .action-icons svg:hover {
    color: #e74c3c; 
  }
`;


const Pontos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); 
  const [routes, setRoutes] = useState([]);
  const [currentPonto, setCurrentPonto] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); 

  const handleAddPonto = (newPonto) => {
    if (currentPonto) {
      const updatedRoutes = routes.map((route, index) =>
        index === currentPonto.index
          ? { ...route, name: newPonto.name, address: newPonto.address }
          : route
      );
      setRoutes(updatedRoutes);
    } else {
      setRoutes((prevRoutes) => [
        ...prevRoutes,
        { ponto: newPonto.name, endereco: newPonto.address },
      ]);
    }
    setModalOpen(false);
    setCurrentPonto(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token de acesso não encontrado!');
      return;
    }
    const fetchPontos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/deliverypoint', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRoutes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pontos', error);
      }
    };

    fetchPontos();
  }, []);

  const handleEdit = (index) => {
    const pontoToEdit = routes[index];
    setCurrentPonto({ ...pontoToEdit, index });
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setConfirmDeleteOpen(true); 
  };

  const confirmDelete = async () => {
    const pontoId = routes[deleteIndex].id;
    try {
      await axios.delete(`http://localhost:8080/deliverypoint/${pontoId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      const updatedRoutes = routes.filter((_, i) => i !== deleteIndex);
      setRoutes(updatedRoutes);

      console.log(`Ponto na linha ${deleteIndex} excluído com sucesso`);
    } catch (error) {
      console.error('Erro ao excluir ponto', error);
    }
    setConfirmDeleteOpen(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setDeleteIndex(null);
  };

  return (
    <PontoContainer>
      <ContainerFlex>
        <Titulo>Pontos</Titulo>
        <Hr />
        <BotaoContainer>
          <Botao onClick={() => { setModalOpen(true); setCurrentPonto(null); }}>
            <img src="/botao-adc.png" alt="" /> Novo Ponto
          </Botao>
        </BotaoContainer>
      </ContainerFlex>
      <TabelaPontos>
        <table>
          <thead>
            <tr>
              <th>Ponto</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <tr key={index}>
                  <td>{route.name}</td>
                  <td>{route.address}</td>
                  <td>
                    <div className="action-icons">
                      <FiEdit2 onClick={() => handleEdit(index)} />
                      <FaRegTrashAlt onClick={() => handleDelete(index)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum ponto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </TabelaPontos>
      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onSave={handleAddPonto}
          ponto={currentPonto}
        />
      )}
      {confirmDeleteOpen && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
     
    )}
    </PontoContainer>
  );
};

export default Pontos;