import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Graph } from 'react-d3-graph';
import axios from 'axios';
import styled from 'styled-components';

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
  & span{
    font-weight: 400;
  }
`;
const Legenda = styled.div`
  background-color: #2A2D2D;
  border-radius: 6px;
  padding: 10px;
  
  right: 20px;
  top: 20px;
  color: #ffffff;
  width: 200px;
  font-size: 14px;
`;

const CorLeganda = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  span {
    width: 20px;
    height: 9px;
    border-radius: 0%;
    display: inline-block;
    margin-right: 10px;
  }
`;

const Percurso = () => {
  const location = useLocation();
  const [percurso, setPercurso] = useState(null);
  const [rotas, setRotas] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p>{error}</p>;
  }

  if (!percurso || !rotas.length) {
    return <p>Carregando percurso...</p>;
  }


  const nodes = [];
  rotas.forEach(rota => {
    const initialPoint = rota.initialDeliveryPoint.name;
    const destinationPoint = rota.destinationDeliveryPoint.name;

    if (!nodes.find(node => node.id === initialPoint)) {
      nodes.push({
        id: initialPoint,
        label: initialPoint,
        color: '#444', 
        fontColor: '#ffffff',
        size: 3000, 
        labelPosition: 'center'
      });
    }

    if (!nodes.find(node => node.id === destinationPoint)) {
      nodes.push({
        id: destinationPoint,
        label: destinationPoint,
        color: '#444', 
        fontColor: '#ffffff',
        size: 3000, 
        labelPosition: 'center'
      });
    }
  });

  const links = rotas.map(rota => {
    const isPartOfPercurso = percurso.deliveryPoints.some(
      (ponto, index) => {
        const nextPoint = percurso.deliveryPoints[index + 1];
        return nextPoint && rota.initialDeliveryPoint.name === ponto.name && rota.destinationDeliveryPoint.name === nextPoint.name;
      }
    );

    return {
      source: rota.initialDeliveryPoint.name,
      target: rota.destinationDeliveryPoint.name,
      label: `${rota.distance} km`,
      color: isPartOfPercurso ? '#FF4A4A' : '#FFFFFF', 
      fontSize: 15,
      renderLabel: true,
      fontColor: '#FFFFFF', 
    };
  });

  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: '#444', 
      size: 1200,
      fontSize: 16,
      highlightStrokeColor: '#ff4a4a2a',
    },
    link: {
      highlightColor: '#d8ff4a',
      renderLabel: true,
      fontColor: '#FFFFFF',
    },
    directed: true,
    automaticRearrangeAfterDropNode: true,
    staticGraph: false,
  };

  return (
    <ContainerPercurso>
      <Titulo>Percurso</Titulo>
      <LinhaHorizontal />
      <ContainerGeral>
        <ContainerGrafo>
          <Graph
            id="graph-id"
            data={{ nodes, links }}
            config={graphConfig}
            onClickNode={nodeId => console.log(`${nodeId}`)}
            onClickLink={(source, target) => console.log(`${source} e ${target}`)}
          />
          <Legenda>
            <CorLeganda>
              <span style={{ backgroundColor: '#FF4A4A' }}></span>
              Rota do Percurso
            </CorLeganda>
            <CorLeganda>
              <span style={{ backgroundColor: '#FFFFFF' }}></span>
              Outras Rotas
            </CorLeganda>
          </Legenda>
         
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
            <DistanciaTotal>Distância total: <span>{percurso.totalDistance} km </span></DistanciaTotal>
          </TabelaPontos>
          
         
        </ContainerPontos>
      </ContainerGeral>
    </ContainerPercurso>
  );
};

export default Percurso;
