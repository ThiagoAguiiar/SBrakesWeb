import emailjs from "@emailjs/browser";
// Enviar email com a nova senha
export const Email = (email, senha) => {
  const temParams = {
    reply_to: email,
    senha: senha,
  };

  try {
    emailjs
      .send(
        "service_zaiec6j",
        "template_q8p1e5u",
        temParams,
        "AUoEwkr75jB50zZ-J"
      )
      .then(function (resp) {
        console.log("Sucesso", resp.status);
      });
  } catch (error) {
    return "Erro incomum! Tente novamente mais tarde";
  }
};
