import { Fragment, useEffect, useState } from "react";

// COMPONENTES
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardAtleta } from "../components/CardAtleta";

// ICONOS
import search from "../assets/imgs/icons/search.svg";
import menu from "../assets/imgs/icons/menu.svg";

// CSS
import "../styles/CardAtleta.css";
import "../styles/Atletas.css";
import { useNavigate } from "react-router-dom";

export const Atletas = () => {
  const [atletas, setAtletas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/atletas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        if (Array.isArray(data.atletas)) {
          setTimeout(() => {
            setAtletas(data.atletas);
            setLoading(false);
          }, 3000);
        } else {
          console.error("La respuesta no contiene un array de atletas");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setAtletas([]);
      });
  }, []);

  return (
    <Fragment>
      <Header />

      <section className="seccionSuperior">
        <article className="buscador">
          <img src={search} alt="Search Icon" height={20} />
          <input
            type="text"
            placeholder="Busca un atleta..."
            className="buscador"
          />
        </article>
        <section className="filtrar">
          <p>Filtrar</p>
          <img src={menu} alt="Menu Icon" height={20} />
        </section>
      </section>

      <h1 className="tituloAtletas">Mejores atletas masculinos</h1>

      {loading && (
        <article className="loading">
          <section className="loader"></section>
          <p>Cargando atletas...</p>
        </article>
      )}
      {atletas && (
        <section className="sectionAthletes">
          {atletas.length > 0 &&
            atletas.map((atleta) => (
              <article
                key={atleta._id}
                onClick={() => navigate(`/atletas/${atleta._id}`)}
              >
                <CardAtleta atleta={atleta} key={atleta._id} />
              </article>
            ))}
        </section>
      )}

      <Footer />
    </Fragment>
  );
};
