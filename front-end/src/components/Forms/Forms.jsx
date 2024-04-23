import { Link } from "react-router-dom";
import "./Forms.css";

const Forms = ({ type }) => {
  return (
    <div>
      <div className="register-form ">
        <form className="" action="">
          <img className="logo" src="./logo.png" alt="rotAgil" />
          {type == "Login" && (
            <div>
              <h1 className="login">Login</h1>

              <>
                <label className="email" htmlFor="">
                  Email:{" "}
                </label>
                <input className="input" type="email" />

                <label htmlFor="">Senha: </label>
                <input className="input" type="password" />

                <button className="btn btn-entrar">Entrar</button>
              </>
              <p>
                Não possui uma conta?{" "}
                <Link to={"/register"} className="link">
                  Cadastre-se
                </Link>
              </p>
            </div>
          )}
          {type == "Register" && (
            <div>
              <h1 className="login">Registrar</h1>
              <>
                <label htmlFor="">Dominio: </label>
                <input className="input" type="text" />

                <label htmlFor="">Email: </label>
                <input className="input" type="email" />

                <label htmlFor="">Senha: </label>
                <input className="input" type="password" />

                <button className="btn btn-entrar">Cadastrar</button>
              </>
              <p>
                Já possui uma conta?{" "}
                <Link to={"/login"} className="link">
                  Entre
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Forms;
