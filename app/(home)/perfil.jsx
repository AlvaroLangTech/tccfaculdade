import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

import CardFormulario from "../../components/ui/CardFormulario";
import CampoTexto from "../../components/ui/CampoTexto";
import BotaoPrimario from "../../components/ui/BotaoPrimario";

export default function TelaPerfil() {
  const { usuario } = useAuth();
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    const cancelarEscuta = onSnapshot(
      doc(db, "usuarios", usuario.uid),
      (doc) => {
        if (doc.exists()) {
          const dados = doc.data();
          setNome(dados.nome || "");
          setFoto(dados.fotoPerfil || "");
        }
        setCarregando(false);
      },
      () => {
        setCarregando(false);
      },
    );

    const timer = setTimeout(() => setCarregando(false), 5000);

    return () => {
      cancelarEscuta();
      clearTimeout(timer);
    };
  }, [usuario]);

  const salvarAlteracoes = async () => {
    if (!nome.trim()) {
      const msg = "O nome não pode ser vazio.";
      return Platform.OS === "web" ? alert(msg) : Alert.alert("Atenção", msg);
    }

    setSalvando(true);
    try {
      await updateProfile(usuario, {
        displayName: nome,
        photoURL: foto,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000),
      );

      try {
        await Promise.race([
          setDoc(
            doc(db, "usuarios", usuario.uid),
            {
              nome,
              fotoPerfil: foto,
              email: usuario.email,
              atualizadoEm: new Date().toISOString(),
            },
            { merge: true },
          ),
          timeoutPromise,
        ]);
      } catch (err) {
        console.warn("Firestore timeout.");
      }

      await usuario.reload();
      const msgSucesso = "Perfil atualizado com sucesso! 🎉";
      Platform.OS === "web"
        ? alert(msgSucesso)
        : Alert.alert("Sucesso!", msgSucesso);
    } catch (e) {
      const msgErro = "Erro ao salvar alterações.";
      Platform.OS === "web" ? alert(msgErro) : Alert.alert("Erro", msgErro);
    } finally {
      setSalvando(false);
    }
  };

  if (carregando)
    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
    >
      <View style={estilos.avatarContainer}>
        <View style={estilos.avatar}>
          {foto ? (
            <Image source={{ uri: foto }} style={estilos.imagemAvatar} />
          ) : (
            <Text style={estilos.inicialAvatar}>
              {nome ? nome[0].toUpperCase() : "?"}
            </Text>
          )}
        </View>
        <Text style={estilos.email}>{usuario?.email}</Text>
      </View>

      <CardFormulario titulo="Editar Perfil">
        <CampoTexto label="Nome" value={nome} onChange={setNome} />
        <CampoTexto label="URL da Foto" value={foto} onChange={setFoto} />
        <BotaoPrimario
          titulo="Salvar Alterações"
          onPress={salvarAlteracoes}
          carregando={salvando}
          cor="#2563EB"
        />
      </CardFormulario>

      <CardFormulario titulo="Dados da Conta">
        <View style={estilos.infoRow}>
          <Text style={estilos.infoLabel}>ID do Usuário</Text>
          <Text style={estilos.infoValor} numberOfLines={1}>
            {usuario?.uid}
          </Text>
        </View>
      </CardFormulario>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF2FF" },
  conteudo: { padding: 24, paddingBottom: 40, gap: 16 },
  centralizado: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatarContainer: { alignItems: "center", marginBottom: 8 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
  },
  imagemAvatar: { width: "100%", height: "100%" },
  inicialAvatar: { color: "#fff", fontSize: 42, fontWeight: "bold" },
  email: { color: "#64748B", fontSize: 13 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  infoValor: { fontSize: 11, color: "#94A3B8" },
});
