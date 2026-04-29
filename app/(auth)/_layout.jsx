// Layout do grupo de telas não autenticadas (Login, Cadastro, Recuperar Senha)
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
