import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";

function ControleDeRota() {
  const { usuario, carregando } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (carregando) return;

    const estaEmRotaProtegida = segments[0] === "(home)";

    if (!usuario && estaEmRotaProtegida) {
      router.replace("/(auth)/login");
    } else if (usuario && !estaEmRotaProtegida) {
      router.replace("/(home)");
    }
  }, [usuario, carregando, segments]);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F4FF",
        }}
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ControleDeRota />
    </AuthProvider>
  );
}
