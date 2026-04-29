// ============================================================
// COMPONENTE: CardFormulario
// Container branco com sombra para formulários
// Mantém o padrão visual idêntico em todas as telas
//
// Props:
//   titulo   → título visível dentro do card (opcional)
//   children → conteúdo filho (inputs, botões, links)
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardFormulario({ titulo, children }) {
  return (
    <View style={estilos.card}>
      {/* Exibe o título do card somente se for passado */}
      {titulo && <Text style={estilos.titulo}>{titulo}</Text>}

      {/* Renderiza o conteúdo passado entre as tags do componente */}
      {children}
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius:    20,
    padding:         24,
    // Sombra nativa (iOS e Android)
    shadowColor:     '#000',
    shadowOpacity:   0.08,
    shadowRadius:    16,
    elevation:       5,
  },
  titulo: {
    fontSize:     18,
    fontWeight:   'bold',
    color:        '#1E293B',
    marginBottom: 20,
  },
});
