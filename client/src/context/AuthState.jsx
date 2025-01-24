// Proveedor del contexto
import PropTypes from "prop-types";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null); // Estado en memoria (NO usa localStorage)

  const login = (userData) => {
    setUser(userData); // Guarda los datos del usuario en memoria
    console.log(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};
