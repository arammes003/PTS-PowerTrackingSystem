import { Header } from "../components/Header";
import "../styles/Home.css";

// ICONOS
import trophy from "../assets/imgs/icons/trophy.svg";
import video from "../assets/imgs/icons/video.svg";

import { Fragment, useEffect, useState } from "react";
import { CardCompeticion } from "../components/CardCompeticion";

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

  const competicionesOrdenadas = [...competiciones].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <Fragment>
      <Header />

      <main>
        <article className="competicionesHome">
          <section className="titulo">
            <img src={trophy} alt="Trophy Icon" />
            <h1>Últimas competiciones</h1>
          </section>
          <section className="sectionAthletes">
            {loading && (
              <article className="loading">
                <section className="loader"></section>
                <p>Cargando competiciones...</p>
              </article>
            )}
            {competicionesOrdenadas && (
              <section className="sectionCompeticiones">
                {competicionesOrdenadas.length > 0 &&
                  competicionesOrdenadas.map((competicion) => (
                    <CardCompeticion
                      competicion={competicion}
                      key={competicion._id}
                    />
                  ))}
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
      </main>
    </Fragment>
  );
};
