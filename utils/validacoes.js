export const validarEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validarSenhaForte = (senha) => {
  const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
  return regex.test(senha);
};
