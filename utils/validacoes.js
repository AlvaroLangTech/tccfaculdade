/**
 * UTILITÁRIOS DE VALIDAÇÃO (Modo Sênior)
 * 
 * Por que este arquivo existe?
 * Centralização de regras de validação para uso em toda a aplicação.
 */

/**
 * Validação de formato de e-mail (Regex padrão)
 */
export const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

/**
 * Validação de Senha Forte (HU1)
 * Critérios: Mínimo 6 caracteres, 1 letra, 1 número e 1 símbolo
 */
export const validarSenhaForte = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(senha);
};
