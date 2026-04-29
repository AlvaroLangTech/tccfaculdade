import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function TelaHome() {
  const { usuario, fazerLogout } = useAuth();

  const confirmarLogout = () => {
    if (Platform.OS === "web") {
      if (confirm("Tem certeza que deseja encerrar sua sessão?")) {
        fazerLogout();
      }
    } else {
      Alert.alert(
        "Sair do App",
        "Tem certeza que deseja encerrar sua sessão?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sair", style: "destructive", onPress: fazerLogout },
        ],
      );
    }
  };

  const primeiroNome = usuario?.displayName?.split(" ")[0] || "Usuário";

  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
    >
      <View style={estilos.saudacao}>
        <Text style={estilos.ola}>Olá, {primeiroNome}</Text>
        <Text style={estilos.data}>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </Text>
      </View>

      <View style={estilos.cardSaldo}>
        <Text style={estilos.labelSaldo}>Saldo do Mês</Text>
        <Text style={estilos.valorSaldo}>R$ 0,00</Text>
        <View style={estilos.dividerSaldo} />
        <Text style={estilos.avisoSaldo}>
          Acompanhe seus rendimentos e despesas aqui.
        </Text>
      </View>

      <Text style={estilos.secaoTitulo}>Ações Rápidas</Text>
      <View style={estilos.gridAcoes}>
        {[
          { icone: "cash-outline", titulo: "Gastos" },
          { icone: "trending-down", titulo: "Metas" },
          { icone: "bar-chart-outline", titulo: "Relatórios" },
          { icone: "list-outline", titulo: "Categorias" },
        ].map((item) => (
          <View key={item.titulo} style={estilos.cardAcao}>
            <Ionicons
              name={item.icone}
              size={32}
              color="#2563EB"
              style={{ marginBottom: 8 }}
            />
            <Text style={estilos.tituloAcao}>{item.titulo}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={estilos.botaoSair} onPress={confirmarLogout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#DC2626"
          style={{ marginRight: 8 }}
        />
        <Text style={estilos.textoBotaoSair}>Encerrar Sessão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF2FF" },
  conteudo: { padding: 20, paddingBottom: 40 },
  saudacao: { marginBottom: 20 },
  ola: { fontSize: 24, fontWeight: "bold", color: "#1E293B" },
  data: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    textTransform: "capitalize",
  },
  cardSaldo: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#2563EB",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  labelSaldo: { color: "#BFDBFE", fontSize: 14, fontWeight: "600" },
  valorSaldo: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dividerSaldo: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 12,
  },
  avisoSaldo: { color: "#93C5FD", fontSize: 12 },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },
  gridAcoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  cardAcao: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: "47%",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  tituloAcao: { fontSize: 13, fontWeight: "700", color: "#1E293B" },
  botaoSair: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1.5,
    borderColor: "#FCA5A5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  textoBotaoSair: { color: "#DC2626", fontSize: 15, fontWeight: "700" },
});
