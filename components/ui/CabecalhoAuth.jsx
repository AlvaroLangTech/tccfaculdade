// ============================================================
// COMPONENTE: CabecalhoAuth (PROFISSIONAL)
// Agora usa ícones vetoriais (SVG) em vez de emojis
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Maternal: Usando ícones de verdade agora!

export default function CabecalhoAuth({ icone, titulo, subtitulo, corFundo = '#2563EB' }) {
  return (
    <View style={estilos.container}>
      {/* Círculo colorido com o ícone vetorial */}
      <View style={[estilos.circulo, { backgroundColor: corFundo }]}>
        <Ionicons name={icone} size={40} color="#fff" />
      </View>

      <Text style={estilos.titulo}>{titulo}</Text>
      {subtitulo && <Text style={estilos.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 32 },
  circulo:   {
    width:        80,
    height:       80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems:   'center',
    marginBottom: 16,
    shadowColor:   '#000',
    shadowOpacity: 0.1,
    shadowRadius:  10,
    elevation:     5,
  },
  titulo:   { fontSize: 26, fontWeight: 'bold', color: '#1E293B' },
  subtitulo:{ fontSize: 13, color: '#64748B', marginTop: 6, textAlign: 'center', lineHeight: 20 },
});

