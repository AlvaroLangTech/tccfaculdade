import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
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

  const enviarLink = async () => {
    if (!email.trim()) {
      const msg = 'Informe seu e-mail!';
      return Platform.OS === 'web' ? alert(msg) : Alert.alert('Atenção', msg);
    }

    setCarregando(true);
    try {
      await sendPasswordResetEmail(auth, email);
      
      if (Platform.OS === 'web') {
        alert('E-mail enviado! Verifique sua caixa de entrada.');
        router.replace('/(auth)/login');
      } else {
        Alert.alert(
          'E-mail enviado! 📧',
          'Verifique sua caixa de entrada para criar uma nova senha.',
          [{ text: 'Voltar ao Login', onPress: () => router.replace('/(auth)/login') }]
        );
      }
    } catch (erro) {
      const msg = erro.code === 'auth/user-not-found' ? 'E-mail não encontrado.' : 'Erro ao enviar e-mail.';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Erro', msg);
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
