import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  memoryLocalCache, 
  enableNetwork, 
  getFirestore 
} from 'firebase/firestore';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGEfh0N5EUB-Q1Lh2chsJ-mAb-hqdTJ1U",
  authDomain: "tccfaculdade-8f487.firebaseapp.com",
  projectId: "tccfaculdade-8f487",
  storageBucket: "tccfaculdade-8f487.firebasestorage.app",
  messagingSenderId: "858013689360",
  appId: "1:858013689360:web:5991663a01ece5b5330c95",
  measurementId: "G-G7C576XC2H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Inicialização resiliente do Firestore para ambiente Web/HMR
let dbInstance;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
    localCache: memoryLocalCache(),
  });
} catch (e) {
  dbInstance = getFirestore(app);
}

export const db = dbInstance;

// Força tentativa de conexão ao carregar o serviço
enableNetwork(db).catch(() => {});

export default app;
