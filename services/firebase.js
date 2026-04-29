// ============================================================
// CONFIGURAÇÃO DO FIREBASE
// App: tccFaculdade | Projeto: App de Controle de Gastos Pessoais
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Chaves de configuração do projeto no Firebase Console
// Obtidas em: console.firebase.google.com → tccFaculdade → Configurações
const firebaseConfig = {
  apiKey: "AIzaSyAGEfh0N5EUB-Q1Lh2chsJ-mAb-hqdTJ1U",
  authDomain: "tccfaculdade-8f487.firebaseapp.com",
  projectId: "tccfaculdade-8f487",
  storageBucket: "tccfaculdade-8f487.firebasestorage.app",
  messagingSenderId: "858013689360",
  appId: "1:858013689360:web:5991663a01ece5b5330c95",
  measurementId: "G-G7C576XC2H"
};

// Inicializa o app Firebase com as configurações acima
const app = initializeApp(firebaseConfig);

// Serviço de autenticação (login, cadastro, logout, recuperação de senha)
export const auth = getAuth(app);

// Banco de dados Firestore (armazena dados do perfil do usuário)
export const db = getFirestore(app);

export default app;
