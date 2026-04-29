// ============================================================
// TELA: Recuperar Senha (HU4 — Recuperação de Credenciais)
//
// Fluxo:
//  1. Usuário informa o e-mail cadastrado
//  2. Firebase gera um token temporário seguro
//  3. Envia um link de redefinição para o e-mail
//  4. O link expira automaticamente após 1 hora
// ============================================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '../../services/firebase';

import CabecalhoAuth  from '../../components/ui/CabecalhoAuth';
import CardFormulario from '../../components/ui/CardFormulario';
import CampoTexto     from '../../components/ui/CampoTexto';
import BotaoPrimario  from '../../components/ui/BotaoPrimario';

export default function TelaRecuperarSenha() {
  const [email, setEmail]           = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  // ── Envia o link de recuperação via Firebase ────────────────────────────
  // O Firebase gera um token seguro e envia por e-mail (Critério HU4)
  const enviarLink = async () => {
    if (!email.trim()) return Alert.alert('Atenção', 'Informe seu e-mail!');

    setCarregando(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'E-mail enviado! 📧',
        'Verifique sua caixa de entrada e siga o link para criar uma nova senha.',
        [{ text: 'Voltar ao Login', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (erro) {
      const erros = {
        'auth/user-not-found': 'Nenhuma conta encontrada com este e-mail.',
        'auth/invalid-email':  'E-mail inválido.',
      };
      Alert.alert('Erro', erros[erro.code] || 'Erro ao enviar e-mail.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={estilos.container}>
      <CabecalhoAuth
        icone="key"
        titulo="Recuperar Senha"
        subtitulo="Informe seu e-mail e enviaremos um link para redefinir sua senha."
        corFundo="#7C3AED"
      />

      <CardFormulario titulo="Digite seu e-mail">
        <CampoTexto label="E-mail cadastrado" placeholder="seu@email.com" value={email} onChange={setEmail} tipo="email" />

        <BotaoPrimario titulo="Enviar Link de Recuperação" onPress={enviarLink} carregando={carregando} cor="#7C3AED" />

        {/* Botão voltar */}
        <TouchableOpacity onPress={() => router.back()} style={estilos.botaoVoltar}>
          <Text style={estilos.textoVoltar}>← Voltar ao Login</Text>
        </TouchableOpacity>
      </CardFormulario>
    </View>
  );
}

const estilos = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#EEF2FF', justifyContent: 'center', padding: 24 },
  botaoVoltar: { marginTop: 16, alignItems: 'center' },
  textoVoltar: { color: '#2563EB', fontSize: 14 },
});
