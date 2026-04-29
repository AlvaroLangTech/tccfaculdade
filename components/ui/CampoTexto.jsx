import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function CampoTexto({
  label,
  placeholder,
  value,
  onChange,
  tipo = "texto",
  erro = "",
}) {
  const ehEmail = tipo === "email";
  const ehSenha = tipo === "senha";

  return (
    <View style={estilos.container}>
      <Text style={[estilos.label, erro ? { color: "#DC2626" } : {}]}>
        {label}
      </Text>

      <TextInput
        style={[estilos.input, erro ? estilos.inputErro : {}]}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChange}
        keyboardType={ehEmail ? "email-address" : "default"}
        autoCapitalize={ehEmail || ehSenha ? "none" : "words"}
        autoCorrect={false}
        secureTextEntry={ehSenha}
      />

      {erro ? <Text style={estilos.textoErro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#1E293B",
  },
  inputErro: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  textoErro: {
    color: "#DC2626",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
});
