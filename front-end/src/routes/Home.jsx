import React from "react";
import './Home.css'

import { Link } from "react-router-dom";

const Home = () => {
  return(
    <div className="home-container">
        <img className="image" src="/telaInicial.png" alt=""/>
        <div className="text-overlay">
            <h1 className="title">A revolução da logística de entrega está aqui!</h1>
            <h3 className="description">O Rotágil é uma solução inteligente e intuitiva para 
              planejamento de rotas, projetada para ajudar empresas a otimizar suas operações de logística.</h3>
            <Link to={"/register"}>
            <button className="btn">Inscreva-se</button>
            </Link>
        </div>
    </div>
  )
};

export default Home;
