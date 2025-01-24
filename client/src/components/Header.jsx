// REACT-ROUTER
import { useNavigate, useLocation } from "react-router-dom";

// CSS
import "../styles/Header.css";

// IMGS
import logo from "../assets/imgs/logo.png";
import dumbell from "../assets/imgs/icons/dumbbell.svg";
import defaultUser from "../assets/imgs/defaultUser.png";

// CONTEXTO
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/atletas") return location.pathname.startsWith("/atletas");
    return location.pathname === path;
  };

  return (
    <header className="contenedorHeader">
      <article className="header">
        <figure className="logo">
          <img src={logo} alt="PowerTrackingSystem Logo" />
        </figure>
        <hr />
        <section className="opcionesMenu">
          <nav>
            <p
              className={
                isActive("/inicio") ? "opcionMenu active" : "opcionMenu"
              }
              onClick={() => navigate("/inicio")}
            >
              Inicio
            </p>
            <p
              className={
                isActive("/atletas") ? "opcionMenu active" : "opcionMenu"
              }
              onClick={() => navigate("/atletas")}
            >
              Atletas
            </p>
            <p
              className={
                isActive("/clubes") ? "opcionMenu active" : "opcionMenu"
              }
              onClick={() => navigate("/clubes")}
            >
              Clubes
            </p>
            <p
              className={
                isActive("/competiciones") ? "opcionMenu active" : "opcionMenu"
              }
              onClick={() => navigate("/competiciones")}
            >
              Competiciones
            </p>
          </nav>
        </section>
        <section className="datosUsuario">
          {user ? ( // SI SE HA INICIADO SESIÓN
            <>
              <p className="textoHeader">Hola, </p>
              <p className="nombreHeader">
                {user.usuario.nombre.slice(0, 1).toUpperCase() +
                  user.usuario.nombre.slice(1)}
              </p>
              {user.usuario.avatar ? (
                <img
                  src={user.usuario.avatar}
                  alt="Avatar usuario"
                  className="avatar"
                />
              ) : (
                // SI EL USUARIO NO TIENE AVATAR SE PONE UNA IMAGEN PREDETERMINADA
                <img
                  src={defaultUser}
                  alt="Avatar usuario"
                  className="avatar"
                />
              )}
            </>
          ) : (
            // SI NO SE HA INICIADO SESION
            <>
              <button className="btnHeader" onClick={() => navigate("/login")}>
                Entrar | Registrarse
                <img
                  src={dumbell}
                  alt="Dumbell Icon"
                  className="dumbellHeader"
                />
              </button>
            </>
          )}
        </section>
      </article>
    </header>
  );
};
