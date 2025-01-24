import PropTypes from "prop-types";

import "../styles/CardCompeticion.css";

export const CardCompeticion = ({ competicion }) => {
  const fechaFormateada = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(competicion.fecha));

  return (
    <article className="cardCompeticion">
      <img
        src={competicion.imagen}
        alt={competicion.nombre}
        className="imgCompeticion"
      />
      <section className="infoCompeticion">
        <h2>{competicion.nombre}</h2>
        <p className="ubicacionComp">
          {competicion.localizacion} | {fechaFormateada}
        </p>
      </section>
    </article>
  );
};

CardCompeticion.propTypes = {
  competicion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    localizacion: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
  }),
};
