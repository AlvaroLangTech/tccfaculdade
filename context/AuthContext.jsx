import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log("🔍 Iniciando observador de autenticação...");
    
    const cancelarObservador = onAuthStateChanged(auth, (usuarioAtual) => {
      console.log("✅ Estado de autenticação recebido!");
      setUsuario(usuarioAtual);
      setCarregando(false);
    });

    // MODO SÊNIOR: Destrava o app após 5 segundos se o Firebase sumir
    const timeoutSeguranca = setTimeout(() => {
      if (carregando) {
        console.warn("⚠️ Firebase demorou demais. Liberando interface...");
        setCarregando(false);
      }
    }, 5000);

    return () => {
      cancelarObservador();
      clearTimeout(timeoutSeguranca);
    };
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
