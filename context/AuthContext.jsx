import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(auth, (usuarioAtual) => {
      setUsuario(usuarioAtual);
      setCarregando(false);
    });

    return cancelarObservador;
  }, []);

  const fazerLogout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, fazerLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
