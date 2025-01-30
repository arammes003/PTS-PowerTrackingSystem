// FICHERO JSX QUE TIENE EL CONTENIDO DE LA TARJETA DEL ATLETA

// IMPORTAMOS FUNCIONES DE REACT
import { useEffect, useState } from "react";

// IMPORTAMOS PROPTYPES PARA LA DECLARACIÓN DE VARIABLES
import PropTypes from "prop-types";

// EXPORTAMOS EL COMPONENTE QUE RECIBE EL ATLETA POR PARÁMETROS
export const CardAtleta = ({ atleta }) => {
  const [mejoresResultados, setMejoresResultados] = useState({
    squat: { valor: 0 },
    bench_press: { valor: 0 },
    deadlift: { valor: 0 },
    total: { valor: 0 },
    gl_points: { valor: 0 },
  }); // ARRAY DE OBJETOS QUE CONTIENE CADA CAMPO OBTENIDO DEL HISTORIAL_COMPETICIONES

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
            actual.total = resultado.total;
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
    }
  }, [atleta]);

  return (
    <article
      className="cardAtleta"
      style={{ backgroundImage: `url(${atleta.imagen})` }} // Fixed the background image URL
    >
      <h3 className="atletaCategoriaCard">- {atleta.categoria} Kg</h3>
      <section className="atletaEstadisticasCard">
        <p className="textoAtletaCard">
          {atleta.nombre} <br /> {atleta.apellidos}
        </p>
        <p className="textoAtletaCard">
          {mejoresResultados.gl_points.valor} GL Points
        </p>
        <p>
          SQ: {mejoresResultados.squat.valor}kg {"  "}
          BP: {mejoresResultados.bench_press.valor}kg {"  "}
          DL: {mejoresResultados.deadlift.valor}kg {"  "}
        </p>
      </section>
    </article>
  );
};

// DEFINICION DE LAS VARIABLES DE LAS PROPS
CardAtleta.propTypes = {
  atleta: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    historial_resultados: PropTypes.arrayOf(
      PropTypes.shape({
        squat: PropTypes.number,
        bench_press: PropTypes.number,
        deadlift: PropTypes.number,
        total: PropTypes.number,
        gl_points: PropTypes.number,
      })
    ),
  }),
};
