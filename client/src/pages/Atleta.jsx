import { Fragment, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// IMGS
import back from "../assets/imgs/icons/back.svg";
import muscle from "../assets/imgs/icons/muscle.svg";
import person from "../assets/imgs/icons/person.svg";
import data from "../assets/imgs/icons/data.svg";
import stats from "../assets/imgs/icons/stats.svg";

// CSS
import "../styles/Atleta.css";

// COMPONENTS
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Atleta = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://localhost:3000/api/atletas/${_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("ERROR");
        }
      })
      .then((data) => {
        console.log("Respuesta de la API:", data);
        setTimeout(() => {
          console.log(data.atleta.imagen);
          setAtleta(data.atleta);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [_id]);

  const [mejoresResultados, setMejoresResultados] = useState({
    squat: { valor: 0 },
    bench_press: { valor: 0 },
    deadlift: { valor: 0 },
    total: { valor: 0 },
    gl_points: { valor: 0 },
  }); // ARRAY DE OBJETOS QUE CONTIENE CADA CAMPO OBTENIDO DEL HISTORIAL_COMPETICIONES

  const [competiciones, setCompeticiones] = useState(0);
  const [victorias, setVictorias] = useState(0);
  const [podios, setPodios] = useState(0);

  // COMPROBAMOS QUE HAYA ATLETAS Y COMPARAMOS SUS RESULTADOS ACTUALES CON LOS DE LAS COMPETICIONES, PARA ASI ENCONTRAR EL MAYOR
  useEffect(() => {
    if (atleta?.historial_resultados?.length > 0) {
      const mejores = atleta.historial_resultados.reduce(
        (actual, resultado) => {
          if (
            resultado.squat &&
            (!actual.squat || resultado.squat > actual.squat.valor)
          ) {
            actual.squat = {
              valor: resultado.squat,
            };
          }
          if (
            resultado.bench_press &&
            (!actual.bench_press ||
              resultado.bench_press > actual.bench_press.valor)
          ) {
            actual.bench_press = {
              valor: resultado.bench_press,
            };
          }
          if (
            resultado.deadlift &&
            (!actual.deadlift || resultado.deadlift > actual.deadlift.valor)
          ) {
            actual.deadlift = {
              valor: resultado.deadlift,
            };
          }
          if (
            resultado.total &&
            (!actual.total || resultado.total > actual.total.valor)
          ) {
            actual.total = { valor: resultado.total };
          }
          if (
            resultado.gl_points &&
            (!actual.gl_points || resultado.gl_points > actual.gl_points.valor)
          ) {
            actual.gl_points = {
              valor: resultado.gl_points,
            };
          }
          return actual;
        },
        {}
      );
      setMejoresResultados(mejores);
      setCompeticiones(atleta.historial_resultados.length);
      let victorias = Math.floor(Math.random() * competiciones);
      setVictorias(victorias);
      let podios = Math.floor(Math.random() * competiciones);
      setPodios(podios);
    }
  }, [atleta, competiciones]);

  return (
    <Fragment>
      <Header />

      <main>
        <section className="volverAtletas" onClick={() => navigate("/atletas")}>
          <img src={back} alt="" />
          <h1>TODOS LOS ATLETAS</h1>
        </section>
        {/* Muestra un mensaje de carga */}
        {loading && (
          <>
            <article className="loading">
              <section className="loader"></section>
              <p>Cargando atleta...</p>
            </article>
          </>
        )}

        {/* Renderiza el atleta solo si los datos existen */}
        {atleta && (
          <Fragment>
            <section className="datosAtleta">
              <article className="nombreAtleta">
                <h2>
                  {atleta.nombre.toUpperCase()} <br />{" "}
                  {atleta.apellidos.toUpperCase()}
                </h2>
                <p>
                  {atleta.club.nombre} | -{atleta.categoria}Kg
                </p>
              </article>

              <section className="estadisticasAtleta">
                <img src={muscle} alt="Marcas Icon" />
                <p>MARCAS ACTUALES</p>
              </section>
              <section className="cuadroEstadisticasAtleta">
                <div className="estadistica">
                  <p className="nombreEstadistica">SENTADILLA</p>
                  <p>{mejoresResultados.squat.valor}</p>
                </div>
                <hr />
                <div className="estadistica">
                  <p className="nombreEstadistica">PRESS BANCA</p>
                  <p>{mejoresResultados.bench_press.valor}</p>
                </div>
                <hr />
                <div className="estadistica">
                  <p className="nombreEstadistica">PESO MUERTO</p>
                  <p>{mejoresResultados.deadlift.valor}</p>
                </div>
                <hr />
                <div className="estadistica">
                  <p className="nombreEstadistica">TOTAL</p>
                  <p>{mejoresResultados.total.valor}</p>
                </div>
                <hr />
                <div className="estadistica">
                  <p className="nombreEstadistica">GL POINTS</p>
                  <p>{mejoresResultados.gl_points.valor}</p>
                </div>
              </section>
              <img src={atleta.imagen} alt="" className="fotoAtleta" />
            </section>

            <article className="trayectoriaAtleta">
              <section className="titulo">
                <img src={person} alt="Path Icon" />
                <h2>Trayectoria</h2>
              </section>
              <section className="titulo">
                <img src={data} alt="Data Icon" />
                <h2>Estadísticas</h2>
              </section>
              <p className="biografia">{atleta.trayectoria}</p>
              <article className="estadisticas">
                <section>
                  <h3>COMPETICIONES</h3>
                  <p>{competiciones}</p>
                </section>
                <section>
                  <h3>VICTORIAS</h3>
                  <p>{victorias}</p>
                </section>
                <section>
                  <h3>PODIOS</h3>
                  <p>{podios}</p>
                </section>
              </article>
            </article>

            <article className="progresion">
              <section className="titulo">
                <img src={stats} alt="" />
                <h2>Progresión</h2>
              </section>
            </article>

            <Footer />
          </Fragment>
        )}
      </main>
    </Fragment>
  );
};
