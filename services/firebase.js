// ============================================================
// 🎓 CONFIGURAÇÃO DO FIREBASE (Módulo de Segurança Sênior)
// ============================================================
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  memoryLocalCache, 
  enableNetwork, 
  getFirestore 
} from 'firebase/firestore';

// 1. Chaves do Projeto (NUNCA mudar estas chaves)
const firebaseConfig = {
  apiKey: "AIzaSyAGEfh0N5EUB-Q1Lh2chsJ-mAb-hqdTJ1U",
  authDomain: "tccfaculdade-8f487.firebaseapp.com",
  projectId: "tccfaculdade-8f487",
  storageBucket: "tccfaculdade-8f487.firebasestorage.app",
  messagingSenderId: "858013689360",
  appId: "1:858013689360:web:5991663a01ece5b5330c95",
  measurementId: "G-G7C576XC2H"
};

// 2. Inicialização do App
const app = initializeApp(firebaseConfig);

// 3. Serviço de Autenticação
export const auth = getAuth(app);

// 4. Inicialização Segura do Firestore (Proteção contra erro "already declared")
let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true, // Estabilidade no Web
    useFetchStreams: false,             // Evita travamentos no Chrome
    localCache: memoryLocalCache(),    // Ignora cache bugado do navegador
  });
} catch (e) {
  // Se já estiver rodando, apenas pega a instância que já existe
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

// 5. Comando de Força Bruta para Conexão
enableNetwork(db).catch(() => {
  /* Silencioso: Se falhar aqui, o app tenta reconectar sozinho depois */
});

export default app;
