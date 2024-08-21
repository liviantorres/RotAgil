import React from "react";
import "./Trajetos.css";

const Trajetos = () => {
  return (
    <div>
      <div className="body">
        <h1 className="trajetos">Trajetos</h1>
        <button className="newPath">
          <img className="botao-adc" src="/botao-adc.png" alt="" /> Novo Trajeto
        </button>
      </div>
    </div>
  );
};

export default Trajetos;
