import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModalAdicionarRota from "../components/ModalRotas";
import { FiEdit2 } from 'react-icons/fi';
import { FaRegTrashAlt } from "react-icons/fa";
import ModalEditarRota from "../components/ModalEditarRota";

import ConfirmDeleteModal from '../components/ConfirmDeleteModal'; 

const ContainerRotas = styled.div`
  background-color: #252525;
  height: 100vh;
  padding: 20px;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
`;

const Titulo = styled.h1`
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LinhaHorizontal = styled.hr`
  border: none;
  border-top: 1px solid #ffffff;
  margin: 10px 0;
`;

const ControleRota = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #343838;
  padding: 20px;
  border-radius: 8px;

  p {
    margin: 0;
    font-size: 18px;
    color: #ffffff;
  }

  select {
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ffffff;
    background-color: #ffff;
    color: #343838;
  }

  button {
    background-color: #354b57;
    color: #ffffff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    &:hover {
      background-color: #2c4c5a;
      transform: scale(1.01);
    }
  }
`;

const TabelaPontos = styled.div`
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #343838;
    color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    padding: 10px;
    border: none;
    text-align: left;
  }

  th {
    background-color: #354b57;
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

const ExcluirButton = styled.button`
  background-color: #d9534f;
  color: #ffffff;
  padding: 6px 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  float: right;

  &:hover {
    background-color: #c9302c;
    transform: scale(1.01);
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

const Rotas = () => {
  const { trajetoId } = useParams();
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [nomeTrajeto, setNomeTrajeto] = useState("");
  const [pontos, setPontos] = useState([]);
  const [selectedPonto, setSelectedPonto] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPontoInicial, setSelectedPontoInicial] = useState("");
  const [selectedPontoDestino, setSelectedPontoDestino] = useState("");
  const [showEditModal, setShowEditModal] = useState(false); 
  const [currentRoute, setCurrentRoute] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); 
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); 

  useEffect(() => {
    const fetchRoutes = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const responsePontos = await axios.get(
          `http://localhost:8080/deliverypoint`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPontos(responsePontos.data);

        const trajetoNomeResponse = await axios.get(
          `http://localhost:8080/road/${trajetoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNomeTrajeto(trajetoNomeResponse.data.name);

        const response = await axios.get(
          `http://localhost:8080/route/road/${trajetoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRoutes(response.data);

      } catch (error) {
        console.error("Erro ao buscar rotas:", error);
        setError("Não foi possível carregar as rotas.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [trajetoId]);

  // Funções de adicionar percurso
  const handleNavigateToPercurso = () => {
    if (selectedPontoInicial && selectedPontoDestino) {
      navigate('/percurso', {
        state: {
          roadId: trajetoId, 
          initialDeliveryPointId: parseInt(selectedPontoInicial, 10),
          destinationDeliveryPointId: parseInt(selectedPontoDestino, 10)
        }
      });
    } else {
      alert("Por favor, selecione um ponto inicial e um ponto de destino.");
    }
  };

  //Deletar Rotas
  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setDeleteIndex(null);
  };

  const confirmDelete = async () => {
    
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8080/route/${deleteIndex}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConfirmDeleteOpen(false);
      setRoutes(routes.filter(route => route.id !== deleteIndex));
      
    } catch (error) {
      console.error("Erro ao excluir a rota:", error);
      setError("Não foi possível excluir a rota.");
    }
  };

 const handleDeleteRoute = (id) => {
  setDeleteIndex(id);
  setConfirmDeleteOpen(true); 
};

  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSaveRoute = (newRoute) => {
    setRoutes([...routes, newRoute]);
  };


//Editar Rota
  const handleOpenEditModal = (route) => {
    setCurrentRoute(route);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentRoute(null);
  };

  const handleEditRoute = (updatedRoute) => {
    setRoutes(routes.map(route => (route.id === updatedRoute.id ? updatedRoute : route)));
    handleCloseEditModal();
  };

 

  
// Deletar Trajeto
  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8080/road/${trajetoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/trajetos");
    } catch (error) {
      console.error("Erro ao excluir o trajeto:", error);
      setError("Não foi possível excluir o trajeto.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContainerRotas>
      <Titulo>Trajeto: {nomeTrajeto}</Titulo>
      <LinhaHorizontal />
      <ControleRota>
      <p>Ponto de partida:</p>
        <select value={selectedPontoInicial} onChange={(e) => setSelectedPontoInicial(e.target.value)}>
          {pontos.map((ponto) => (
            <option key={ponto.id} value={ponto.id}>
              {ponto.name}
            </option>
          ))}
        </select>
        <p>Ponto de destino:</p>
        <select value={selectedPontoDestino} onChange={(e) => setSelectedPontoDestino(e.target.value)}>
          {pontos.map((ponto) => (
            <option key={ponto.id} value={ponto.id}>
              {ponto.name}
            </option>
          ))}
        </select>
        <button onClick={handleNavigateToPercurso}>Gerar Percurso</button>
        <button onClick={handleOpenModal}>Adicionar Rota</button>
      </ControleRota>
      <TabelaPontos>
  <table>
    <thead>
      <tr>
        <th>Ponto Inicial</th>
        <th>Ponto Destino</th>
        <th>Distância (km)</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {routes.length > 0 ? (
        routes.map((route) => (
          <tr key={route.id}>
            <td>{route.initialDeliveryPoint.name}</td>
            <td>{route.destinationDeliveryPoint.name}</td>
            <td>{route.distance}</td>
            <td>
              <div className="action-icons">
                <FiEdit2 onClick={() => handleOpenEditModal(route)} />
                <FaRegTrashAlt onClick={() => handleDeleteRoute(route.id)} />
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">Nenhuma rota encontrada.</td>
        </tr>
      )}
    </tbody>
  </table>
</TabelaPontos>

      <ExcluirButton onClick={handleDelete}>
        <img src="/lixeira.svg" alt="Excluir" />
        Excluir Trajeto
      </ExcluirButton>

      {showModal && (
        <ModalAdicionarRota
          onClose={handleCloseModal}
          onSave={handleSaveRoute}
          pontos={pontos}
        />
      )}
      {showEditModal && currentRoute && (
        <ModalEditarRota
          onClose={handleCloseEditModal}
          onSave={handleEditRoute}
          route={currentRoute}
          pontos={pontos}
        />
      )}
      {confirmDeleteOpen && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          
        />
      )}
    </ContainerRotas>
  );
};

export default Rotas;
