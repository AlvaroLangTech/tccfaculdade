# 🎬 Roteiro de Gravação - EPIC 1
**Tempo sugerido:** 3 a 4 minutos

## 1. Introdução (Rosto na Câmera)
*   **Ação:** Olhe para a câmera e se apresente.
*   **Fala:** "Olá professor, meu nome é Alvaro Noronha. Vou demonstrar as funcionalidades da EPIC 1 do meu App de Controle de Gastos, focando em Autenticação Segura e Gestão de Perfil."

## 2. HU1: Cadastro e Validação (Tela de Cadastro)
*   **Ação:** Digite um e-mail e uma senha curta (ex: 123).
*   **Fala:** "Na HU1, foquei em UX e segurança. Implementei validações com Regex para garantir senhas fortes. Veja que o sistema barra senhas fracas antes mesmo de enviar ao servidor."
*   **Destaque Técnico:** Mostre o arquivo `validacoes.js` rapidamente.

## 3. HU2: Login e Segurança (Tela de Login)
*   **Ação:** Faça o login com sucesso.
*   **Fala:** "O login é integrado ao Firebase Auth. O diferencial técnico aqui é o Route Guard que criei no _layout principal, que protege as rotas privadas de acessos não autorizados."

## 4. HU3: Gestão de Perfil (Tela de Perfil)
*   **Ação:** Altere seu nome e adicione uma URL de foto. Clique em Salvar.
*   **Fala:** "Esta funcionalidade usa Firestore Realtime. Implementei o `onSnapshot` para que o app receba atualizações instantâneas. O salvamento é resiliente e garante que os dados básicos sejam atualizados mesmo em redes instáveis."
*   **Destaque Técnico:** Mostre o sucesso do salvamento.

## 5. HU5: Logout (Tela Home)
*   **Ação:** Clique em Encerrar Sessão e confirme no Alerta.
*   **Fala:** "Para fechar, a HU5 trata o logout seguro, limpando os tokens de sessão e redirecionando o usuário para o início."

## 6. Encerramento
*   **Fala:** "Obrigado pela atenção. O código está disponível no GitHub com a estrutura de banco documentada no DATABASE_STRUCTURE.md."
