import PropTypes from "prop-types";

import "../styles/CardCompeticion.css";

// FUNCION QUE FORMATEA LA FECHA PARA QUE SALGA DD de mes año || DD - DD de mes año
const formatearFecha = (inicio, fin) => {
  // RECIBE EL INICIO Y EL FIN DE LA COMPETICION
  const opcionesDia = { day: "2-digit" }; // DIA EN 2 DIGITOS
  const opcionesMes = { month: "long" }; // MES
  const opcionesAno = { year: "numeric" }; // AÑO

  const fechaInicio = new Date(inicio); // CREAMOS UNA NUEVA FECHA CON LA FECHA INICIAL
  const fechaFin = fin ? new Date(fin) : null; // CREAMOS UNA NUEVA FECHA DE FIN EN CASO DE QUE LA HAYA, SI NO SERÁ NULOL

  const diaInicio = new Intl.DateTimeFormat("es-ES", opcionesDia).format(
    fechaInicio
  ); // OBTENEMOS EL DIA DE INICIO PASANDOLO A FORMATO ESPAÑOL Y CON LAS OPCIONES ANTERIORMENTE CREADAS
  const mesInicio = new Intl.DateTimeFormat("es-ES", opcionesMes).format(
    fechaInicio
  ); // OBTENEMOS EL MES DE INICIO PASANDOLO A FORMATO ESPAÑOL Y CON LAS OPCIONES ANTERIORMENTE CREADAS
  const anoInicio = new Intl.DateTimeFormat("es-ES", opcionesAno).format(
    fechaInicio
  ); // OBTENEMOS EL AÑP DE INICIO PASANDOLO A FORMATO ESPAÑOL Y CON LAS OPCIONES ANTERIORMENTE CREADAS

  if (!fechaFin) return `${diaInicio} de ${mesInicio} ${anoInicio}`; // SI NO HAY FECHA DE FIN SIMPLEMENTE DEVOLVEMOS LA FECHA

  // SI HAY FECHA DE FIN FORMATEAMOS LA FECHA DE IGUAL MANERA QUE CON LA DE INICIO

  const diaFin = new Intl.DateTimeFormat("es-ES", opcionesDia).format(fechaFin);
  const mesFin = new Intl.DateTimeFormat("es-ES", opcionesMes).format(fechaFin);
  const anoFin = new Intl.DateTimeFormat("es-ES", opcionesAno).format(fechaFin);

  // SI TANTO LOS MESES COMO EL AÑO ES EL MISMO, SIMPLEMENTE RETORNA LOS 2 DIAS Y EL MES Y EL AÑO
  if (mesInicio === mesFin && anoInicio === anoFin)
    return `${diaInicio} - ${diaFin} de ${mesInicio} ${anoInicio}`;

  // SI LOS MESES NO SON LOS MISMOS, COMPRUEBA LOS AÑOS QUE SI LO SEAN
  if (anoInicio === anoFin)
    return `${diaInicio} de ${mesInicio} - ${diaFin} de ${mesFin} ${anoInicio}`;

  // EN CASO DE QUE NI EL MES, NI EL AÑO SEA EL MISMO, DEVUELVE AMBAS FECHAS FORMATEADAS
  return `${diaInicio} de ${mesInicio} ${anoInicio} - ${diaFin} de ${mesFin} ${anoFin}`;
};

// COMPONENTE QUE CONTIENE LA INFORMACIÓN DE LA COMPETICIÓN
export const CardCompeticion = ({ competicion }) => {
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
          {competicion.ciudad}, {competicion.pais} |{" "}
          {formatearFecha(competicion.fecha_inicio, competicion.fecha_fin)}
        </p>
      </section>
    </article>
  );
};

// DEFINIMOS LAS VARIABLES
CardCompeticion.propTypes = {
  competicion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    ciudad: PropTypes.string.isRequired,
    pais: PropTypes.string.isRequired,
    fecha_inicio: PropTypes.string.isRequired,
    fecha_fin: PropTypes.string,
    imagen: PropTypes.string.isRequired,
  }),
};
