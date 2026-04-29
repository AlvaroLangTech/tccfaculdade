# 🎬 Roteiro de Gravação - EPIC 1 (NÍVEL ESPECIALISTA)

## 1. Introdução (Rosto na Câmera)
*   **Fala:** "Olá professor, sou o Alvaro Noronha. Vou apresentar a EPIC 1 do meu App de Controle de Gastos. O foco aqui foi Autenticação Segura, Gestão de Perfil e Real-time Data com Firebase."

## 2. Explicação do "Script do Banco" (Mostre o arquivo firestore.rules)
*   **O que falar:** "Como o Firestore é um banco NoSQL orientado a documentos, meu script do banco é este arquivo de Security Rules. Ele define permissões granulares: apenas o dono do UID (`request.auth.uid`) pode manipular seus próprios dados. Isso implementa segurança em nível de documento (Row Level Security)."

## 3. Inicialização e Contexto (Mostre firebase.js e AuthContext.jsx)
*   **O que falar:** "No `firebase.js`, inicializo o SDK de forma resiliente. No `AuthContext.jsx`, uso o padrão de Context API do React para gerenciar o estado global. O hook `onAuthStateChanged` funciona como um observer, capturando o token JWT do Firebase e mantendo o usuário logado."

## 4. Proteção de Rotas e Route Guard (Mostre o app/_layout.jsx)
*   **O que falar:** "Criei um Route Guard que intercepta a navegação. Ele verifica se o usuário está autenticado; caso contrário, usa o `router.replace` para redirecionar o fluxo para o Login de forma automática, protegendo as rotas da Home e Perfil."

## 5. Validação com Regex (Mostre o utils/validacoes.js)
*   **O que falar:** "Para a HU1, implementei validações usando **Regex (Expressões Regulares)**. Usei um padrão que exige no mínimo 6 caracteres, um número e um símbolo especial. Isso garante que as credenciais no banco sejam robustas desde a origem."

## 6. Real-time e Persistência (Mostre o app/(home)/perfil.jsx)
*   **Ação:** Mude o nome na tela e clique em salvar.
*   **O que falar:** "Na tela de perfil, o destaque é o `onSnapshot`. Ele abre um canal de comunicação bidirecional com o Firestore para atualizações em tempo real. Para salvar, utilizo o `setDoc` com a opção `{ merge: true }`, o que evita sobrescrever outros dados do usuário."

## 7. Sincronização de Perfil (Mostre a Home atualizada)
*   **O que falar:** "Ao voltar para a Home, vemos que o nome foi atualizado no cabeçalho através do `usuario.reload()`, que sincroniza o estado do Firebase Auth com a interface."

## 8. Demonstração no Console do Firebase (Mostre o Navegador)
*   **Ação (Aba Authentication):** Mostre a lista de usuários.
*   **Fala:** "Aqui no Console, na aba Authentication, podemos ver os e-mails cadastrados e seus UIDs únicos."
*   **Ação (Aba Firestore Database):** Mostre a coleção `usuarios`.
*   **Fala:** "No Firestore, vemos a coleção `usuarios`. Reparem que os campos `nome`, `email` e `fotoPerfil` batem exatamente com o que definimos na estrutura do projeto."
*   **Ação (Aba Rules):** Mostre as regras publicadas.
*   **Fala:** "E aqui estão as Security Rules que mostrei anteriormente no código, agora aplicadas diretamente no servidor para garantir a proteção dos dados."

## 9. Conclusão
*   **Fala:** "Este projeto segue as melhores práticas de Clean Code e arquitetura modular. Toda a documentação está na pasta do ZIP. Obrigado!"
