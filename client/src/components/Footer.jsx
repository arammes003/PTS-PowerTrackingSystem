import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const anoActual = new Date().getFullYear();

  return (
    <footer>
      <article className="articleFooter">
        {/* Navegación */}
        <section className="sectionFooter">
          <h4 className="titulosFooter">Navegación</h4>
          <p>
            <a onClick={() => navigate("/inicio")} className="opcionesFooter">
              Inicio
            </a>
          </p>
          <p>
            <a onClick={() => navigate("/atletas")} className="opcionesFooter">
              Atletas
            </a>
          </p>
          <p>
            <a onClick={() => navigate("/clubes")} className="opcionesFooter">
              Clubes
            </a>
          </p>
          <p>
            <a
              onClick={() => navigate("/competiciones")}
              className="opcionesFooter"
            >
              Competiciones
            </a>
          </p>
        </section>

        {/* Contacto */}
        <section className="sectionFooter">
          <h4 className="titulosFooter">Contacto</h4>
          <p className="textoFooter">
            Email:{" "}
            <a
              href="mailto:info@powertrackingsystem.com"
              className="opcionesFooter"
            >
              info@powertrackingsystem.com
            </a>
          </p>
          <p className="textoFooter">
            Teléfono:{" "}
            <a href="tel:+34696502155" className="opcionesFooter">
              +34 696 50 21 55
            </a>
          </p>
          <p className="textoFooter">Ubicación: Córdoba, España</p>
        </section>

        {/* Redes Sociales */}
        <section className="sectionFooter">
          <h4 className="titulosFooter">Síguenos</h4>
          <a href="#" className="redesFooter">
            Facebook
          </a>
          <a href="#" className="redesFooter">
            Instagram
          </a>
          <a href="#" className="redesFooter">
            Twitter
          </a>
          <a href="#" className="redesFooter">
            YouTube
          </a>
        </section>
      </article>

      {/* Derechos de autor */}
      <section className="copyright">
        <p className="textoFooter">
          &copy; {anoActual} PowerTrackingSystem. Todos los derechos reservados.
        </p>
      </section>
    </footer>
  );
};
