import React from "react";
import { Link } from "react-router-dom";
import './Login.css'

const Login = () => {

    return(
        <div>
        <div className="register-form ">
            <form className="" action="">
                <img className="logo" src="./logo.png" alt="rotAgil" />
                <h1 className="login">Login</h1>
                <div className="">
                    <label className="email" htmlFor="">Email: </label>
                    <input className="input" type="email" />
                   
                    <label htmlFor="">Senha:  </label>
                    <input className="input" type="password" />
                  
                    <button className="btn btn-entrar">Entrar</button>
                </div>
                <p>Não possui uma conta? <Link to={"/"} className="link">Cadastre-se</Link></p>
            </form>
            
        </div>
        </div>
    );
};

export default Login;