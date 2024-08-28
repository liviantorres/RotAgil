import styled from "styled-components";

const ContainerTrajeto = styled.div`
  background-color: #343838;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.2);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 22%;
  margin: 30px 0px 10px 0px;
  font-family: 'Roboto', sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  cursor: pointer;
  &:hover {
    transform: scale(1.05); 
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3); 
  }
`;

const Titulo = styled.h1`
  font-weight: 400;
  font-size: 22px;
  margin: 0;
  padding-bottom: 10px;
`;

const LinhaHorizontal = styled.hr`
  border: none;
  border-top: 1px solid #fff;
  opacity: 0.5;
  width: 100%;
  margin: 10px 0;
`;

const Texto = styled.p`
  font-size: 18px;
  margin: 0;
`;

const Trajeto = ({ nomeTrajeto, rotas, onClick }) => {
  const rotasCount = rotas ? rotas.length : 0; 
  return (
    <ContainerTrajeto onClick={onClick}>
      <Titulo>{nomeTrajeto}</Titulo>
      <LinhaHorizontal />
      <Texto>{rotasCount} rotas</Texto>
    </ContainerTrajeto>
  );
};

export default Trajeto;
