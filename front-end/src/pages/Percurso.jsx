import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { DataSet, Network } from 'vis-network/standalone';

const ContainerPercurso = styled.div`
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

const ContainerGeral = styled.div`
  background-color: #2A2D2D;
  border-radius: 6px;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
`;

const ContainerGrafo = styled.div`
  background-color: #343838;
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  height: 500px; 
`;

const ContainerPontos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
`;

const TabelaPontos = styled.table`
  border: 1px solid #444;
  border-radius: 10px;
  background-color: #3b3b3b;
  color: #fff;
  font-size: 16px; 
  width: 100%;
  margin-bottom: 20px;
  
  td, th {
    padding: 15px; 
    border-bottom: 1px solid #444;
    border-radius: 7px;
  }

  th {
    text-align: left;
    background-color: #444;
  }
`;

const DistanciaTotal = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  background-color: #4A4E4E;
  padding: 20px;
  border-radius: 7px;
  & span {
    font-weight: 400;
  }
`;

const Percurso = () => {
  const location = useLocation();
  const [percurso, setPercurso] = useState(null);
  const [rotas, setRotas] = useState([]);
  const [error, setError] = useState(null);

  const networkRef = useRef(null);

  useEffect(() => {
    const fetchPercurso = async () => {
      const token = localStorage.getItem("authToken");
      const { roadId, initialDeliveryPointId, destinationDeliveryPointId } = location.state;

      try {
        const response = await axios.post('http://localhost:8080/road/path', 
          {
            roadId,
            initialDeliveryPointId,
            destinationDeliveryPointId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPercurso(response.data);
      } catch (error) {
        console.error('Erro ao buscar percurso:', error);
        setError('Não foi possível gerar o percurso.');
      }
    };

    const fetchRotas = async () => {
      const token = localStorage.getItem("authToken");
      const { roadId } = location.state;

      try {
        const response = await axios.get(`http://localhost:8080/route/road/${roadId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRotas(response.data);
      } catch (error) {
        console.error('Erro ao buscar rotas:', error);
        setError('Não foi possível buscar as rotas.');
      }
    };

    fetchPercurso();
    fetchRotas();
  }, [location.state]);

  useEffect(() => {
    if (rotas.length > 0 && percurso) {
      // Prepare data for the graph
      const nodes = [];
      const edges = [];

      rotas.forEach(rota => {
        const initialPoint = rota.initialDeliveryPoint.name;
        const destinationPoint = rota.destinationDeliveryPoint.name;

        if (!nodes.find(node => node.id === initialPoint)) {
          nodes.push({
            id: initialPoint,
            label: initialPoint,
            color: '#444', 
          });
        }

        if (!nodes.find(node => node.id === destinationPoint)) {
          nodes.push({
            id: destinationPoint,
            label: destinationPoint,
            color: '#444', 
          });
        }

        const isPartOfPercurso = percurso.deliveryPoints.some(
          (ponto, index) => {
            const nextPoint = percurso.deliveryPoints[index + 1];
            return nextPoint && rota.initialDeliveryPoint.name === ponto.name && rota.destinationDeliveryPoint.name === nextPoint.name;
          }
        );

        edges.push({
          from: rota.initialDeliveryPoint.name,
          to: rota.destinationDeliveryPoint.name,
          label: `${rota.distance} km`,
          color: isPartOfPercurso ? '#FF4A4A' : '#FFFFFF', 
        });
      });

      const data = {
        nodes: new DataSet(nodes),
        edges: new DataSet(edges),
      };

      const options = {
        nodes: {
          shape: 'dot',
          size: 30,
          font: {
            size: 16, 
            color: '#ffffff',
            face: 'arial', 
            background: 'none', 
            strokeWidth: 0, 
            strokeColor: 'none', 
          },
          borderWidth: 2, 
          color: { background: '#343838', border: '#444' },
          
        },
        edges: {
        
          font: { size: 16, 
            color: '#ffffff72', 
            face: 'arial', 
            background: 'none',
            strokeWidth: 0, 
            strokeColor: 'none', 
          },
          arrows: {
            to: { enabled: true, scaleFactor: 1 },
          },
        },
        layout: {
          hierarchical: false,
        },
        physics: {
          enabled: false,
        },
        interaction: {
          dragNodes: true, 
          zoomView: false, 
          hover: true, 
          selectConnectedEdges: false, 
          navigationButtons: false, 
          selectable: true, 
        },
      };

      if (networkRef.current) {
        new Network(networkRef.current, data, options);
      }
    }
  }, [rotas, percurso]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!percurso || !rotas.length) {
    return <p>Carregando percurso...</p>;
  }

  return (
    <ContainerPercurso>
      <Titulo>Percurso</Titulo>
      <LinhaHorizontal />
      <ContainerGeral>
        <ContainerGrafo>
          <div ref={networkRef} style={{ width: '100%', height: '100%' }} />
        </ContainerGrafo>
        <ContainerPontos>
          <TabelaPontos>
            <thead>
              <tr><th>Pontos do Percurso</th></tr>
            </thead>
            <tbody>
              {percurso.deliveryPoints.map((ponto, index) => (
                <tr key={ponto.name}>
                  <td>{index + 1} - {ponto.name}</td>
                </tr>
              ))}
            </tbody>
          </TabelaPontos>
          <DistanciaTotal>Distância total: <span>{percurso.totalDistance} km </span></DistanciaTotal>
        </ContainerPontos>
      </ContainerGeral>
    </ContainerPercurso>
  );
};

export default Percurso;
