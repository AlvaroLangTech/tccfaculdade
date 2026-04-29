import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useRouter } from 'expo-router';
import { auth } from '../../services/firebase';
import { validarEmail } from '../../utils/validacoes';

// Componentes da interface
import CabecalhoAuth  from '../../components/ui/CabecalhoAuth';
import CardFormulario from '../../components/ui/CardFormulario';
import CampoTexto     from '../../components/ui/CampoTexto';
import BotaoPrimario  from '../../components/ui/BotaoPrimario';

/**
 * 🎓 EXPLICAÇÃO PARA O VÍDEO (HU2 - LOGIN SEGURO):
 * "Esta é a tela de Login, onde o Firebase Auth faz a validação das credenciais."
 * "Aqui eu trato os erros de forma silenciosa e amigável para o usuário."
 */

export default function TelaLogin() {
  const [email, setEmail]     = useState('');
  const [senha, setSenha]     = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  // Função para autenticação via Firebase
  const fazerLogin = async () => {
    setErroEmail('');
    
    if (!validarEmail(email)) {
      setErroEmail('E-mail inválido');
      return;
    }

    setCarregando(true);
    try {
      // O Firebase Auth valida o e-mail e o hash da senha
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (erro) {
      console.log("ERRO DO FIREBASE:", erro.code); // Isso vai nos dizer o motivo real!
      
      // Maternal: No PC usamos alert, no celular usamos Alert.alert
      const msg = 'E-mail ou senha incorretos. Verifique seus dados.';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Erro', msg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">

        <CabecalhoAuth
          icone="wallet"
          titulo="Controle de Gastos"
          subtitulo="Gerencie suas finanças com facilidade"
          corFundo="#2563EB"
        />

        <CardFormulario titulo="Acesse sua conta">
          <CampoTexto label="E-mail" value={email} onChange={setEmail} tipo="email" erro={erroEmail} />
          <CampoTexto label="Senha" value={senha} onChange={setSenha} tipo="senha" />

          <TouchableOpacity style={estilos.esqueceu} onPress={() => router.push('/(auth)/recuperar-senha')}>
            <Text style={estilos.textoEsqueceu}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <BotaoPrimario titulo="Entrar" onPress={fazerLogin} carregando={carregando} />

          <View style={estilos.rodape}>
            <Text style={estilos.textoRodape}>Novo por aqui? </Text>
            <Link href="/(auth)/cadastro" style={estilos.linkRodape}>Criar conta</Link>
          </View>
        </CardFormulario>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#EEF2FF' },
  scroll:        { flexGrow: 1, justifyContent: 'center', padding: 24 },
  esqueceu:      { alignSelf: 'flex-end', marginBottom: 20 },
  textoEsqueceu: { color: '#2563EB', fontSize: 13, fontWeight: '500' },
  rodape:        { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  textoRodape:   { color: '#64748B', fontSize: 14 },
  linkRodape:    { color: '#2563EB', fontSize: 14, fontWeight: '600' },
});
