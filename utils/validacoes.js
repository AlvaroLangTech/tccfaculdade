/**
 * 🎓 EXPLICAÇÃO PARA O VÍDEO (REQUISITO HU1):
 * "Professor, aqui eu centralizei a lógica de validação usando REGEX (Expressões Regulares)."
 * "Imagine que o Regex é como um 'MOLDE' ou uma 'PENEIRA' de texto."
 */

/**
 * VALIDAÇÃO DE E-MAIL:
 * "Este molde garante que o usuário digite um e-mail com formato válido (algo@dominio.com)."
 */
export const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

/**
 * VALIDAÇÃO DE SENHA FORTE:
 * "Este é o molde da SENHA FORTE. Ele faz 4 perguntas para a senha:"
 * 1. Ela tem letras? [a-z]
 * 2. Ela tem números? [0-9]
 * 3. Ela tem símbolos especiais? [!@#$%^&*]
 * 4. Ela tem pelo menos 6 caracteres? {6,}
 * "Se a senha não passar em todas as perguntas, o molde rejeita o texto."
 */
export const validarSenhaForte = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(senha);
};

