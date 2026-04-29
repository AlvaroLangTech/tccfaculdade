// ============================================================
// CONTEXTO DE AUTENTICAÇÃO
// Gerencia o estado de login em todo o app
// Quando o usuário loga ou desloga, todos os componentes sabem
// ============================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

// Cria o contexto que vai compartilhar o estado de autenticação
const AuthContext = createContext({});

// Hook personalizado — facilita o acesso ao contexto em qualquer tela
export const useAuth = () => useContext(AuthContext);

// Componente Provedor — envolve o app inteiro e distribui o estado
export function AuthProvider({ children }) {
  // "usuario" guarda os dados do usuário logado. null = ninguém logado
  const [usuario, setUsuario] = useState(null);

  // "carregando" evita flickering enquanto verifica o token salvo
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Firebase observa automaticamente mudanças no estado de autenticação
    // Isso inclui: login, logout, e token salvo do app anterior
    const cancelarObservador = onAuthStateChanged(auth, (usuarioAtual) => {
      setUsuario(usuarioAtual); // Atualiza o estado com o usuário atual
      setCarregando(false);     // Terminou de carregar
    });

    // Quando o componente for removido da tela, cancela o observador
    return cancelarObservador;
  }, []);

  // Função de logout — invalida o token e limpa a sessão (HU5)
  const fazerLogout = async () => {
    await signOut(auth);
    // Após signOut, o onAuthStateChanged detecta e seta usuario = null
    // O Route Guard redireciona automaticamente para a tela de Login
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, fazerLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
