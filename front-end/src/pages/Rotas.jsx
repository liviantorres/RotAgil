import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ModalAdicionarRota from "../components/ModalRotas";

const ContainerRotas = styled.div`
  background-color: #252525;
  height: 100vh;
  padding: 20px;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
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
    background-color: #354B57;
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
`;

const ExcluirButton = styled.button`
  background-color: #D9534F;
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
    const navigate = useNavigate(); // Para redirecionar após a exclusão
    const [routes, setRoutes] = useState([]);
    const [nomeTrajeto, setNomeTrajeto] = useState("");
    const [pontos, setPontos] = useState([]);
    const [selectedPonto, setSelectedPonto] = useState("");
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchRoutes = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const trajetoNomeResponse = await axios.get(`http://localhost:8080/road/${trajetoId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNomeTrajeto(trajetoNomeResponse.data.name);

                const response = await axios.get(`http://localhost:8080/route/road/${trajetoId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (Array.isArray(response.data.rotas)) {
                    setRoutes(response.data.rotas);
                    const pontosUnicos = [
                        ...new Set(response.data.rotas.flatMap(route => [route.ponto1, route.ponto2]))
                    ];
                    setPontos(pontosUnicos);
                } else {
                    console.error("Dados recebidos não são um array:", response.data.rotas);
                    setRoutes([]);
                }
            } catch (error) {
                console.error("Erro ao buscar rotas:", error);
                setError("Não foi possível carregar as rotas.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [trajetoId]);

    const handleSelectChange = (event) => {
        setSelectedPonto(event.target.value);
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleSaveRoute = (newRoute) => {
        setRoutes([...routes, newRoute]);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.delete(`http://localhost:8080/road/${trajetoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
           
            navigate('/trajetos'); 
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
                <select value={selectedPonto} onChange={handleSelectChange}>
                    {pontos.map((ponto, index) => (
                        <option key={index} value={ponto}>{ponto}</option>
                    ))}
                </select>
                <button>Pontos de Entrega</button>
                <button onClick={handleOpenModal}>Adicionar Rota</button>
                <button>Gerar Percurso</button>
            </ControleRota>
            <TabelaPontos>
                <table>
                    <thead>
                        <tr>
                            <th>Ponto 1</th>
                            <th>Ponto 2</th>
                            <th>Distância (km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.length > 0 ? (
                            routes.map((route, index) => (
                                <tr key={index}>
                                    <td>{route.ponto1}</td>
                                    <td>{route.ponto2}</td>
                                    <td>{route.distancia}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Nenhuma rota encontrada.</td>
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
        </ContainerRotas>
    );
}

export default Rotas;
