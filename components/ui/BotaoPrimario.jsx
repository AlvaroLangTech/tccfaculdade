import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";

export default function BotaoPrimario({
  titulo,
  onPress,
  carregando,
  cor = "#2563EB",
}) {
  return (
    <TouchableOpacity
      style={[estilos.botao, { backgroundColor: cor }]}
      onPress={onPress}
      disabled={carregando}
      activeOpacity={0.8}
    >
      {carregando ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={estilos.texto}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  texto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
