/**
 * 🎓 EXPLICAÇÃO PARA O VÍDEO (REQUISITO HU2 - ROUTE GUARD):
 * "Aqui implementei o segurança do app, chamado de Route Guard."
 * "O sistema monitora o estado de autenticação do Firebase."
 * "Se o usuário não estiver logado, ele é automaticamente impedido de acessar a Home."
 * "Isso garante que dados financeiros só sejam vistos por quem tem conta."
 */

import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ControleDeRota() {
  const { usuario, carregando } = useAuth();
  const segments = useSegments(); // Qual grupo de rota está ativo
  const router = useRouter();

  useEffect(() => {
    // Ainda carregando a sessão salva — não faz nada ainda
    if (carregando) return;

    // Verifica se o usuário está tentando acessar uma rota protegida
    const estaEmRotaProtegida = segments[0] === '(home)';

    if (!usuario && estaEmRotaProtegida) {
      // Usuário NÃO logado tentando acessar área protegida → manda para Login
      router.replace('/(auth)/login');
    } else if (usuario && !estaEmRotaProtegida) {
      // Usuário JÁ logado tentando acessar Login/Cadastro → manda para Home
      router.replace('/(home)');
    }
  }, [usuario, carregando, segments]);

  // Enquanto carrega a sessão, mostra um indicador de progresso
  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4FF' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Define a estrutura de navegação: telas de auth e telas protegidas
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}

// Layout raiz: envolve tudo com o provedor de autenticação
export default function RootLayout() {
  return (
    <AuthProvider>
      <ControleDeRota />
    </AuthProvider>
  );
}
