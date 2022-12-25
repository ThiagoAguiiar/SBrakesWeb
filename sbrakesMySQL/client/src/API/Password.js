// Gerar uma senha aleatória caso o usuário esqueça sua senha

export function Password() {
  const char =
    "0123456789abcdefghijklmnopqrstuvwxyz#!@$%¨&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 8;
  let password = "";

  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * char.length);
    password += char.substring(random, random + 1);
  }

  return password
}

