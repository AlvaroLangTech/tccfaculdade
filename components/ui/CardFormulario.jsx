import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CardFormulario({ titulo, children }) {
  return (
    <View style={estilos.card}>
      {titulo && <Text style={estilos.titulo}>{titulo}</Text>}
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },
});
