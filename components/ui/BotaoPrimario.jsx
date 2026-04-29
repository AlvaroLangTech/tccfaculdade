// ============================================================
// COMPONENTE: BotaoPrimario
// Botão reutilizável com suporte a estado de carregamento
// Usado em: Login, Cadastro, RecuperarSenha, Perfil
//
// Props:
//   titulo     → texto exibido no botão
//   onPress    → função executada ao clicar
//   carregando → se true, exibe spinner (ActivityIndicator)
//   cor        → cor de fundo do botão (padrão: azul)
// ============================================================

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function BotaoPrimario({ titulo, onPress, carregando = false, cor = '#2563EB' }) {
  return (
    <TouchableOpacity
      style={[estilos.botao, { backgroundColor: cor }, carregando && estilos.desabilitado]}
      onPress={onPress}
      disabled={carregando}
      activeOpacity={0.85}
    >
      {/* Se estiver carregando, mostra o spinner. Caso contrário, o texto */}
      {carregando
        ? <ActivityIndicator color="#fff" />
        : <Text style={estilos.texto}>{titulo}</Text>
      }
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  botao:       { borderRadius: 12, padding: 16, alignItems: 'center', justifyContent: 'center' },
  desabilitado:{ opacity: 0.65 },
  texto:       { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
