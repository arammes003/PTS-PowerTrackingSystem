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
            console.log(data);

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

  // Filtrar atletas masculinos y femeninos
  const atletasMasculinos = atletas.filter(
    (atleta) => atleta.genero.toLowerCase() === "masculino"
  );
  const atletasFemeninos = atletas.filter(
    (atleta) => atleta.genero.toLowerCase() === "femenino"
  );

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
      {atletasMasculinos && (
        <section className="sectionAthletes">
          {atletasMasculinos.length > 0 &&
            atletasMasculinos.map((atleta) => (
              <article
                key={atleta._id}
                onClick={() => navigate(`/atletas/${atleta._id}`)}
              >
                <CardAtleta atleta={atleta} key={atleta._id} />
              </article>
            ))}
        </section>
      )}

      <h1 className="tituloAtletas">Mejores atletas femeninas</h1>

      {loading && (
        <article className="loading">
          <section className="loader"></section>
          <p>Cargando atletas...</p>
        </article>
      )}
      {atletasFemeninos && (
        <section className="sectionAthletes">
          {atletasFemeninos.length > 0 &&
            atletasFemeninos.map((atleta) => (
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
