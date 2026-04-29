# 🎬 Roteiro de Gravação - EPIC 1 (NÍVEL ARQUITETO DE SOFTWARE)

## 1. Introdução (Rosto na Câmera)
*   **Fala:** "Olá professor, sou o Alvaro Noronha. Vou apresentar a arquitetura técnica da EPIC 1. O objetivo foi criar um sistema de autenticação e perfil escalável, resiliente e seguro usando React Native e Firebase."

## 2. O "Cérebro" da Conexão (Mostre o services/firebase.js)
*   **O que falar (O Detalhe):** 
    *   "Neste arquivo, eu configuro a **`firebaseConfig`**. Aqui eu registro as credenciais do projeto (API Key, Project ID) que permitem a comunicação segura com o Google Cloud."
    *   "Eu uso o **`initializeApp`** para instanciar o app e o **`initializeFirestore`** com um detalhe técnico sênior: o **`memoryLocalCache()`**. Isso impede que o navegador tente salvar dados corrompidos no IndexedDB, resolvendo aquele erro clássico de 'client is offline' em ambientes web."
    *   "Também implementei um `try/catch` na inicialização para suportar o HMR (Hot Module Replacement) durante o desenvolvimento, evitando que o Firebase tente se reinicializar duas vezes."

## 3. Estado Global e Vigilância (Mostre o context/AuthContext.jsx)
*   **O que falar (O Detalhe):** 
    *   "Aqui gerencio o estado de autenticação. Criei um **`AuthContext`** usando a Context API do React."
    *   "A função principal é o **`onAuthStateChanged`**. Ele é um listener (ouvinte) do Firebase Auth que fica ativo durante todo o ciclo de vida do app. Se o usuário loga, ele injeta os dados no estado `usuario`. Se ele desloga, ele limpa o estado, e o app reage instantaneamente."

## 4. O Segurança das Rotas (Mostre o app/_layout.jsx)
*   **O que falar (O Detalhe):** 
    *   "Este arquivo é o meu **Route Guard**. Eu utilizo o hook **`useSegments()`** para ler a estrutura de pastas do app em tempo real."
    *   "Criei uma lógica de redirecionamento automática: se o `usuario` for nulo e ele estiver tentando acessar o segmento `(home)`, o sistema usa o `router.replace` para forçar a volta ao Login. É uma proteção de rotas robusta feita no nível do layout principal."

## 5. Validação com Regex (Mostre o utils/validacoes.js)
*   **O que falar (O Detalhe):** 
    *   "Aqui estão as minhas **Expressões Regulares (Regex)**. No método `validarSenhaForte`, usei uma técnica chamada 'Lookahead' (`(?=.*[0-9])`). Ela verifica se a senha contém, simultaneamente: letras, números, símbolos especiais e no mínimo 6 caracteres. Isso evita que o banco de dados receba senhas triviais."

## 6. Sincronização Real-time (Mostre o app/(home)/perfil.jsx)
*   **O que falar (O Detalhe):** 
    *   "Na tela de perfil, substitui o `getDoc` tradicional pelo **`onSnapshot`**. Isso transforma a leitura em um canal de dados em tempo real. Se o administrador mudar o nome do usuário lá no console, o app atualiza aqui na hora sem o usuário dar F5."
    *   "Ao salvar, uso o **`setDoc`** com o parâmetro **`{ merge: true }`**. Isso é crucial para integridade de dados: ele faz um 'patch' no documento, atualizando apenas `nome` e `foto` e preservando outros campos que já existiam, como a data de cadastro."

## 7. Demonstração no Console e Conclusão
*   **Ação:** Mostre as abas de Auth e Firestore no navegador.
*   **Fala:** "No console, podemos ver os campos (`nome`, `email`, `fotoPerfil`) populados exatamente como definidos no meu arquivo `DATABASE_STRUCTURE.md`. O sistema está 100% integrado e seguro via Security Rules."

## 8. Finalização
*   **Fala:** "Este projeto não é apenas um CRUD, é uma aplicação resiliente preparada para falhas de rede e focada em segurança. Obrigado."
