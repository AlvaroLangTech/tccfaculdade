/**
 * 🎓 EXPLICAÇÃO PARA O VÍDEO (A LÓGICA DO SEGURANÇA):
 * "Este arquivo é o coração da segurança do app. Eu chamo ele de Route Guard (Guarda de Rota)."
 * "Ele funciona como um segurança na porta de um shopping: ele verifica se você tem permissão para entrar."
 */

import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

/**
 * FUNÇÃO: ControleDeRota (O Segurança)
 * Esta função fica vigiando o usuário o tempo todo.
 */
function ControleDeRota() {
  // 1. useAuth: Pergunta ao Firebase: "Tem alguém logado agora?"
  const { usuario, carregando } = useAuth();
  
  // 2. useSegments: Descobre em qual "corredor" do app o usuário está tentando entrar.
  const segments = useSegments(); 
  
  const router = useRouter();

  // 3. useEffect: São os "olhos" do segurança. Ele executa toda vez que algo muda.
  useEffect(() => {
    if (carregando) return; // Se ainda estiver carregando, o segurança espera.

    // 4. Lógica de Redirecionamento:
    // Se o usuário NÃO está logado e tenta entrar na HOME (área privada)...
    const estaEmRotaProtegida = segments[0] === '(home)';

    if (!usuario && estaEmRotaProtegida) {
      // ... o segurança barra a entrada e manda ele para o LOGIN.
      router.replace('/(auth)/login');
    } 
    // Se o usuário JÁ está logado e tenta ir para o LOGIN...
    else if (usuario && !estaEmRotaProtegida) {
      // ... o segurança diz: "Você já está logado!" e manda ele para a HOME.
      router.replace('/(home)');
    }
  }, [usuario, carregando, segments]);

  // Se o app ainda estiver checando o crachá do usuário, mostra uma rodinha de carregamento.
  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4FF' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Se estiver tudo certo, o segurança abre as portas (Stack) para as telas do app.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}

/**
 * FUNÇÃO: RootLayout (O Pai de Todos)
 * Esta é a primeira função que roda no app. Ela abraça todo o projeto
 * com o "AuthProvider", que é o que permite a todas as telas saberem quem está logado.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <ControleDeRota />
    </AuthProvider>
  );
}
