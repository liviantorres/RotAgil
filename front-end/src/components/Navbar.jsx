import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  let links = [];
  let buttonNav = [];

  if (location.pathname == "/" || "/login" || "/register") {
    links = [
      { text: "Inicio", url: "/" },
      { text: "Sobre Nós", url: "/login" },
      { text: "Contato", url: "/login" },
    ];
    buttonNav = [];
  } else if (location.pathname == "/trajetos") {
    links = [
      { text: "Trajetos", url: "/trajetos" },
      { text: "Pontos", url: "/pontos" },
    ];

    buttonNav = [{ text: "", url: "/" }];
  } else if (location.pathname == "/pontos") {
    links = [
      { text: "Trajetos", url: "/trajetos" },
      { text: "Pontos", url: "/pontos" },
    ];

    buttonNav = [{ text: "", url: "/" }];
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-flex align-items-center" style={{ marginLeft: "5%" }}>
          {links.map((link) => (
            <h2>
              <Link to={link.url} className="link">
                {link.text}
              </Link>
            </h2>
          ))}
        </div>

        <div>
          {buttonNav.map((button) => (
            <button className="custom-button">
              <Link to={button.url} className="custom-button-link">
                {button.text}
              </Link>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
