// REACT
import { Fragment, useEffect, useState } from "react";

// REACT-MULTI-CAROUSEL
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// ICONOS
import trophy from "../assets/imgs/icons/trophy.svg";
import video from "../assets/imgs/icons/video.svg";

// CSS
import "../styles/Home.css";

// COMPONENTES
import { Header } from "../components/Header";
import { CardCompeticion } from "../components/CardCompeticion";
import { Footer } from "../components/Footer";

// PAGINA INICIO
export const Home = () => {
  const [competiciones, setCompeticiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/competiciones")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.competiciones)) {
          setTimeout(() => {
            setCompeticiones(data.competiciones);
            setLoading(false);
          }, 1500);
        } else {
          console.error("ERROR, NO ES UN ARRAY");
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setCompeticiones([]);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    monitor: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1700, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const hoy = new Date();

  // FILTRAMOS COMPETICIONES POR PROXIMAS
  const proximasCompeticiones = competiciones
    .filter((competicion) => new Date(competicion.fecha_inicio) >= hoy)
    .sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)) // ORDENAMOS DE MAS PROXIMAS PRIMERO
    .slice(0, 4);

  // FILTRAMOS COMPETICIONES POR MAS RECIENTES
  const ultimasCompeticiones = competiciones
    .filter((competicion) => new Date(competicion.fecha_inicio) < hoy)
    .sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio)) // ORDENAMOS POR MAS RECIENTES PRIMERO
    .slice(0, 5);

  return (
    <Fragment>
      <Header />

      <main>
        <article className="competicionesHome">
          <section className="titulo">
            <img src={trophy} alt="Trophy Icon" />
            <h1>Próximas competiciones</h1>
          </section>
          <section className="sectionCompeticiones">
            {loading && (
              <article className="loading">
                <section className="loader"></section>
                <p>Cargando competiciones...</p>
              </article>
            )}
            {proximasCompeticiones && (
              <section className="sectionCompeticiones">
                <Carousel responsive={responsive} infinite={true}>
                  {proximasCompeticiones.length > 0 &&
                    proximasCompeticiones.map((competicion) => (
                      <CardCompeticion
                        competicion={competicion}
                        key={competicion._id}
                      />
                    ))}
                </Carousel>
              </section>
            )}
          </section>

          <section className="titulo">
            <img src={trophy} alt="Trophy Icon" />
            <h1>Últimas competiciones</h1>
          </section>
          <section className="sectionCompeticiones">
            {loading && (
              <article className="loading">
                <section className="loader"></section>
                <p>Cargando competiciones...</p>
              </article>
            )}
            {ultimasCompeticiones && (
              <section className="sectionCompeticiones">
                <Carousel responsive={responsive} infinite={true}>
                  {ultimasCompeticiones.length > 0 &&
                    ultimasCompeticiones.map((competicion) => (
                      <CardCompeticion
                        competicion={competicion}
                        key={competicion._id}
                      />
                    ))}
                </Carousel>
              </section>
            )}
          </section>
        </article>

        <article className="competicionesHome">
          <section className="titulo">
            <img src={video} alt="Vídeo Icon" />
            <h1>Últimas retransmisiones en directo</h1>
          </section>
          <section className="sectionAthletes">
            <article className="video">
              <iframe
                src="https://www.youtube.com/embed/7e90gBu4pas"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <iframe
                src="https://www.youtube.com/embed/7e90gBu4pas"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <iframe
                src="https://www.youtube.com/embed/7e90gBu4pas"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </article>
          </section>
        </article>
        <section className="videos"></section>

        <Footer />
      </main>
    </Fragment>
  );
};
