/**
 * 🎓 ROTEIRO DA DEMONSTRAÇÃO PRÁTICA (VÍDEO):
 * 1. Tente cadastrar com senha simples (ex: 12345) e mostre o erro.
 * 2. Crie uma conta real e mostre que o app te leva para a Home.
 * "Vejam que o sistema barra senhas fracas e cria a conta de forma assíncrona no Firebase."
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'expo-router';
import { auth, db } from '../../services/firebase';
import { validarEmail, validarSenhaForte } from '../../utils/validacoes';

import CabecalhoAuth  from '../../components/ui/CabecalhoAuth';
import CardFormulario from '../../components/ui/CardFormulario';
import CampoTexto     from '../../components/ui/CampoTexto';
import BotaoPrimario  from '../../components/ui/BotaoPrimario';

export default function TelaCadastro() {
  const [nome, setNome]             = useState('');
  const [email, setEmail]           = useState('');
  const [senha, setSenha]           = useState('');
  const [confirmarSenha, setConfirmar] = useState('');
  const [erros, setErros]           = useState({});
  const [carregando, setCarregando] = useState(false);

  // Função para realizar o cadastro do usuário
  const fazerCadastro = async () => {
    setErros({});
    let novosErros = {};

    // Validações de formulário (HU1)
    if (!nome.trim())             novosErros.nome = 'Informe seu nome';
    if (!validarEmail(email))     novosErros.email = 'E-mail inválido';
    if (!validarSenhaForte(senha)) novosErros.senha = 'Senha fraca (letras, números e símbolos)';
    if (senha !== confirmarSenha)  novosErros.confirmar = 'As senhas não coincidem';

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setCarregando(true);
    try {
      // Criação de usuário no Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(user, { displayName: nome });

      // Persistência dos dados no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
        fotoPerfil: '',
        dataCadastro: serverTimestamp(),
      });
    } catch (erro) {
      if (erro.code === 'auth/email-already-in-use') {
        setErros({ email: 'E-mail já cadastrado' });
      } else {
        Alert.alert('Erro', 'Erro ao criar conta');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView style={estilos.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">

        <CabecalhoAuth
          icone="person-add"
          titulo="Criar Conta"
          subtitulo="Cadastre-se para gerenciar seus gastos"
          corFundo="#059669"
        />

        <CardFormulario titulo="Dados de Acesso">
          <CampoTexto label="Nome" value={nome} onChange={setNome} erro={erros.nome} />
          <CampoTexto label="E-mail" value={email} onChange={setEmail} tipo="email" erro={erros.email} />
          <CampoTexto label="Senha" value={senha} onChange={setSenha} tipo="senha" erro={erros.senha} />
          <CampoTexto label="Confirmar" value={confirmarSenha} onChange={setConfirmar} tipo="senha" erro={erros.confirmar} />

          <BotaoPrimario titulo="Criar Conta" onPress={fazerCadastro} carregando={carregando} cor="#059669" />

          <View style={estilos.rodape}>
            <Text style={estilos.textoRodape}>Já tem conta? </Text>
            <Link href="/(auth)/login" style={estilos.linkRodape}>Entrar</Link>
          </View>
        </CardFormulario>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#EEF2FF' },
  scroll:      { flexGrow: 1, justifyContent: 'center', padding: 24 },
  rodape:      { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  textoRodape: { color: '#64748B', fontSize: 14 },
  linkRodape:  { color: '#2563EB', fontSize: 14, fontWeight: '600' },
});


