// REACT
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// CSS
import "../styles/loginregister.css";

// IMGs
import logo from "../assets/imgs/logo.png";
import email from "../assets/imgs/icons/email.svg";
import lock from "../assets/imgs/icons/lock.svg";
import google from "../assets/imgs/icons/google.svg";
import name from "../assets/imgs/icons/name.svg";
import lastname from "../assets/imgs/icons/lastname.svg";

// CONTEXTO
import { AuthContext } from "../context/AuthContext";

// COMPONENTE
export const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para cambiar entre login y registro

  // REACT ROUTER
  const navigate = useNavigate();

  // CONTEXTO
  const { login } = useContext(AuthContext);

  // LOGIN
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [MailRegister, setMailRegister] = useState("");
  const [PasswordRegister, setPasswordRegister] = useState("");
  const [Name, setName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [ErrorLogin, setErrorLogin] = useState("");
  const [ErrorRegister, setErrorRegister] = useState("");

  // REGISTRO

  // REFERENCIAS
  const rMail = useRef();
  const rPassword = useRef();

  const rMailRegister = useRef();
  const rPasswordRegister = useRef();
  const rName = useRef();
  const rLastname = useRef();

  //Función que maneja el login del usuario
  async function handleLogin(e) {
    e.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    const regMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Expresion que comprueba que sea un mail válido
    if (Mail === "" || !regMail.test(Mail)) {
      setErrorLogin("Introduce un correo electrónico válido");
    } else {
      let res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Cabecera de la petición
        body: JSON.stringify({
          email: Mail,
          password: Password,
        }),
      });
      console.log(res); // Verifica la estructura de la respuesta en la consola

      if (res.ok) {
        let userData = await res.json();
        login(userData);
        navigate("/inicio");
      } else setErrorLogin("Las claves de acceso son incorrectas");
    }
  }

  // FUNCION QUE MANEJA EL REGISTRO DE USUARIOS
  async function handleRegister(e) {
    e.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    const regMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Expresion que comprueba que sea un mail válido
    if (Mail === "" || !regMail.test(Mail)) {
      setErrorRegister("Introduce un correo electrónico válido");
    } else {
      let res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Cabecera de la petición
        body: JSON.stringify({
          email: MailRegister,
          password: PasswordRegister,
          name: Name,
          lastname: Lastname,
        }),
      });
      console.log(res); // Verifica la estructura de la respuesta en la consola

      if (res.ok) {
        let userData = await res.json();
        login(userData);
        navigate("/inicio");
      } else setErrorRegister("Datos incorrectos");
    }
  }

  //UseEffect
  useEffect(() => {
    setErrorLogin("");
    setErrorRegister("");
  }, [Mail, Password]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  function handleClickButtons(e) {
    e.preventDefault();
  }

  return (
    <main className="fondoLogin">
      <article className={`container ${!isLogin ? "toggle" : ""}`}>
        <section className="formSection">
          <form className="loginForm" method="POST" onSubmit={handleLogin}>
            <h1>Iniciar sesión</h1>
            <section className="inputsForm">
              <a>Introduzca su correo y contraseña</a>
              <section className="container-input">
                <img src={email} alt="Email Icon" />
                <input
                  type="email"
                  className="email"
                  placeholder="Correo electrónico"
                  ref={rMail}
                  value={Mail}
                  onChange={() => setMail(rMail.current.value)}
                />
              </section>
              <section className="container-input">
                <img src={lock} alt="Lock Icon" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  ref={rPassword}
                  value={Password}
                  onChange={() => setPassword(rPassword.current.value)}
                />
              </section>
              <p className="error">{ErrorLogin}</p>
            </section>
            <a>Ó inicia sesión con</a>
            <section className="redesLogin">
              <button onClick={handleClickButtons}>
                <img src={google} alt="Google Icon" />
              </button>
              <button onClick={handleClickButtons}>
                <img src={google} alt="Google Icon" />
              </button>
            </section>
            <a className="textoReset">¿Olvidaste tu contraseña?</a>
            <button className="btnLogin">Iniciar sesión</button>
          </form>
        </section>

        <section className="formSection">
          <form
            className="registerForm"
            method="POST"
            onSubmit={handleRegister}
          >
            <h1>Regístrarse</h1>
            <section className="inputsForm">
              <a>Introduzca sus datos para registrarse</a>
              <section className="container-input">
                <img src={name} alt="Name Icon" />
                <input
                  type="text"
                  className="name"
                  placeholder="Nombre"
                  ref={rName}
                  value={Name}
                  onChange={() => setName(rName.current.value)}
                />
              </section>
              <section className="container-input">
                <img src={lastname} alt="Lastname Icon" />
                <input
                  type="text"
                  placeholder="Apellidos"
                  ref={rLastname}
                  value={Lastname}
                  onChange={() => setLastname(rLastname.current.value)}
                />
              </section>
              <section className="container-input">
                <img src={email} alt="Email Icon" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  ref={rMailRegister}
                  value={MailRegister}
                  onChange={() => setMailRegister(rMailRegister.current.value)}
                />
              </section>
              <section className="container-input">
                <img src={lock} alt="Lock Icon" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  ref={rPasswordRegister}
                  value={PasswordRegister}
                  onChange={() =>
                    setPasswordRegister(rPasswordRegister.current.value)
                  }
                />
              </section>
              <p className="error">{ErrorRegister}</p>
            </section>
            <a>Ó regístrate con</a>
            <section className="redesRegistro">
              <button>
                <img src={google} alt="Google Icon" />
              </button>
              <button>
                <img src={google} alt="Google Icon" />
              </button>
            </section>
            <button className="btnRegistro">Registrarse</button>
          </form>
        </section>

        <article className="contenedorBienvenida">
          <section className="bienvenidoSignUp welcome">
            <h3>
              ¡Bienvenido a <a>PowerTrackingSystem!</a>
            </h3>
            <img src={logo} alt="Logo" />
            <p>
              Ingrese sus datos personales para usar todas las funciones del
              sitio.
            </p>
            <button className="btnLogin" onClick={toggleForm}>
              Registrarse
            </button>
          </section>
          <div className="bienvenidoLogin welcome">
            <h3>
              ¡Bienvenido a <a>PowerTrackingSystem!</a>
            </h3>
            <img src={logo} alt="Logo" />
            <p>
              Regístrese con sus datos personales para usar todas las funciones
              del sitio.
            </p>
            <button className="btnLogin" onClick={toggleForm}>
              Iniciar sesión
            </button>
          </div>
        </article>
      </article>
    </main>
  );
};
